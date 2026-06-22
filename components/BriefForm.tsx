'use client'

import { useState, FormEvent } from 'react'
import { Sparkles } from 'lucide-react'
import type { BriefRequest, CreativeIntent } from '@/types/index'

type IntentOption = CreativeIntent | 'Auto-detect'

const INTENT_OPTIONS: IntentOption[] = [
  'Auto-detect',
  'Card-Led',
  'Product-Led',
  'Offer-Led',
  'Festive/Event',
]

interface BriefFormProps {
  onSubmit: (data: BriefRequest) => void
  initialValues?: Partial<BriefRequest>
}

export default function BriefForm({ onSubmit, initialValues }: BriefFormProps) {
  const [intent, setIntent] = useState<IntentOption>(initialValues?.intent ?? 'Auto-detect')
  const [product, setProduct] = useState(initialValues?.product ?? '')
  const [offer, setOffer] = useState(initialValues?.offer ?? '')
  const [context, setContext] = useState(initialValues?.context ?? '')
  const [errors, setErrors] = useState<{ product?: string; offer?: string }>({})

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    const newErrors: { product?: string; offer?: string } = {}
    if (!product.trim()) newErrors.product = 'Required'
    if (!offer.trim()) newErrors.offer = 'Required'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    onSubmit({
      intent: intent === 'Auto-detect' ? undefined : intent,
      product: product.trim(),
      offer: offer.trim(),
      context: context.trim() || undefined,
    })
  }

  return (
    <div className="w-full max-w-[760px]">
      {/* Eyebrow — mb-3 */}
      <p className="mb-3 text-center font-data text-[12px] uppercase tracking-[0.12em] text-[var(--c-text-faint)]">
        Creative Intelligence Tool
      </p>

      {/* Heading */}
      <h1 className="text-center font-display text-[42px] font-semibold tracking-[-0.7px] text-[var(--c-text)]">
        Generate a creative brief
      </h1>

      {/* Underline — mt-4 from h1, mb-4 to sub-copy */}
      <div className="mx-auto mt-4 mb-4 h-[3px] w-[52px] bg-[var(--c-amber)]" />

      {/* Sub-copy — mb-8 gap to form */}
      <p className="mb-8 text-center text-[14px] leading-relaxed text-[var(--c-text-faint)]">
        Backed by 82 analysed Insta EMI Card creatives · Confound-corrected CTR data
        <br />
        Fill 4 fields. Get a production-ready brief in ~4 seconds.
      </p>

      {/* Form — gap-4 between all field groups */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Campaign Intent — mb-5 extra gap before Product */}
        <div className="mb-5">
          <div className="mb-2 flex items-baseline justify-between">
            <label className="font-data text-[12px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">
              Campaign Intent
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            {INTENT_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setIntent(opt)}
                className={`rounded-[var(--radius-pill)] border px-5 py-[10px] font-data text-[13px] transition-colors duration-150 ${
                  intent === opt
                    ? 'border-[var(--c-amber)] bg-[var(--c-amber-soft)] text-[var(--c-amber)]'
                    : 'border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-text-faint)]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* Product / Focus */}
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor="product" className="font-data text-[12px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">
              Product / Focus
            </label>
            <span className="rounded-[var(--radius-pill)] bg-[var(--c-amber-soft)] px-[10px] py-[3px] font-data text-[11px] uppercase tracking-[0.06em] text-[var(--c-amber)]">
              Required
            </span>
          </div>
          <input
            id="product"
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="e.g. Voltas AC — summer theme, iPhone 16, Card Hero"
            className={inputClasses(!!errors.product)}
          />
          {errors.product && (
            <p className="mt-1 text-[11px] text-[var(--c-red)]">{errors.product}</p>
          )}
        </div>

        {/* Offer */}
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor="offer" className="font-data text-[12px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">
              Offer
            </label>
            <span className="rounded-[var(--radius-pill)] bg-[var(--c-amber-soft)] px-[10px] py-[3px] font-data text-[11px] uppercase tracking-[0.06em] text-[var(--c-amber)]">
              Required
            </span>
          </div>
          <input
            id="offer"
            type="text"
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            placeholder="e.g. ₹2,000 cashback + Zero Down Payment"
            className={inputClasses(!!errors.offer)}
          />
          {errors.offer && (
            <p className="mt-1 text-[11px] text-[var(--c-red)]">{errors.offer}</p>
          )}
        </div>

        {/* Context */}
        <div>
          <div className="mb-2 flex items-baseline justify-between">
            <label htmlFor="context" className="font-data text-[12px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">
              Context
            </label>
            <span className="rounded-[var(--radius-pill)] bg-[var(--c-surface-2)] px-[10px] py-[3px] font-data text-[11px] uppercase tracking-[0.06em] text-[var(--c-text-faint)]">
              Optional
            </span>
          </div>
          <textarea
            id="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Audience notes, seasonal event, tone, competitor angle…"
            rows={3}
            className={`${inputClasses(false)} min-h-[140px] resize-none`}
          />
        </div>

        {/* Generate button — mt-2 extra gap from Context */}
        <button
          type="submit"
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-[7px] bg-[var(--c-amber)] px-7 py-[18px] font-display text-[16px] font-semibold tracking-[-0.1px] text-[var(--c-surface)] transition-opacity duration-150 hover:opacity-90"
        >
          <Sparkles size={16} />
          Generate brief
        </button>
      </form>

      {/* Footer note — mt-3 */}
      <p className="mt-3 text-center font-data text-[12px] text-[var(--c-text-ghost)]">
        10–90 seconds to generate · ₹2.30 per brief · No data stored
      </p>
    </div>
  )
}

function inputClasses(hasError: boolean) {
  const border = hasError ? 'border-[var(--c-red)]' : 'border-[var(--c-border)]'
  return `w-full rounded-[7px] border ${border} bg-[var(--c-surface)] px-[18px] py-[16px] text-[16px] text-[var(--c-text)] placeholder:text-[var(--c-text-ghost)] transition-[border-color,box-shadow] duration-150 focus:border-[var(--c-amber)] focus:shadow-[var(--shadow-focus)] focus:outline-none`
}
