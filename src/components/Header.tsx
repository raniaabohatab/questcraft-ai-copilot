import { Scroll, Sparkles } from 'lucide-react'

export function Header() {
  return (
    <header className="relative overflow-hidden border-b border-gold/25 bg-navy-deep/80 backdrop-blur-sm">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 0%, rgba(212, 175, 55, 0.18), transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(74, 144, 164, 0.2), transparent 50%)',
        }}
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-4 py-10 text-center sm:py-14">
        <div className="mb-4 flex items-center gap-2 text-gold">
          <Scroll className="h-5 w-5" aria-hidden />
          <Sparkles className="h-4 w-4 opacity-80" aria-hidden />
        </div>
        <h1 className="font-display text-3xl tracking-wide text-parchment sm:text-4xl md:text-5xl">
          QuestCraft AI Copilot
        </h1>
        <p className="mt-3 max-w-xl text-base text-parchment/75 sm:text-lg">
          Your co-pilot for the unexpected moments in your quest.
        </p>
      </div>
    </header>
  )
}
