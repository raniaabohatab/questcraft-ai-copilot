import { AlertCircle, RotateCcw } from 'lucide-react'

interface ErrorMessageProps {
  message: string
  onRetry: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <section
      className="animate-fade-in rounded-2xl border border-rose-300/60 bg-rose-50 px-5 py-6 text-center shadow-sm"
      role="alert"
    >
      <AlertCircle className="mx-auto h-8 w-8 text-rose-600" aria-hidden />
      <h2 className="mt-3 font-display text-lg text-ink">The muses stumbled</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink/70">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-medium text-parchment transition hover:bg-navy-deep focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
      >
        <RotateCcw className="h-4 w-4" aria-hidden />
        Try again
      </button>
    </section>
  )
}
