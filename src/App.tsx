import { useState } from 'react'
import { EmptyState } from './components/EmptyState'
import { ErrorMessage } from './components/ErrorMessage'
import { Header } from './components/Header'
import { InputPanel } from './components/InputPanel'
import { OutputPanel } from './components/OutputPanel'
import { GenerateError, generateIdeas } from './lib/generateIdeas'
import type { GenerationResponse } from './types/generation'

function App() {
  const [sessionEvent, setSessionEvent] = useState('')
  const [result, setResult] = useState<GenerationResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)

  async function handleGenerate() {
    setIsLoading(true)
    setError(null)

    try {
      const data = await generateIdeas(sessionEvent)
      setResult(data)
      setHasGenerated(true)
    } catch (err) {
      const message =
        err instanceof GenerateError
          ? err.message
          : 'Something unexpected happened. Please try again.'
      setError(message)
      setResult(null)
      setHasGenerated(true)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-3xl space-y-8 px-4 py-8 sm:py-10">
        <InputPanel
          value={sessionEvent}
          onChange={setSessionEvent}
          onSubmit={() => void handleGenerate()}
          isLoading={isLoading}
        />

        {!hasGenerated && !isLoading && <EmptyState />}

        {isLoading && (
          <div
            className="animate-fade-in rounded-2xl border border-gold/30 bg-parchment/70 px-6 py-10 text-center"
            aria-live="polite"
            aria-busy="true"
          >
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-navy/20 border-t-gold" />
            <p className="mt-4 font-display text-lg text-ink">Consulting the muses…</p>
            <p className="mt-1 text-sm text-ink/60">
              Crafting outcomes that honor your players&apos; choices.
            </p>
          </div>
        )}

        {error && !isLoading && (
          <ErrorMessage message={error} onRetry={() => void handleGenerate()} />
        )}

        {result && !isLoading && !error && <OutputPanel data={result} />}
      </main>
      <footer className="pb-10 text-center text-sm text-parchment/80">
        QuestCraft AI Copilot · built for Game Masters of ages 9–12
      </footer>
    </div>
  )
}

export default App
