type Props = {
  title: string
  /** Right-aligned caption next to the title. */
  meta?: React.ReactNode
  className?: string
  children: React.ReactNode
}

/** Surface card used for every section below the detail hero. */
const DetailCard: React.FC<Props> = ({
  title,
  meta,
  className = '',
  children
}) => (
  <section
    className={`flex min-w-0 flex-col gap-4 rounded-pkx-card border border-pkx-card bg-pkx-surface p-[26px] shadow-pkx-card max-md:p-5 ${className}`}
  >
    <div className="flex items-baseline justify-between gap-3">
      <h2 className="m-0 text-[19px] font-black">{title}</h2>
      {meta && (
        <span className="text-[13px] font-bold text-pkx-ink3">{meta}</span>
      )}
    </div>
    {children}
  </section>
)

/** Rounded tinted tile used for facts, abilities and sprites. */
const Tile = ({
  className = '',
  children
}: {
  className?: string
  children: React.ReactNode
}) => (
  <div className={`rounded-2xl bg-pkx-surface2 ${className}`}>{children}</div>
)

export { DetailCard, Tile }
