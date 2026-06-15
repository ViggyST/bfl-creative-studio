'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import CopyButton from './CopyButton'
import type { BriefRequest, BriefResponse } from '@/types/index'

interface BriefOutputProps {
  brief: BriefResponse
  request: BriefRequest
  onNewBrief: () => void
}

export default function BriefOutput({ brief, request, onNewBrief }: BriefOutputProps) {
  return (
    <main className="flex-1 px-5 py-5">
      <div className="mx-auto flex max-w-[900px] flex-col gap-3">
        <BriefRequestCard request={request} brief={brief} onNewBrief={onNewBrief} />
        <CreativeTypeSection brief={brief} request={request} />
        <ImagePromptsSection brief={brief} />
        <CopyFormulaSection brief={brief} />
        <LayoutBriefSection brief={brief} />
        <ReferenceCreativesSection brief={brief} />
        <IncludeAvoidSection brief={brief} />
        <CTRWaterfallSection brief={brief} />
      </div>
    </main>
  )
}

/* ─────────────────────────────────────────────────────────────
   Brief Request Card (spec §6)
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
    ? request.intent
    : `${brief.detected_intent} (auto-detected)`

  return (
    <div
      className="flex flex-wrap items-center gap-4 rounded-[var(--radius-lg)] border border-[var(--c-border)] bg-[var(--c-surface-2)] px-5 py-[11px]"
      style={{ borderTop: '2px solid var(--c-amber)' }}
    >
      <button
        type="button"
        onClick={onNewBrief}
        className="flex shrink-0 items-center gap-1 rounded-[var(--radius-pill)] border border-[var(--c-border)] bg-[var(--c-bg)] px-3 py-[6px] font-data text-[11px] text-[var(--c-text-muted)]"
      >
        <ArrowLeft size={12} />
        New Brief
      </button>

      <div className="grid flex-1 grid-cols-1 gap-x-6 gap-y-1 border-l border-[var(--c-border)] pl-4 sm:grid-cols-2">
        <Field label="Product" value={request.product} />
        <Field label="Offer" value={request.offer} />
        <Field label="Context" value={request.context || '—'} />
        <Field label="Intent" value={intentLabel} />
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span className="rounded-[var(--radius-pill)] bg-[var(--c-amber-soft)] px-3 py-1 font-data text-[11px] text-[var(--c-amber)]">
          {brief.creative_type}
        </span>
        <span className="rounded-[var(--radius-pill)] bg-[var(--c-green-soft)] px-3 py-1 font-data text-[11px] text-[var(--c-green)]">
          ~{brief.ctr_score_estimate.estimated_ctr.toFixed(1)}% CTR
        </span>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="font-data text-[9px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">
        {label}:{' '}
      </span>
      <span className="text-[12px] text-[var(--c-text)]">{value}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Shared section card wrapper (spec §5.2)
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
      className="rounded-[var(--radius-lg)] border border-[var(--c-border)] bg-[var(--c-surface)] px-4 py-[14px] shadow-[var(--shadow-card)]"
      style={amberBorderLeft ? { borderLeft: '2px solid var(--c-amber)' } : undefined}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-data text-[10px] uppercase tracking-[0.1em] text-[var(--c-amber)]">
            {label}
          </h2>
          {badge && (
            <span className="rounded-[var(--radius-pill)] bg-[var(--c-amber-soft)] px-2 py-[2px] font-data text-[9px] text-[var(--c-amber)]">
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
   01 — Creative Type (spec §5.3)
   ───────────────────────────────────────────────────────────── */

