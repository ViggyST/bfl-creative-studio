'use client'

import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import type { BriefRequest } from '@/types/index'

interface BriefFormProps {
  onSubmit: (data: BriefRequest) => void
  initialValues?: Partial<BriefRequest>
}

const EXAMPLES = [
  'iPhone 16, ₹1,000 cashback, cold audience',
  'Voltas AC, ₹2,000 cashback, Diwali season',
  'Card benefits, new card holders, generic',
]

export default function BriefForm({ onSubmit, initialValues }: BriefFormProps) {
  const [input, setInput] = useState(initialValues?.freeText ?? '')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit() {
    if (!input.trim()) { setError('Please describe your campaign.'); return; }
    setError(null)
    onSubmit({ freeText: input.trim() })
  }

  return (
    <div className="w-full max-w-[760px]">
      {/* Eyebrow */}
      <p className="mb-3 text-center font-data text-[12px] uppercase tracking-[0.12em] text-[var(--c-text-faint)]">
        Creative Intelligence Tool
      </p>

      {/* Heading */}
      <h1 className="text-center font-display text-[42px] font-semibold tracking-[-0.7px] text-[var(--c-text)]">
        Generate a creative brief
      </h1>

      {/* Underline */}
      <div className="mx-auto mt-4 mb-4 h-[3px] w-[52px] bg-[var(--c-amber)]" />

      {/* Sub-copy */}
      <p className="mb-8 text-center text-[14px] leading-relaxed text-[var(--c-text-faint)]">
        Backed by 100 analysed Insta EMI Card creatives · Confound-corrected CTR data
        <br />
        Tell us your campaign in plain English. No form filling required.
      </p>

      <div className="flex flex-col gap-4">
        {/* Main input */}
        <div>
          <label
            htmlFor="freeText"
            className="mb-2 block font-data text-[12px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]"
          >
            Describe your campaign
          </label>
          <textarea
            id="freeText"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. Voltas AC 1.5T, ₹2,000 cashback, Diwali sale"
            rows={5}
            className="w-full resize-none rounded-[7px] border border-[var(--c-border)]
                       bg-[var(--c-surface)] px-[18px] py-[16px] text-[16px]
                       text-[var(--c-text)] placeholder:text-[var(--c-text-ghost)]
                       transition-[border-color,box-shadow] duration-150
                       focus:border-[var(--c-amber)] focus:shadow-[var(--shadow-focus)]
                       focus:outline-none"
          />
          {error && (
            <p className="mt-1 text-[11px] text-[var(--c-red)]">{error}</p>
          )}
        </div>

        {/* Hint text */}
        <p className="font-data text-[12px] text-[var(--c-text-faint)]">
          Include: product or category · offer details · season or event · audience
        </p>

        {/* Example chips */}
        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setInput(ex)}
              className="rounded-[var(--radius-pill)] border border-[var(--c-border)]
                         bg-[var(--c-surface)] px-4 py-[8px] font-data text-[12px]
                         text-[var(--c-text-faint)] transition-colors duration-150
                         hover:border-[var(--c-amber)] hover:text-[var(--c-amber)]"
            >
              {ex}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-[7px]
                     bg-[var(--c-amber)] px-7 py-[18px] font-display text-[16px]
                     font-semibold tracking-[-0.1px] text-[var(--c-surface)]
                     transition-opacity duration-150 hover:opacity-90"
        >
          <Sparkles size={16} />
          Generate brief
        </button>
      </div>

      {/* Footer note */}
      <p className="mt-3 text-center font-data text-[12px] text-[var(--c-text-ghost)]">
        10–90 seconds to generate · ₹2.30 per brief · No data stored
      </p>
    </div>
  )
}
