'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
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
      <div className="page-shell pt-4 pb-12">
        <BriefRequestCard request={request} brief={brief} onNewBrief={onNewBrief} />
        <div className="mt-5 space-y-[18px]">
          <BaseCreativeSection brief={brief} />
          <KeepChangeSection brief={brief} />
          <ComponentSpecSection brief={brief} />
          <CopyPackSection brief={brief} />
          <ABExperimentSection brief={brief} />
          <ImagePromptsSection brief={brief} />
          <ReferenceCreativesSection brief={brief} />
          <CTRSignalSection brief={brief} />
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Zone 1 — Brief Request Card
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
  const confidenceColor =
    brief.confidence === 'HIGH'
      ? 'bg-[var(--c-green-soft)] text-[var(--c-green)]'
      : brief.confidence === 'MED'
      ? 'bg-[var(--c-amber-soft)] text-[var(--c-amber)]'
      : 'bg-[var(--c-red-soft)] text-[var(--c-red)]'

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

      {/* Campaign + Scenario grid */}
      <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-2">
        <div className="col-span-2">
          <div className="font-data text-[9px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">Campaign</div>
          <div className="text-[12px] leading-[1.6] text-[var(--c-text)]">{request.freeText}</div>
        </div>
        <div>
          <div className="font-data text-[9px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">Scenario</div>
          <div className="text-[12px] text-[var(--c-text)]">{brief.scenario_name}</div>
        </div>
        <div>
          <div className="font-data text-[9px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">Scenario ID</div>
          <div className="text-[12px] text-[var(--c-text)]">{brief.scenario_id}</div>
        </div>
      </div>

      {/* Right-aligned badges */}
      <div className="flex shrink-0 flex-col items-end gap-2">
        <span className={`rounded-[var(--radius-pill)] px-4 py-[6px] font-data text-[12px] ${confidenceColor}`}>
          {brief.confidence} confidence
        </span>
        {brief.needs_pretest && (
          <span className="rounded-[var(--radius-pill)] bg-[var(--c-red-soft)] px-4 py-[6px] font-data text-[12px] text-[var(--c-red)]">
            Pre-test recommended
          </span>
        )}
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
  badge?: React.ReactNode
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
          {badge}
        </div>
        {copyText && <CopyButton text={copyText} />}
      </div>
      {children}
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   Zone 2 — Base Creative (full-width image + evidence)
   ───────────────────────────────────────────────────────────── */

