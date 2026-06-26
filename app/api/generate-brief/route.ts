// app/api/generate-brief/route.ts
// Single POST endpoint. Pre-filter (TypeScript) → Anthropic API call → JSON parse.
// No streaming. Full JSON brief returned in one response.

import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';
import { getScenarioCreatives, scenarioRoutes } from '@/lib/templateLibrary';
import { buildSystemPrompt } from '@/lib/systemPrompt';
import type { BriefRequest, CreativeIntent } from '@/types/index';

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

// ── BASE64 HELPER ────────────────────────────────────────────────────────────

function readCreativeAsBase64(url: string): { data: string; media_type: 'image/png' | 'image/jpeg' | 'image/webp' | 'image/gif' } {
  // url = "/creatives/filename.png"
  const filePath = path.join(process.cwd(), 'public', url);
  const buf = fs.readFileSync(filePath);
  // Detect actual format from magic bytes — extension alone is unreliable
  let media_type: 'image/png' | 'image/jpeg' | 'image/webp' | 'image/gif' = 'image/jpeg';
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    media_type = 'image/png';
  } else if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) {
    media_type = 'image/gif';
  } else if (buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46) {
    media_type = 'image/webp';
  }
  return { data: buf.toString('base64'), media_type };
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

    // Step 1: Pre-filter — classify intent + get 5 scenario-matched reference creatives
    const intent: CreativeIntent = body.intent ?? classifyIntent(product, offer, context);
    const scenarioCreatives = getScenarioCreatives(intent, product);
    const matchedRoute = scenarioRoutes.find(r =>
      r.reference_filenames.includes(scenarioCreatives[0]?.filename ?? '')
    );
    const scenarioId    = matchedRoute?.scenario_id    ?? 'S1';
    const scenarioLabel = matchedRoute?.scenario_label ?? 'Card-Led / Generic';

    // Step 2: Build vision blocks + campaign brief text
    const imageBlocks = scenarioCreatives.map(c => {
      const { data, media_type } = readCreativeAsBase64(c.url);
      return {
        type: 'image' as const,
        source: {
          type: 'base64' as const,
          media_type,
          data,
        },
      };
    });

    const campaignBriefText =
      `CAMPAIGN BRIEF REQUEST\n\n` +
      `Product / Focus: ${product.trim()}\n` +
      `Offer: ${offer.trim()}\n` +
      `Additional Context: ${context?.trim() || 'None provided'}\n\n` +
      `ROUTING CONTEXT — copy these values verbatim into scenario_id and scenario_name:\n` +
      `scenario_id: ${scenarioId}\n` +
      `scenario_name: ${scenarioLabel}\n\n` +
      `REFERENCE CREATIVES — 5 images attached (in order above):\n` +
      scenarioCreatives
        .map((c, i) => `${i + 1}. ${c.display_name} | CTR: ${c.reach_weighted_ctr}% | File: ${c.filename}`)
        .join('\n') +
      `\n\nStudy the 5 images. Select ONE as base_creative. ` +
      `Synthesise a brief that keeps what works structurally and adapts the story for this campaign. ` +
      `Respond with valid JSON only — no preamble, no markdown fences.`;

    // Step 3: Single Anthropic API call — system prompt is cached
    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
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
          content: [
            ...imageBlocks,
            { type: 'text' as const, text: campaignBriefText },
          ],
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
