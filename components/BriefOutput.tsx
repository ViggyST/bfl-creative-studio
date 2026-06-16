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
      {/* Brief request card — full width, flush to header */}
      <BriefRequestCard request={request} brief={brief} onNewBrief={onNewBrief} />
      {/* Content area — centred, max-width, padded */}
      <div className="mx-auto flex max-w-[1140px] flex-col gap-6 px-12 py-10">
        <CreativeTypeSection brief={brief} request={request} />
        <ImagePromptsSection brief={brief} />
        <CopyFormulaSection brief={brief} />
        <LayoutBriefSection brief={brief} />
        <ReferenceCreativesSection brief={brief} />
        <IncludeAvoidSection brief={brief} />
        <CTRSignalSection brief={brief} />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Brief Request Card
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
  return (
    <div
      className="flex items-start gap-9 border border-[var(--c-border)] bg-[var(--c-surface-2)] px-8 py-5"
      style={{ borderTop: '3px solid var(--c-amber)' }}
    >
      <button
        type="button"
        onClick={onNewBrief}
        className="shrink-0 rounded-[var(--radius-pill)] border border-[var(--c-border)] bg-[var(--c-bg)] px-[18px] py-[9px] font-data text-[13px] text-[var(--c-text-muted)]"
      >
        ← New brief
      </button>

      <div className="grid flex-1 grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-2">
        <span className="font-data text-[11px] uppercase tracking-[0.08em] text-[var(--c-text-faint)]">Product</span>
        <span className="text-[15px] text-[var(--c-text)]">{request.product}</span>
        <span className="font-data text-[11px] uppercase tracking-[0.08em] text-[var(--c-text-faint)]">Offer</span>
        <span className="text-[15px] text-[var(--c-text)]">{request.offer}</span>
        {request.context && (
          <>
            <span className="font-data text-[11px] uppercase tracking-[0.08em] text-[var(--c-text-faint)]">Context</span>
            <span className="text-[15px] text-[var(--c-text)]">{request.context}</span>
          </>
        )}
        <span className="font-data text-[11px] uppercase tracking-[0.08em] text-[var(--c-text-faint)]">Intent</span>
        <span className="text-[15px] text-[var(--c-text)]">
          {request.intent ? brief.detected_intent : `${brief.detected_intent} (auto-detected)`}
        </span>
      </div>

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
   Shared section card wrapper
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
      className="rounded-[8px] border border-[var(--c-border)] bg-[var(--c-surface)] px-8 py-7 shadow-[var(--shadow-card)]"
      style={amberBorderLeft ? { borderLeft: '3px solid var(--c-amber)' } : undefined}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-data text-[12px] uppercase tracking-[0.1em] text-[var(--c-amber)]">
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
   01 — Creative Type
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
      <div className="mb-5 flex gap-3">
        <span className="rounded-[var(--radius-pill)] bg-[var(--c-amber-soft)] px-4 py-[6px] font-data text-[12px] text-[var(--c-amber)]">
          {brief.creative_type}
        </span>
        <span className="rounded-[var(--radius-pill)] bg-[var(--c-blue-soft)] px-4 py-[6px] font-data text-[12px] text-[var(--c-blue)]">
          ● Auto-detected · {brief.detected_intent}
        </span>
      </div>

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

      <p className="mt-6 max-w-[78ch] text-[15px] leading-[1.75] text-[var(--c-text-muted)]">
        {brief.creative_type_reason}
      </p>

      <div className="mt-4 flex items-start gap-2 font-data text-[13px] text-[var(--c-text-faint)]">
        <span className="mt-1.5 h-[6px] w-[6px] shrink-0 rounded-full bg-[var(--c-blue)]" />
        {brief.intent_signal}
      </div>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   02 — Image Gen Prompts
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
      <div className="mb-3 flex gap-4 border-b border-[var(--c-border-subtle)]">
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

      <div className="rounded-[6px] border border-[var(--c-border-subtle)] bg-[var(--c-surface-3)] p-6">
        <p className="whitespace-pre-wrap font-data text-[13px] leading-[1.8] text-[var(--c-text-muted)]">
          {brief.image_prompts[tab]}
        </p>
      </div>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   03 — Copy Formula
   ───────────────────────────────────────────────────────────── */

function CopyFormulaSection({ brief }: { brief: BriefResponse }) {
  const { headline, body, cta } = brief.copy_formula
  const copyAllText = `Headline: ${headline}\n\nBody: ${body}\n\nCTA: ${cta}`

  return (
    <SectionCard label="Copy Formula" copyText={copyAllText}>
      <div className="grid grid-cols-[1fr_2fr_1fr] gap-4">
        <div className="rounded-[6px] border border-[var(--c-border-subtle)] bg-[var(--c-surface-3)] p-5">
          <div className="mb-3 font-data text-[11px] uppercase tracking-[0.08em] text-[var(--c-text-faint)]">Headline</div>
          <div className="font-data text-[14px] leading-[1.7] text-[var(--c-text)]">{headline}</div>
        </div>
        <div className="rounded-[6px] border border-[var(--c-border-subtle)] bg-[var(--c-surface-3)] p-5">
          <div className="mb-3 font-data text-[11px] uppercase tracking-[0.08em] text-[var(--c-text-faint)]">Body</div>
          <div className="font-data text-[14px] leading-[1.7] text-[#A8762E]">{body}</div>
        </div>
        <div className="rounded-[6px] border border-[var(--c-border-subtle)] bg-[var(--c-surface-3)] p-5">
          <div className="mb-3 font-data text-[11px] uppercase tracking-[0.08em] text-[var(--c-text-faint)]">CTA</div>
          <div className="font-data text-[14px] leading-[1.7] text-[var(--c-blue)]">{cta}</div>
        </div>
      </div>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   04 — Layout Brief
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
            className={`flex gap-8 py-4 border-b border-[var(--c-border-subtle)] last:border-b-0 last:pb-0 first:pt-0`}
          >
            <div className="min-w-[140px] shrink-0 pt-0.5 font-data text-[11px] uppercase tracking-[0.08em] text-[var(--c-text-faint)]">
              {row.label}
            </div>
            <div className="text-[14.5px] leading-[1.75] text-[var(--c-text-muted)]">{row.content}</div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   05 — Reference Creatives
   ───────────────────────────────────────────────────────────── */

function ReferenceCreativesSection({ brief }: { brief: BriefResponse }) {
  const baseline = brief.ctr_score_estimate.baseline

  return (
    <SectionCard label="Reference Creatives">
      <div className="grid grid-cols-5 gap-4">
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
   06 — Include / Avoid
   ───────────────────────────────────────────────────────────── */

function IncludeAvoidSection({ brief }: { brief: BriefResponse }) {
  return (
    <SectionCard label="Include / Avoid">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="mb-4 font-data text-[12px] uppercase tracking-[0.08em] text-[var(--c-green)]">
            ✓ Include
          </h3>
          <ul className="flex flex-col">
            {brief.include.map((item, i) => (
              <li
                key={i}
                className="mb-2 rounded-[5px] bg-[var(--c-green-soft)] p-3 text-[13.5px] leading-[1.6] text-[var(--c-text-muted)]"
                style={{ borderLeft: '3px solid var(--c-green)' }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-4 font-data text-[12px] uppercase tracking-[0.08em] text-[var(--c-red)]">
            ✗ Avoid
          </h3>
          <ul className="flex flex-col">
            {brief.avoid.map((item, i) => (
              <li
                key={i}
                className="mb-2 rounded-[5px] bg-[var(--c-red-soft)] p-3 text-[13.5px] leading-[1.6] text-[var(--c-text-muted)]"
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
   07 — CTR Signal Analysis
   ───────────────────────────────────────────────────────────── */

function CTRSignalSection({ brief }: { brief: BriefResponse }) {
  const { baseline, elements, estimated_ctr } = brief.ctr_score_estimate

  return (
    <SectionCard label="CTR Signal Analysis">
      <div className="flex flex-col">
        {/* Baseline row */}
        <div className="mb-3 flex items-center gap-4">
          <span className="min-w-[230px] shrink-0 font-data text-[12px] text-[var(--c-text-faint)]">
            Baseline
          </span>
          <div className="flex h-[22px] w-[130px] items-center rounded-[4px] bg-[var(--c-surface-2)] px-3 font-data text-[11px] text-[var(--c-text-faint)]">
            {baseline.toFixed(2)}%
          </div>
        </div>

        {/* Lift rows */}
        {elements.map((el) => {
          const barWidth = Math.max(24, Math.round(Math.abs(el.lift) * 100))
          const isNegative = el.lift < 0
          return (
            <div key={el.feature} className="mb-3 flex items-center gap-4">
              <span
                className="min-w-[230px] shrink-0 font-data text-[12px] text-[var(--c-text)]"
                title={el.note}
              >
                {el.feature}
              </span>
              <div
                className={`flex h-[22px] items-center rounded-[4px] px-3 font-data text-[11px] ${
                  isNegative
                    ? 'bg-[var(--c-red-soft)] text-[var(--c-red)]'
                    : 'bg-[var(--c-green-soft)] text-[var(--c-green)]'
                }`}
                style={{ width: `${barWidth}px` }}
              >
                {el.lift > 0 ? '+' : ''}{el.lift.toFixed(2)}%
              </div>
            </div>
          )
        })}

        {/* Total row */}
        <div className="mt-5 flex items-baseline justify-between border-t border-[var(--c-border-subtle)] pt-5">
          <p className="font-data text-[12px] text-[var(--c-text-faint)]">
            Lifts are marginal effects — not independently additive. Estimated CTR is a model prediction.
          </p>
          <div className="flex items-baseline gap-3">
            <span className="font-display text-[28px] font-semibold tracking-[-0.5px] text-[var(--c-green)]">
              ~{estimated_ctr.toFixed(1)}%
            </span>
            <span className="font-data text-[12px] text-[var(--c-text-faint)]">estimated</span>
          </div>
        </div>
      </div>
    </SectionCard>
  )
}
