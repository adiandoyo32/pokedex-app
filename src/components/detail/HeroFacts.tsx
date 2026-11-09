export type Fact = { label: string; value: string }

/** "Details" card beside the artwork in the flat detail hero (design 5d). */
const HeroFacts = ({ facts }: { facts: Fact[] }) => (
  <section className="flex w-full max-w-[280px] flex-col gap-0.5 justify-self-end rounded-pkx-card border border-pkx-card bg-pkx-surface px-5 py-[18px] shadow-pkx-card">
    <h2 className="m-0 mb-1.5 text-base font-black">Details</h2>
    <dl className="m-0 flex flex-col">
      {facts.map(f => (
        <div
          key={f.label}
          className="flex items-baseline justify-between gap-3 border-t border-pkx-line py-[9px]"
        >
          <dt className="text-xs font-extrabold text-pkx-ink3">{f.label}</dt>
          <dd className="m-0 text-right text-[15px] font-extrabold">
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  </section>
)

export default HeroFacts
