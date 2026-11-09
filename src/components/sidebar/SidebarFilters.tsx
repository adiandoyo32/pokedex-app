import type { Filters } from '@/components/pokedex/FilterBar'
import {
  GENERATIONS,
  POKEMON_TYPES,
  capitalize,
  typeDot
} from '@/utils/pokex-theme'

type Props = {
  gen: number
  type: string | null
  onChange: (patch: Partial<Filters>) => void
}

const optionClass = (active: boolean) =>
  `flex h-[34px] items-center rounded-[9px] transition-colors ${
    active
      ? 'bg-pkx-surface2 font-black text-pkx-ink'
      : 'font-bold text-pkx-ink2 hover:bg-pkx-surface2'
  }`

const Section = ({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) => (
  <div className="flex flex-col gap-1.5" role="group" aria-label={title}>
    <span className="px-3 pb-0.5 text-xs font-extrabold text-pkx-ink3">
      {title}
    </span>
    <div className="grid grid-cols-3 gap-[3px]">{children}</div>
  </div>
)

/** Generation and type filters as always-visible grids (design 5d). */
const SidebarFilters: React.FC<Props> = ({ gen, type, onChange }) => (
  <>
    <Section title="Generation">
      <button
        type="button"
        className={`${optionClass(!gen)} col-span-full px-3 text-[13px]`}
        aria-pressed={!gen}
        onClick={() => onChange({ gen: 0 })}
      >
        All generations
      </button>
      {GENERATIONS.map(g => (
        <button
          key={g.id}
          type="button"
          title={`${g.region} · ${g.range}`}
          className={`${optionClass(gen === g.id)} justify-center text-[13px]`}
          aria-pressed={gen === g.id}
          onClick={() => onChange({ gen: g.id })}
        >
          Gen {g.roman}
        </button>
      ))}
    </Section>

    <Section title="Type">
      <button
        type="button"
        className={`${optionClass(!type)} col-span-full px-3 text-[13px]`}
        aria-pressed={!type}
        onClick={() => onChange({ type: null })}
      >
        All types
      </button>
      {POKEMON_TYPES.map(t => (
        <button
          key={t}
          type="button"
          className={`${optionClass(type === t)} min-w-0 gap-1.5 overflow-hidden whitespace-nowrap px-2 text-xs`}
          aria-pressed={type === t}
          onClick={() => onChange({ type: type === t ? null : t })}
        >
          <span
            className="size-2 flex-none rounded-full"
            style={{ background: typeDot(t) }}
          />
          {capitalize(t)}
        </button>
      ))}
    </Section>
  </>
)

export default SidebarFilters
