// app/api/generate-brief/route.ts
// Single POST endpoint. Pre-filter (TypeScript) → Anthropic API call → JSON parse.
// No streaming. Full JSON brief returned in one response.

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { getTopCreatives } from '@/lib/creativeLibrary';
import { buildSystemPrompt } from '@/lib/systemPrompt';
import type { BriefRequest, CreativeCard, CreativeIntent } from '@/types/index';

const client = new Anthropic();

// ── LIGHTWEIGHT INTENT CLASSIFIER ───────────────────────────────────────────
// Used for pre-filtering reference creatives only.
// The LLM confirms / overrides intent in its output via detected_intent field.
// Rules match Block 04 auto-detection logic — first match wins.

function classifyIntent(product: string, offer: string, context?: string): CreativeIntent {
  const combined = `${product} ${offer} ${context ?? ''}`.toLowerCase();

  // Rule 1: Festive/Event — sale or seasonal keyword wins first
  if (
    /(bbd|big.?billion|diwali|republic.?day|independence.?day|festive|sale.?season|sale.?event|navratri|holi|onam|pongal|eid|christmas|new.?year)/.test(combined)
  ) {
    return 'Festive/Event';
  }

  // Rule 2: Offer-Led — cashback or gift card mentioned without a specific product brand
  const hasOffer = /(cashback|gift.?card|₹\s*\d|rs\.?\s*\d{3,}|voucher|free.?offer)/.test(combined);
  const hasBrand = /(iphone|samsung|oneplus|oppo|vivo|realme|redmi|pixel|voltas|lg|sony|apple|lenovo|dell|hp|asus|gopro|nikon|canon)/.test(combined);
  if (hasOffer && !hasBrand) {
    return 'Offer-Led';
  }

  // Rule 3: Product-Led — specific product brand named
  if (hasBrand) {
    return 'Product-Led';
  }

  // Rule 4: Default — Card-Led
  return 'Card-Led';
}

// ── CREATIVE SERIALIZER ──────────────────────────────────────────────────────
// Converts top 5 CreativeCard objects into structured text for the LLM user message.
// Flat key_features list — token-efficient, LLM parses correctly.

function serializeCreatives(creatives: CreativeCard[]): string {
  return creatives
    .map(
      (c, i) =>
        `${i + 1}. ${c.display_name}\n` +
        `   Type: ${c.creative_type} | CTR: ${c.reach_weighted_ctr}% | URL: ${c.url}\n` +
        `   Features: ${c.key_features.join(', ')}`
    )
    .join('\n\n');
}

// ── POST HANDLER ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body: BriefRequest = await request.json();
    const { product, offer, context } = body;

    // Basic validation
    if (!product?.trim() || !offer?.trim()) {
      return NextResponse.json(
        { error: 'Product and offer are required.' },
        { status: 400 }
      );
    }

    // Step 1: Pre-filter — classify intent + get top 5 reference creatives
    const intent: CreativeIntent = body.intent ?? classifyIntent(product, offer, context);
    const topCreatives = getTopCreatives(product, intent, 5);

    // Step 2: Build user message
    const userMessage =
      `CAMPAIGN BRIEF REQUEST\n\n` +
      `Product / Focus: ${product.trim()}\n` +
      `Offer: ${offer.trim()}\n` +
      `Additional Context: ${context?.trim() || 'None provided'}\n\n` +
      `PRE-FILTERED REFERENCE CREATIVES (for reference_creatives section only — do not base strategy on these):\n` +
      `${serializeCreatives(topCreatives)}\n\n` +
      `Generate a complete creative brief as valid JSON only.`;

    // Step 3: Single Anthropic API call — system prompt is cached
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: [
        {
          type: 'text',
          text: buildSystemPrompt(),
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    });

    // Step 4: Extract text from response
    const textBlock = response.content.find((block) => block.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      throw new Error('No text content in Anthropic response');
    }

    // Step 5: Strip markdown fences defensively, then parse JSON
    const cleanText = textBlock.text
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const brief = JSON.parse(cleanText);
    return NextResponse.json(brief);

  } catch (error) {
    console.error('[generate-brief] Error:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Failed to parse brief output. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Brief generation failed. Please try again.' },
      { status: 500 }
    );
  }
}