import { Compass, ScrollText } from 'lucide-react'

export function EmptyState() {
  return (
    <section
      className="animate-fade-in rounded-2xl border border-dashed border-gold/40 bg-parchment/60 px-6 py-12 text-center shadow-sm"
      aria-live="polite"
    >
      <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-navy/10 text-navy">
        <div className="relative">
          <ScrollText className="h-10 w-10" aria-hidden />
          <Compass className="absolute -bottom-1 -right-2 h-5 w-5 text-gold" aria-hidden />
        </div>
      </div>
      <h2 className="font-display text-xl text-ink sm:text-2xl">Your scroll awaits</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink/65 sm:text-base">
        Tell us what just happened at the table, then tap{' '}
        <span className="font-medium text-navy">Generate Ideas</span>. You&apos;ll get three
        possible outcomes, read-aloud narration, a future seed, and a quick safety check —
        all tuned for ages 9–12.
      </p>
    </section>
  )
}
