import type { KeyboardEvent } from 'react'
import { Loader2, Sparkles } from 'lucide-react'
import { DEMO_SESSION_EVENT } from '../data/demoResponse'

interface InputPanelProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
}

export function InputPanel({ value, onChange, onSubmit, isLoading }: InputPanelProps) {
  const canSubmit = value.trim().length > 0 && !isLoading

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if ((event.metaKey || event.ctrlKey) && event.key === 'Enter' && canSubmit) {
      event.preventDefault()
      onSubmit()
    }
  }

  return (
    <section className="rounded-2xl border border-ink/10 bg-parchment/95 p-5 shadow-scroll sm:p-7">
      <label
        htmlFor="session-event"
        className="font-display text-lg text-ink sm:text-xl"
      >
        What just happened in your session?
      </label>
      <p className="mt-1 text-sm text-ink/60">
        Describe the players&apos; choice or the unexpected turn — we&apos;ll suggest where the
        story could go next.
      </p>
      <textarea
        id="session-event"
        rows={5}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
        placeholder={DEMO_SESSION_EVENT}
        className="mt-4 w-full resize-y rounded-xl border border-ink/15 bg-cream px-4 py-3 text-base text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40 disabled:opacity-70"
      />
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink/50">Tip: press ⌘/Ctrl + Enter to generate</p>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-navy px-5 py-3 font-medium text-parchment shadow-md transition hover:bg-navy-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-parchment disabled:cursor-not-allowed disabled:opacity-55"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Weaving ideas…
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-gold" aria-hidden />
              Generate Ideas
            </>
          )}
        </button>
      </div>
    </section>
  )
}
