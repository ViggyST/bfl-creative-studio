import Image from 'next/image'
import type { ReferenceCreative } from '@/types/index'

interface CreativeCardProps {
  creative: ReferenceCreative
  isBestMatch?: boolean
  highPerformer?: boolean
}

export default function CreativeCard({ creative, isBestMatch, highPerformer }: CreativeCardProps) {
  return (
    <div
      className="overflow-hidden rounded-[8px] border bg-[var(--c-surface)] shadow-[var(--shadow-card)]"
      style={{ borderColor: isBestMatch ? 'var(--c-amber)' : 'var(--c-border)' }}
      title={creative.match_reason}
    >
      <div className="relative h-[120px] w-full bg-[var(--c-surface-2)]">
        <Image
          src={creative.url}
          alt={creative.display_name}
          fill
          className="object-cover"
          sizes="200px"
        />
        <span
          className={`absolute right-2 top-2 rounded-[var(--radius-pill)] px-[10px] py-[3px] font-data text-[11px] ${
            highPerformer
              ? 'bg-[var(--c-green-soft)] text-[var(--c-green)]'
              : 'bg-[var(--c-amber-soft)] text-[var(--c-amber)]'
          }`}
        >
          {creative.ctr.toFixed(1)}%
        </span>
      </div>
      <p className="p-2.5 font-data text-[11px] leading-[1.5] text-[var(--c-text-faint)]">
        {creative.display_name}
      </p>
    </div>
  )
}