function BaseCreativeSection({ brief }: { brief: BriefResponse }) {
  const base = brief.base_creative
  return (
    <SectionCard label="Base Creative">
      <div className="flex gap-6">
        <div className="w-[220px] shrink-0">
          <img
            src={base.url}
            alt={base.display_name}
            className="w-full rounded-[6px] border border-[var(--c-border)] object-contain"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div>
            <div className="font-data text-[9px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">Template</div>
            <div className="mt-1 font-display text-[20px] font-semibold tracking-[-0.3px] text-[var(--c-text)]">
              {base.display_name}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-[var(--radius-pill)] bg-[var(--c-amber-soft)] px-4 py-[6px] font-data text-[12px] text-[var(--c-amber)]">
              {brief.scenario_name}
            </span>
            <span className="rounded-[var(--radius-pill)] bg-[var(--c-green-soft)] px-4 py-[6px] font-data text-[12px] text-[var(--c-green)]">
              CTR {base.ctr}%
            </span>
          </div>
          <div>
            <div className="font-data text-[9px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">Evidence</div>
            <p className="mt-1 text-[14px] leading-[1.6] text-[var(--c-text-muted)]">{brief.evidence_note}</p>
          </div>
          <div className="font-data text-[11px] text-[var(--c-text-ghost)]">
            {base.filename}
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   Zone 3 — Keep / Change panels (chip style)
   ───────────────────────────────────────────────────────────── */

function KeepChangeSection({ brief }: { brief: BriefResponse }) {
  return (
    <SectionCard label="Synthesis — Keep · Change">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="mb-3 font-data text-[12px] uppercase tracking-[0.08em] text-[var(--c-green)]">
            ✓ Keep
          </h3>
          <div className="flex flex-wrap gap-2">
            {brief.structural_keep.map((item, i) => (
              <span
                key={i}
                className="rounded-[var(--radius-pill)] bg-[var(--c-green-soft)] px-4 py-[7px] font-data text-[12px] text-[var(--c-green)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-3 font-data text-[12px] uppercase tracking-[0.08em] text-[var(--c-amber)]">
            ↻ Change
          </h3>
          <div className="flex flex-wrap gap-2">
            {brief.story_change.map((item, i) => (
              <span
                key={i}
                className="rounded-[var(--radius-pill)] bg-[var(--c-amber-soft)] px-4 py-[7px] font-data text-[12px] text-[var(--c-amber)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   Zone 4 — Component Spec (6-row table)
   ───────────────────────────────────────────────────────────── */

function ComponentSpecSection({ brief }: { brief: BriefResponse }) {
  const spec = brief.component_spec

  const copyText = [
    `HERO: ${spec.hero}`,
    `CARD: ${spec.card}`,
    `BACKGROUND: ${spec.background}`,
    `CHIPS: ${spec.chips.join(' · ')}`,
    `LOGO: ${spec.logo}`,
    `CTA: ${spec.cta}`,
  ].join('\n')

  const rows: { label: string; content: React.ReactNode }[] = [
    { label: 'HERO', content: spec.hero },
    { label: 'CARD', content: spec.card },
    { label: 'BACKGROUND', content: spec.background },
    {
      label: 'CHIPS',
      content: (
        <div className="flex flex-wrap gap-2">
          {spec.chips.map((chip, i) => (
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
    { label: 'LOGO', content: spec.logo },
    { label: 'CTA', content: spec.cta },
  ]

  return (
    <SectionCard
      label="Component Spec"
      copyText={copyText}
      amberBorderLeft
      badge={
        <span className="ml-1 rounded-[var(--radius-pill)] bg-[var(--c-amber-soft)] px-3 py-[4px] font-data text-[11px] uppercase tracking-[0.06em] text-[var(--c-amber)]">
          ★ Most important
        </span>
      }
    >
      <div className="flex flex-col">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex gap-6 border-b border-[var(--c-border-subtle)] py-2.5 last:border-b-0 last:pb-0 first:pt-0"
          >
            <div className="min-w-[100px] shrink-0 pt-0.5 font-data text-[9px] uppercase tracking-[0.08em] text-[var(--c-text-faint)]">
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
   Zone 5 — Copy Pack
   ───────────────────────────────────────────────────────────── */

function CopyPackSection({ brief }: { brief: BriefResponse }) {
  const { headline, body, cta } = brief.copy_pack
  const copyAllText = `Headline: ${headline}\n\nBody: ${body}\n\nCTA: ${cta}`

  return (
    <SectionCard label="Copy Pack" copyText={copyAllText}>
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
   Zone 6 — A/B Experiment
   ───────────────────────────────────────────────────────────── */

function ABExperimentSection({ brief }: { brief: BriefResponse }) {
  return (
    <SectionCard
      label="A/B Experiment"
      copyText={brief.ab_experiment}
      badge={
        <span className="ml-1 rounded-[var(--radius-pill)] bg-[var(--c-red-soft)] px-3 py-[4px] font-data text-[11px] uppercase tracking-[0.06em] text-[var(--c-red)]">
          Experiment — Unproven
        </span>
      }
    >
      <p className="text-[14px] leading-[1.7] text-[var(--c-text-muted)]">
        {brief.ab_experiment}
      </p>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   Zone 7 — Image Adaptation Prompts (tabs)
   ───────────────────────────────────────────────────────────── */

function ImagePromptsSection({ brief }: { brief: BriefResponse }) {
  const [tab, setTab] = useState<'gpt4o' | 'gemini' | 'midjourney'>('gpt4o')
  const tabs: { key: 'gpt4o' | 'gemini' | 'midjourney'; label: string }[] = [
    { key: 'gpt4o', label: 'GPT-4o' },
    { key: 'gemini', label: 'Gemini' },
    { key: 'midjourney', label: 'Midjourney' },
  ]

  return (
    <SectionCard label="Image Adaptation Prompts" copyText={brief.image_prompts[tab]}>
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
      <div className="mt-3 rounded-[6px] border border-[var(--c-border-subtle)] bg-[var(--c-surface-3)] p-4">
        <p className="prose-block whitespace-pre-wrap font-data text-[13px] leading-[1.7] text-[var(--c-text-muted)]">
          {brief.image_prompts[tab]}
        </p>
      </div>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   Zone 8 — Reference Creatives (5-card row, is_base = gold border)
   ───────────────────────────────────────────────────────────── */

function ReferenceCreativesSection({ brief }: { brief: BriefResponse }) {
  return (
    <SectionCard label="Reference Creatives">
      <div className="grid grid-cols-5 gap-3">
        {brief.reference_creatives.map((creative) => (
          <CreativeCard
            key={creative.filename}
            creative={{ ...creative, match_reason: '' }}
            isBestMatch={creative.is_base}
            highPerformer={creative.ctr >= 2.12}
          />
        ))}
      </div>
      <p className="mt-4 font-data text-[11px] text-[var(--c-text-ghost)]">
        PNG thumbnails from /public/creatives/ · gold border = base creative
      </p>
    </SectionCard>
  )
}

/* ─────────────────────────────────────────────────────────────
   Zone 9 — CTR Signal Analysis (collapsed by default)
   ───────────────────────────────────────────────────────────── */

function CTRSignalSection({ brief }: { brief: BriefResponse }) {
  const [open, setOpen] = useState(false)
  const { baseline, signals, estimated_range, confidence } = brief.ctr_signal_analysis

  return (
    <section className="rounded-[var(--radius-lg)] border border-[var(--c-border)] bg-[var(--c-surface)] shadow-[var(--shadow-card)]">
      {/* Collapsible header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-6 py-5"
      >
        <span className="font-data text-[10px] uppercase tracking-[0.1em] text-[var(--c-amber)]">
          CTR Signal Analysis
        </span>
        <div className="flex items-center gap-3">
          <span className="font-data text-[12px] text-[var(--c-text-faint)]">
            Est. {estimated_range}
          </span>
          {open ? (
            <ChevronUp size={14} className="text-[var(--c-text-faint)]" />
          ) : (
            <ChevronDown size={14} className="text-[var(--c-text-faint)]" />
          )}
        </div>
      </button>

      {open && (
        <div className="border-t border-[var(--c-border-subtle)] px-6 pb-5">
          <div className="mt-5 space-y-1">
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

            {/* Signal rows */}
            {signals.map((el) => {
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

          <div className="mt-4 flex items-start justify-between border-t border-[var(--c-border-subtle)] pt-4">
            <div>
              <p className="max-w-[58ch] font-data text-[12px] text-[var(--c-text-faint)]">
                Lifts are marginal effects — not independently additive. Estimated range is a holistic prediction.
              </p>
              <p className="mt-1 font-data text-[11px] text-[var(--c-text-ghost)]">
                Confidence: {confidence}
              </p>
            </div>
            <div className="flex shrink-0 items-baseline gap-3">
              <span className="font-display text-[28px] font-semibold tracking-[-0.5px] text-[var(--c-green)]">
                {estimated_range}
              </span>
              <span className="font-data text-[12px] text-[var(--c-text-faint)]">estimated CTR</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
