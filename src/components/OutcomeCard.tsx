interface OutcomeCardProps {
  title: string
  description: string
  index: number
}

export function OutcomeCard({ title, description, index }: OutcomeCardProps) {
  return (
    <article
      className="animate-slide-up rounded-2xl border border-navy/10 bg-cream p-5 shadow-card"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="mb-2 flex items-start gap-3">
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-semibold text-gold"
          aria-hidden
        >
          {index + 1}
        </span>
        <h3 className="text-base font-semibold leading-snug text-navy sm:text-lg">{title}</h3>
      </div>
      <p className="pl-11 text-base leading-relaxed text-navy/85">{description}</p>
    </article>
  )
}
