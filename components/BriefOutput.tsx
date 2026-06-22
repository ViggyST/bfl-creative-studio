'use client'

import { useState } from 'react'
import CopyButton from './CopyButton'
import CreativeCard from './CreativeCard'
import type { BriefRequest, BriefResponse } from '@/types/index'

interface BriefOutputProps {
  brief: BriefResponse
  request: BriefRequest
  onNewBrief: () => void
}

export default function BriefOutput({ brief, request, onNewBrief }: BriefOutputProps) {
  return (
    <div className="min-h-screen bg-[var(--c-bg)]">
      {/* Phase 3a: single page-shell wraps brief card + all sections */}
      <div className="page-shell pt-4 pb-12">
        <BriefRequestCard request={request} brief={brief} onNewBrief={onNewBrief} />
        {/* Phase 3b: mb-5 gap between brief card and sections; Phase 4a: space-y-[18px] */}
        <div className="mt-5 space-y-[18px]">
          <CreativeTypeSection brief={brief} request={request} />
          <ImagePromptsSection brief={brief} />
          <CopyFormulaSection brief={brief} />
          <LayoutBriefSection brief={brief} />
          <ReferenceCreativesSection brief={brief} />
          <IncludeAvoidSection brief={brief} />
          <CTRSignalSection brief={brief} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Brief Request Card — Phase 3b
   ───────────────────────────────────────────────────────────── */

function BriefRequestCard({
  request,
  brief,
  onNewBrief,
}: {
  request: BriefRequest
  brief: BriefResponse
  onNewBrief: () => void
}) {
  const intentLabel = request.intent
    ? brief.detected_intent
    : `${brief.detected_intent} (auto-detected)`

  return (
    <div
      className="flex items-start gap-6 border border-[var(--c-border)] bg-[var(--c-surface-2)] px-6 py-[14px]"
      style={{ borderTop: '3px solid var(--c-amber)' }}
    >
      {/* Fixed-width New Brief area */}
      <div className="w-[110px] shrink-0">
        <button
          type="button"
          onClick={onNewBrief}
          className="whitespace-nowrap rounded-[var(--radius-pill)] border border-[var(--c-border)] bg-[var(--c-bg)] px-3 py-[6px] font-data text-[11px] text-[var(--c-text-muted)]"
        >
          ← New brief
        </button>
      </div>

      {/* Vertical divider */}
      <div className="w-px self-stretch bg-[var(--c-border)]" />

      {/* 2×2 label/value grid */}
      <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-2">
        <div>
          <div className="font-data text-[9px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">Product</div>
          <div className="text-[12px] text-[var(--c-text)]">{request.product}</div>
        </div>
        <div>
          <div className="font-data text-[9px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">Offer</div>
          <div className="text-[12px] text-[var(--c-text)]">{request.offer}</div>
        </div>
        <div>
          <div className="font-data text-[9px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">Context</div>
          <div className="text-[12px] text-[var(--c-text)]">{request.context || '—'}</div>
        </div>
        <div>
          <div className="font-data text-[9px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">Intent</div>
          <div className="text-[12px] text-[var(--c-text)]">{intentLabel}</div>
        </div>
      </div>

      {/* Right-aligned badges */}
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className="rounded-[var(--radius-pill)] bg-[var(--c-amber-soft)] px-4 py-[6px] font-data text-[12px] text-[var(--c-amber)]">
          {brief.creative_type}
        </span>
        <span className="rounded-[var(--radius-pill)] bg-[var(--c-green-soft)] px-4 py-[6px] font-data text-[12px] text-[var(--c-green)]">
          ~{brief.ctr_score_estimate.estimated_ctr.toFixed(1)}% CTR
        </span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Shared section card wrapper — Phase 4b
   px-6 py-5 (24px / 20px), radius-lg, shadow-card
   ───────────────────────────────────────────────────────────── */

function SectionCard({
  label,
  copyText,
  amberBorderLeft,
  badge,
  children,
}: {
  label: string
  copyText?: string
  amberBorderLeft?: boolean
  badge?: string
  children: React.ReactNode
}) {
  return (
    <section
      className="rounded-[var(--radius-lg)] border border-[var(--c-border)] bg-[var(--c-surface)] px-6 py-5 shadow-[var(--shadow-card)]"
      style={amberBorderLeft ? { borderLeft: '3px solid var(--c-amber)' } : undefined}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-data text-[10px] uppercase tracking-[0.1em] text-[var(--c-amber)]">
            {label}
          </span>
          {badge && (
            <span className="ml-1 rounded-[var(--radius-pill)] bg-[var(--c-amber-soft)] px-3 py-[4px] font-data text-[11px] uppercase tracking-[0.06em] text-[var(--c-amber)]">
              {badge}
            </span>
          )}
        </div>
        {copyText && <CopyButton text={copyText} />}
      </div>
      {children}
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   01 — Creative Type — Phase 5a
   ───────────────────────────────────────────────────────────── */

function CreativeTypeSection({
  brief,
  request,
}: {
  brief: BriefResponse
  request: BriefRequest
}) {
  return (
    <SectionCard label="Creative Type">
      <div className="space-y-3">
        {/* Pill row */}
        <div className="flex gap-3">
          <span className="rounded-[var(--radius-pill)] bg-[var(--c-amber-soft)] px-4 py-[6px] font-data text-[12px] text-[var(--c-amber)]">
            {brief.creative_type}
          </span>
          <span className="rounded-[var(--radius-pill)] bg-[var(--c-blue-soft)] px-4 py-[6px] font-data text-[12px] text-[var(--c-blue)]">
            ● Auto-detected · {brief.detected_intent}
          </span>
        </div>

        {/* Type name + CTR side by side */}
        <div className="flex items-start justify-between gap-8">
          <div>
            <h2 className="font-display text-[44px] font-semibold tracking-[-1px] text-[var(--c-text)]">
              {brief.creative_type}
            </h2>
            <div className="mt-4 h-[3px] w-[56px] rounded-full bg-[var(--c-amber)]" />
          </div>
          <div className="shrink-0 text-right">
            <div className="font-display text-[34px] font-semibold tracking-[-0.6px] text-[var(--c-green)]">
              ~{brief.ctr_score_estimate.estimated_ctr.toFixed(1)}%
            </div>
            <div className="mt-1 font-data text-[12px] text-[var(--c-text-faint)]">Estimated CTR ±0.5%</div>
          </div>
        </div>

        {/* Rationale */}
        <p className="max-w-[68ch] text-[15px] leading-[1.6] text-[var(--c-text-muted)]">
          {brief.creative_type_reason}
        </p>

        {/* Intent signal */}
        <div className="mt-1 flex items-start gap-2 font-data text-[13px] text-[var(--c-text-faint)]">
          <span className="mt-1.5 h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--c-blue)]" />
          {brief.intent_signal}
        </div>
      </div>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   02 — Image Gen Prompts — Phase 5b
   ───────────────────────────────────────────────────────────── */

function ImagePromptsSection({ brief }: { brief: BriefResponse }) {
  const [tab, setTab] = useState<'gpt4o' | 'gemini' | 'midjourney'>('gpt4o')
  const tabs: { key: 'gpt4o' | 'gemini' | 'midjourney'; label: string }[] = [
    { key: 'gpt4o', label: 'GPT-4o' },
    { key: 'gemini', label: 'Gemini' },
    { key: 'midjourney', label: 'Midjourney' },
  ]

  return (
    <SectionCard label="Image Gen Prompts" copyText={brief.image_prompts[tab]}>
      <div className="flex gap-4 border-b border-[var(--c-border-subtle)]">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`border-b-[2px] pb-3 font-data text-[13px] transition-colors ${
              tab === t.key
                ? 'border-[var(--c-green)] text-[var(--c-green)]'
                : 'border-transparent text-[var(--c-text-faint)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* mt-3 gap between tabs and prompt box */}
      <div className="mt-3 rounded-[6px] border border-[var(--c-border-subtle)] bg-[var(--c-surface-3)] p-4">
        <p className="prose-block whitespace-pre-wrap font-data text-[13px] leading-[1.7] text-[var(--c-text-muted)]">
          {brief.image_prompts[tab]}
        </p>
      </div>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   03 — Copy Formula — Phase 5c (stacked, not 3-col grid)
   ───────────────────────────────────────────────────────────── */

function CopyFormulaSection({ brief }: { brief: BriefResponse }) {
  const { headline, body, cta } = brief.copy_formula
  const copyAllText = `Headline: ${headline}\n\nBody: ${body}\n\nCTA: ${cta}`

  return (
    <SectionCard label="Copy Formula" copyText={copyAllText}>
      <div className="flex flex-col gap-3">
        <div className="rounded-[var(--radius-sm)] border border-[var(--c-border-subtle)] bg-[var(--c-surface-3)] p-4">
          <div className="mb-2 font-data text-[9px] uppercase tracking-[0.08em] text-[var(--c-text-faint)]">Headline</div>
          <div className="font-data text-[14px] leading-[1.6] text-[var(--c-text)]">{headline}</div>
        </div>
        <div className="rounded-[var(--radius-sm)] border border-[var(--c-border-subtle)] bg-[var(--c-surface-3)] p-4">
          <div className="mb-2 font-data text-[9px] uppercase tracking-[0.08em] text-[var(--c-text-faint)]">Body</div>
          <div className="font-data text-[14px] leading-[1.6] text-[#A8762E]">{body}</div>
        </div>
        <div className="rounded-[var(--radius-sm)] border border-[var(--c-border-subtle)] bg-[var(--c-surface-3)] p-4">
          <div className="mb-2 font-data text-[9px] uppercase tracking-[0.08em] text-[var(--c-text-faint)]">CTA</div>
          <div className="font-data text-[14px] leading-[1.6] text-[var(--c-blue)]">{cta}</div>
        </div>
      </div>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   04 — Layout Brief — Phase 5d
   ───────────────────────────────────────────────────────────── */

function LayoutBriefSection({ brief }: { brief: BriefResponse }) {
  const lb = brief.layout_brief

  const copyText = [
    `Hero: ${lb.hero_element}`,
    `Card: ${lb.card_placement}`,
    `Background: ${lb.background}`,
    `Chips: ${lb.benefit_chips.join(', ')}`,
    `Density: ${lb.text_density}`,
    `Brand logo: ${lb.brand_logo_placement}`,
    lb.additional_elements.length ? `Additional: ${lb.additional_elements.join(', ')}` : null,
  ]
    .filter(Boolean)
    .join('\n')

  const rows: { label: string; content: React.ReactNode }[] = [
    { label: 'Hero', content: lb.hero_element },
    { label: 'Card', content: lb.card_placement },
    { label: 'Background', content: lb.background },
    {
      label: 'Chips',
      content: (
        <div className="flex flex-wrap gap-2">
          {lb.benefit_chips.map((chip, i) => (
            <span
              key={i}
              className="rounded-[var(--radius-pill)] bg-[var(--c-green-soft)] px-[14px] py-[6px] font-data text-[12px] text-[var(--c-green)]"
            >
              {chip}
            </span>
          ))}
        </div>
      ),
    },
    { label: 'Density', content: lb.text_density },
    { label: 'Brand logo', content: lb.brand_logo_placement },
  ]

  if (lb.additional_elements.length > 0) {
    rows.push({ label: 'Additional', content: lb.additional_elements.join(' · ') })
  }

  return (
    <SectionCard label="Layout Brief" copyText={copyText} amberBorderLeft badge="★ Most important">
      <div className="flex flex-col">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className="flex gap-6 border-b border-[var(--c-border-subtle)] py-2.5 last:border-b-0 last:pb-0 first:pt-0"
          >
            <div className="min-w-[80px] shrink-0 pt-0.5 font-data text-[9px] uppercase tracking-[0.08em] text-[var(--c-text-faint)]">
              {row.label}
            </div>
            <div className="text-[14px] leading-[1.7] text-[var(--c-text-muted)]">{row.content}</div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   05 — Reference Creatives — Phase 5e
   ───────────────────────────────────────────────────────────── */

function ReferenceCreativesSection({ brief }: { brief: BriefResponse }) {
  const baseline = brief.ctr_score_estimate.baseline

  return (
    <SectionCard label="Reference Creatives">
      <div className="grid grid-cols-5 gap-3">
        {brief.reference_creatives.map((creative, i) => (
          <CreativeCard
            key={creative.filename}
            creative={creative}
            isBestMatch={i === 0}
            highPerformer={creative.ctr >= baseline}
          />
        ))}
      </div>
      <p className="mt-4 font-data text-[11px] text-[var(--c-text-ghost)]">
        PNG thumbnails from /public/creatives/ · gold border = best match
      </p>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   06 — Include / Avoid — Phase 5f
   ───────────────────────────────────────────────────────────── */

function IncludeAvoidSection({ brief }: { brief: BriefResponse }) {
  return (
    <SectionCard label="Include / Avoid">
      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="mb-3 font-data text-[12px] uppercase tracking-[0.08em] text-[var(--c-green)]">
            ✓ Include
          </h3>
          <ul className="flex flex-col space-y-1.5">
            {brief.include.map((item, i) => (
              <li
                key={i}
                className="rounded-[5px] bg-[var(--c-green-soft)] px-2.5 py-2 text-[13.5px] leading-[1.6] text-[var(--c-text-muted)]"
                style={{ borderLeft: '3px solid var(--c-green)' }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-data text-[12px] uppercase tracking-[0.08em] text-[var(--c-red)]">
            ✗ Avoid
          </h3>
          <ul className="flex flex-col space-y-1.5">
            {brief.avoid.map((item, i) => (
              <li
                key={i}
                className="rounded-[5px] bg-[var(--c-red-soft)] px-2.5 py-2 text-[13.5px] leading-[1.6] text-[var(--c-text-muted)]"
                style={{ borderLeft: '3px solid var(--c-red)' }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   07 — CTR Signal Analysis — Phase 5g
   h-2 bars (8px), values outside bar, space-y-1 rows
   ───────────────────────────────────────────────────────────── */

function CTRSignalSection({ brief }: { brief: BriefResponse }) {
  const { baseline, elements, estimated_ctr } = brief.ctr_score_estimate

  return (
    <SectionCard label="CTR Signal Analysis">
      <div className="space-y-1">
        {/* Baseline row */}
        <div className="flex items-center gap-4 py-1.5">
          <span className="min-w-[230px] shrink-0 font-data text-[12px] text-[var(--c-text-faint)]">
            Baseline
          </span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-[130px] rounded-[4px] bg-[var(--c-surface-2)]" />
            <span className="font-data text-[11px] text-[var(--c-text-faint)]">
              {baseline.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Lift rows */}
        {elements.map((el) => {
          const barWidth = Math.max(16, Math.round(Math.abs(el.lift) * 100))
          const isNegative = el.lift < 0
          return (
            <div key={el.feature} className="flex items-center gap-4 py-1.5">
              <span
                className="min-w-[230px] shrink-0 font-data text-[12px] text-[var(--c-text)]"
                title={el.note}
              >
                {el.feature}
              </span>
              <div className="flex items-center gap-2">
                <div
                  className={`h-2 rounded-[4px] ${
                    isNegative ? 'bg-[var(--c-red-soft)]' : 'bg-[var(--c-green-soft)]'
                  }`}
                  style={{ width: `${barWidth}px` }}
                />
                <span
                  className={`font-data text-[11px] ${
                    isNegative ? 'text-[var(--c-red)]' : 'text-[var(--c-green)]'
                  }`}
                >
                  {el.lift > 0 ? '+' : ''}{el.lift.toFixed(2)}%
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Total row — mt-4, disclaimer mt-2 */}
      <div className="mt-4 flex items-start justify-between border-t border-[var(--c-border-subtle)] pt-4">
        <p className="mt-2 max-w-[58ch] font-data text-[12px] text-[var(--c-text-faint)]">
          Lifts are marginal effects — not independently additive. Estimated CTR is a model prediction.
        </p>
        <div className="flex shrink-0 items-baseline gap-3">
          <span className="font-display text-[28px] font-semibold tracking-[-0.5px] text-[var(--c-green)]">
            ~{estimated_ctr.toFixed(1)}%
          </span>
          <span className="font-data text-[12px] text-[var(--c-text-faint)]">estimated</span>
        </div>
      </div>
    </SectionCard>
  )
}
