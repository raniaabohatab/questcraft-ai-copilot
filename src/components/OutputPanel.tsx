import { useState } from 'react'
import { Check, Copy, Info, ShieldCheck, Sprout } from 'lucide-react'
import type { GenerationResponse } from '../types/generation'
import { OutcomeCard } from './OutcomeCard'
import { ReminderBanner } from './ReminderBanner'

interface OutputPanelProps {
  data: GenerationResponse
}

export function OutputPanel({ data }: OutputPanelProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(data.narration)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="animate-fade-in space-y-5 rounded-2xl border border-ink/10 bg-parchment p-5 shadow-scroll sm:p-7">
      {data.isDemo && (
        <div className="flex items-start gap-2 rounded-xl border border-gold/50 bg-gold/20 px-4 py-3 text-sm text-navy">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-navy" aria-hidden />
          <p>
            <span className="font-semibold">Demo mode</span> — showing the Stormbristle Boar
            example. Add an <code className="rounded bg-navy/10 px-1">ANTHROPIC_API_KEY</code> to
            generate live ideas (see README).
          </p>
        </div>
      )}

      <section>
        <h2 className="text-lg font-semibold tracking-tight text-navy sm:text-xl">
          Possible Outcomes
        </h2>
        <p className="mt-1 text-sm text-navy/70">
          Three paths that honor what the players already chose.
        </p>
        <div className="mt-4 grid gap-4">
          {data.outcomes.map((outcome, index) => (
            <OutcomeCard
              key={`${outcome.title}-${index}`}
              title={outcome.title}
              description={outcome.description}
              index={index}
            />
          ))}
        </div>
      </section>

      <section
        className="animate-slide-up rounded-2xl border border-navy/10 bg-cream p-5 sm:p-6"
        style={{ animationDelay: '280ms' }}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold tracking-tight text-navy sm:text-xl">Narration</h2>
          <button
            type="button"
            onClick={() => void handleCopy()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-navy/20 bg-parchment px-3 py-1.5 text-sm font-medium text-navy transition hover:border-gold/60 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-teal" aria-hidden />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" aria-hidden />
                Copy
              </>
            )}
          </button>
        </div>
        <blockquote className="mt-4 border-l-4 border-gold pl-4 text-base leading-relaxed text-navy sm:text-lg">
          {data.narration}
        </blockquote>
      </section>

      <section
        className="animate-slide-up rounded-2xl border border-teal/25 bg-teal/10 p-5"
        style={{ animationDelay: '360ms' }}
      >
        <div className="mb-2 flex items-center gap-2 text-navy">
          <Sprout className="h-5 w-5 shrink-0 text-teal" aria-hidden />
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">Future Consequence</h2>
        </div>
        <p className="text-base leading-relaxed text-navy">{data.consequence}</p>
      </section>

      <div
        className="animate-slide-up inline-flex max-w-full items-start gap-2 rounded-full border border-navy/15 bg-cream px-4 py-2 text-sm text-navy"
        style={{ animationDelay: '420ms' }}
      >
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
        <span>
          <span className="font-semibold">Safety Note:</span> {data.safetyNote}
        </span>
      </div>

      <div className="animate-slide-up" style={{ animationDelay: '480ms' }}>
        <ReminderBanner />
      </div>
    </div>
  )
}
