'use client'

import { useState, useEffect } from 'react'
import BriefForm from '@/components/BriefForm'
import BriefOutput from '@/components/BriefOutput'
import type { BriefRequest, BriefResponse } from '@/types/index'

type AppState = 'form' | 'loading' | 'output'

const LOADING_STEPS = [
  'Classifying product & intent',
  'Matching reference creatives',
  'Building layout brief',
  'Generating copy formula',
  'Composing image prompts',
]

export default function Home() {
  const [state, setState] = useState<AppState>('form')
  const [formData, setFormData] = useState<BriefRequest | undefined>(undefined)
  const [brief, setBrief] = useState<BriefResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [stepIndex, setStepIndex] = useState(0)

  // Cycle loading step text every 340ms while in loading state
  useEffect(() => {
    if (state !== 'loading') return
    const interval = setInterval(() => {
      setStepIndex((i) => (i + 1) % LOADING_STEPS.length)
    }, 340)
    return () => clearInterval(interval)
  }, [state])

  async function handleSubmit(data: BriefRequest) {
    setFormData(data)
    setError(null)
    setStepIndex(0)
    setState('loading')

    try {
      const res = await fetch('/api/generate-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()

      if (!res.ok || json.error) {
        setError(json.error || 'Brief generation failed. Please try again.')
        setState('form')
        return
      }

      setBrief(json as BriefResponse)
      setState('output')
    } catch {
      setError('Brief generation failed. Please try again.')
      setState('form')
    }
  }

  function handleNewBrief() {
    setState('form')
    setBrief(null)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <HeaderBar />

      {state === 'form' && (
        <main className="flex flex-1 flex-col items-center justify-center px-5 py-10">
          {error && (
            <div className="mb-4 w-full max-w-[520px] rounded-[var(--radius-sm)] border border-[var(--c-red)] bg-[var(--c-red-soft)] px-4 py-3 text-[12px] text-[var(--c-red)]">
              {error}
            </div>
          )}
          <BriefForm onSubmit={handleSubmit} initialValues={formData} />
        </main>
      )}

      {state === 'loading' && <LoadingScreen stepIndex={stepIndex} />}

      {state === 'output' && brief && formData && (
        <BriefOutput brief={brief} request={formData} onNewBrief={handleNewBrief} />
      )}
    </div>
  )
}

function HeaderBar() {
  return (
    <header className="flex h-[46px] items-center justify-between border-b border-[var(--c-border)] bg-[var(--c-surface)] px-5">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[var(--c-amber)]" />
        <span className="font-display text-[13px] font-semibold tracking-[-0.2px] text-[var(--c-text)]">
          BFL Creative Studio
        </span>
      </div>
      <span className="font-data text-[11px] text-[var(--c-text-faint)]">
        Insta EMI Card · Marketing
      </span>
    </header>
  )
}

function LoadingScreen({ stepIndex }: { stepIndex: number }) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4">
      <p className="font-display text-[16px] font-semibold text-[var(--c-text)]">
        Generating brief...
      </p>
      <div className="h-[2px] w-[200px] overflow-hidden rounded-full bg-[var(--c-surface-2)]">
        <div className="h-full w-0 rounded-full bg-[var(--c-amber)] [animation:loadbar_1.7s_ease-out_forwards]" />
      </div>
      <p className="font-data text-[11px] text-[var(--c-text-faint)]">
        {LOADING_STEPS[stepIndex]}
      </p>
    </main>
  )
}