function CreativeTypeSection({
  brief,
  request,
}: {
  brief: BriefResponse
  request: BriefRequest
}) {
  const intentBadge = request.intent
    ? brief.detected_intent
    : `Auto-detected · ${brief.detected_intent}`

  return (
    <SectionCard label="Creative Type">
      <div className="mb-3 flex flex-wrap gap-2">
        <span className="rounded-[var(--radius-pill)] bg-[var(--c-amber-soft)] px-3 py-1 font-data text-[11px] text-[var(--c-amber)]">
          {brief.creative_type.toUpperCase()}
        </span>
        <span className="rounded-[var(--radius-pill)] bg-[var(--c-blue-soft)] px-3 py-1 font-data text-[11px] text-[var(--c-blue)]">
          {intentBadge}
        </span>
      </div>

      <div className="flex items-baseline justify-between gap-4">
        <h2 className="font-display text-[30px] font-semibold tracking-[-0.8px] text-[var(--c-text)]">
          {brief.creative_type}
        </h2>
        <div className="text-right">
          <div className="font-display text-[24px] font-semibold tracking-[-0.5px] text-[var(--c-green)]">
            ~{brief.ctr_score_estimate.estimated_ctr.toFixed(1)}%
          </div>
          <div className="font-data text-[10px] text-[var(--c-text-faint)]">
            Estimated CTR ±0.5%
          </div>
        </div>
      </div>
      <div className="mb-3 mt-1 h-[2px] w-9 bg-[var(--c-amber)]" />

      <p className="max-w-[64ch] text-[12px] leading-relaxed text-[var(--c-text-muted)]">
        {brief.creative_type_reason}
      </p>

      <div className="mt-2 flex items-center gap-2 font-data text-[11px] text-[var(--c-text-faint)]">
        <span className="h-[5px] w-[5px] rounded-full bg-[var(--c-blue)]" />
        Intent signal: {brief.intent_signal}
      </div>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   02 — Image Gen Prompts (spec §5.4)
   ───────────────────────────────────────────────────────────── */

function ImagePromptsSection({ brief }: { brief: BriefResponse }) {
  const [tab, setTab] = useState<'gpt4o' | 'gemini' | 'midjourney'>('gpt4o')
  const tabs: { key: 'gpt4o' | 'gemini' | 'midjourney'; label: string }[] = [
    { key: 'gpt4o', label: 'GPT-4o' },
    { key: 'gemini', label: 'Gemini' },
    { key: 'midjourney', label: 'Midjourney' },
  ]

  return (
    <SectionCard label="Image Gen Prompts">
      <div className="mb-3 flex gap-4 border-b border-[var(--c-border-subtle)]">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`border-b-2 pb-2 font-data text-[11px] transition-colors ${
              tab === t.key
                ? 'border-[var(--c-green)] text-[var(--c-green)]'
                : 'border-transparent text-[var(--c-text-faint)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative rounded-[var(--radius-sm)] border border-[var(--c-border-subtle)] bg-[var(--c-surface-3)] p-3">
        <div className="absolute right-2 top-2">
          <CopyButton text={brief.image_prompts[tab]} />
        </div>
        <p className="whitespace-pre-wrap pr-16 font-data text-[11px] leading-[1.7] text-[var(--c-text-muted)]">
          {brief.image_prompts[tab]}
        </p>
      </div>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   03 — Copy Formula (spec §5.5)
   ───────────────────────────────────────────────────────────── */

function CopyFormulaSection({ brief }: { brief: BriefResponse }) {
  const { headline, body, cta } = brief.copy_formula
  const copyAllText = `Headline: ${headline}\n\nBody: ${body}\n\nCTA: ${cta}`

  return (
    <SectionCard label="Copy Formula" copyText={copyAllText}>
      <div className="flex flex-col gap-2">
        <CopyBox label="Headline" value={headline} color="var(--c-text)" />
        <CopyBox label="Body" value={body} color="var(--c-amber-deep)" />
        <CopyBox label="CTA" value={cta} color="var(--c-blue)" />
      </div>
    </SectionCard>
  )
}

function CopyBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-[var(--radius-sm)] border border-[var(--c-border-subtle)] bg-[var(--c-surface-3)] px-3 py-2">
      <div className="mb-1 font-data text-[9px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">
        {label}
      </div>
      <div className="font-data text-[12px]" style={{ color }}>
        {value}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   04 — Layout Brief (spec §5.6)
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
        <div className="flex flex-wrap gap-1.5">
          {lb.benefit_chips.map((chip, i) => (
            <span
              key={i}
              className="rounded-[var(--radius-pill)] bg-[var(--c-green-soft)] px-2.5 py-[3px] font-data text-[11px] text-[var(--c-green)]"
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
            className={`flex gap-3 py-[6px] ${
              i < rows.length - 1 ? 'border-b border-[var(--c-border-subtle)]' : ''
            }`}
          >
            <div className="min-w-[80px] shrink-0 font-data text-[9px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">
              {row.label}
            </div>
            <div className="text-[12px] text-[var(--c-text)]">{row.content}</div>
          </div>
        ))}
      </div>
    </SectionCard>
  )
}
/* ─────────────────────────────────────────────────────────────
   05 — Reference Creatives (spec §5.7)
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
        <p className="mt-3 font-data text-[10px] text-[var(--c-text-ghost)]">
          PNG thumbnails from /public/creatives/ · gold border = best match
        </p>
      </SectionCard>
    )
  }
  
  /* ─────────────────────────────────────────────────────────────
     06 — Include / Avoid (spec §5.8)
     ───────────────────────────────────────────────────────────── */
  
  function IncludeAvoidSection({ brief }: { brief: BriefResponse }) {
    return (
      <SectionCard label="Include / Avoid">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:divide-x sm:divide-[var(--c-border-subtle)]">
          <div>
            <h3 className="mb-2 font-data text-[10px] uppercase tracking-[0.08em] text-[var(--c-green)]">
              ✓ Include
            </h3>
            <ul className="flex flex-col gap-1.5">
              {brief.include.map((item, i) => (
                <li
                  key={i}
                  className="rounded-[var(--radius-sm)] bg-[var(--c-green-soft)] px-2.5 py-1.5 text-[11px] text-[var(--c-text-muted)]"
                  style={{ borderLeft: '2px solid var(--c-green)' }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
  
          <div className="border-t border-[var(--c-border-subtle)] pt-4 sm:border-t-0 sm:pl-4 sm:pt-0">
            <h3 className="mb-2 font-data text-[10px] uppercase tracking-[0.08em] text-[var(--c-red)]">
              ✗ Avoid
            </h3>
            <ul className="flex flex-col gap-1.5">
              {brief.avoid.map((item, i) => (
                <li
                  key={i}
                  className="rounded-[var(--radius-sm)] bg-[var(--c-red-soft)] px-2.5 py-1.5 text-[11px] text-[var(--c-text-muted)]"
                  style={{ borderLeft: '2px solid var(--c-red)' }}
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
     07 — CTR Score Waterfall (spec §5.9)
     ───────────────────────────────────────────────────────────── */
  
  function CTRWaterfallSection({ brief }: { brief: BriefResponse }) {
    const { baseline, elements, estimated_ctr } = brief.ctr_score_estimate
    const BASELINE_BAR_WIDTH = 80 // px
    const maxLift = Math.max(...elements.map((e) => Math.abs(e.lift)), 0.01)
    const opacities = [0.16, 0.12, 0.08]
  
    return (
      <SectionCard label="CTR Score Waterfall">
        <div className="flex flex-col gap-1.5">
          <WaterfallRow
            label="Baseline"
            labelColor="var(--c-text-faint)"
            value={`${baseline.toFixed(2)}%`}
            barWidth={BASELINE_BAR_WIDTH}
            barColor="var(--c-surface-2)"
          />
  
          {elements.map((el, i) => {
            const width = Math.max(20, (Math.abs(el.lift) / maxLift) * BASELINE_BAR_WIDTH)
            const isNegative = el.lift < 0
            return (
              <WaterfallRow
                key={el.feature}
                label={el.feature}
                labelColor="var(--c-text)"
                value={`${el.lift > 0 ? '+' : ''}${el.lift.toFixed(2)}%`}
                barWidth={width}
                barColor={
                  isNegative
                    ? 'var(--c-red-soft)'
                    : `rgba(26, 143, 78, ${opacities[Math.min(i, opacities.length - 1)]})`
                }
                valueColor={isNegative ? 'var(--c-red)' : 'var(--c-text)'}
                note={el.note}
              />
            )
          })}
  
          <div className="mt-2 flex items-center justify-between border-t border-[var(--c-border-subtle)] pt-2">
            <span className="font-data text-[10px] text-[var(--c-text-faint)]">estimated</span>
            <span className="font-display text-[18px] font-semibold tracking-[-0.5px] text-[var(--c-green)]">
              ~{estimated_ctr.toFixed(1)}%
            </span>
          </div>
        </div>
      </SectionCard>
    )
  }
  
  function WaterfallRow({
    label,
    labelColor,
    value,
    barWidth,
    barColor,
    valueColor = 'var(--c-text)',
    note,
  }: {
    label: string
    labelColor: string
    value: string
    barWidth: number
    barColor: string
    valueColor?: string
    note?: string
  }) {
    return (
      <div className="flex items-center gap-2">
        <span
          className="w-24 shrink-0 truncate font-data text-[10px]"
          style={{ color: labelColor }}
          title={note}
        >
          {label}
        </span>
        <div
          className="flex h-5 items-center justify-end rounded-[3px] px-1.5"
          style={{ width: `${barWidth}px`, backgroundColor: barColor }}
        >
          <span className="font-data text-[9px]" style={{ color: valueColor }}>
            {value}
          </span>
        </div>
      </div>
    )
  }
  