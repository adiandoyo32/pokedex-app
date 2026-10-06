import { useEffect, useState } from 'react'
import SearchField from '@/components/pokedex/SearchField'
import {
  FilterDropdown,
  MenuGrid,
  MenuOption,
  TypeDot
} from '@/components/pokedex/FilterDropdown'
import { CheckIcon } from '@/components/icons'
import {
  GENERATIONS,
  POKEMON_TYPES,
  SORTS,
  capitalize,
  typeDot
} from '@/utils/pokex-theme'

export type Filters = {
  q: string
  gen: number
  type: string | null
  sort: number
}

type Props = {
  filters: Filters
  onChange: (patch: Partial<Filters>) => void
  /** Shown when any filter (or the favorites view) is active. */
  onReset?: () => void
}

type Popover = 'gen' | 'type' | 'sort' | null

const FilterBar: React.FC<Props> = ({ filters, onChange, onReset }) => {
  const [pop, setPop] = useState<Popover>(null)
  const toggle = (p: Popover) => setPop(cur => (cur === p ? null : p))
  const pick = (patch: Partial<Filters>) => {
    onChange(patch)
    setPop(null)
  }

  useEffect(() => {
    if (!pop) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPop(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pop])

  const gen = GENERATIONS.find(g => g.id === filters.gen)

  return (
    <>
      {pop && (
        <div className="absolute inset-0 z-[8]" onClick={() => setPop(null)} />
      )}
      <div className="sticky -top-7 z-[9] -mx-8 flex flex-wrap items-center gap-2.5 bg-pkx-bg px-8 pb-3.5 pt-4 transition-colors duration-300 max-md:-top-5 max-md:-mx-4 max-md:px-4 max-md:py-3">
        <SearchField value={filters.q} onChange={q => onChange({ q })} />

        <FilterDropdown
          label="Generation"
          value={gen ? `${gen.roman} · ${gen.region}` : 'All'}
          open={pop === 'gen'}
          onToggle={() => toggle('gen')}
          width={456}
        >
          <MenuOption active={!filters.gen} onClick={() => pick({ gen: 0 })}>
            All generations
          </MenuOption>
          <MenuGrid>
            {GENERATIONS.map(g => (
              <MenuOption
                key={g.id}
                variant="stacked"
                active={filters.gen === g.id}
                onClick={() => pick({ gen: g.id })}
              >
                <span>Gen {g.roman}</span>
                <span className="text-[11px] font-bold">
                  {g.region} · {g.range}
                </span>
              </MenuOption>
            ))}
          </MenuGrid>
        </FilterDropdown>

        <FilterDropdown
          label="Type"
          value={
            <>
              {filters.type && <TypeDot color={typeDot(filters.type)} />}
              {filters.type ? capitalize(filters.type) : 'All'}
            </>
          }
          open={pop === 'type'}
          onToggle={() => toggle('type')}
          width={380}
        >
          <MenuOption
            active={!filters.type}
            onClick={() => pick({ type: null })}
          >
            All types
          </MenuOption>
          <MenuGrid>
            {POKEMON_TYPES.map(type => (
              <MenuOption
                key={type}
                active={filters.type === type}
                onClick={() =>
                  pick({ type: filters.type === type ? null : type })
                }
              >
                <TypeDot color={typeDot(type)} />
                {capitalize(type)}
              </MenuOption>
            ))}
          </MenuGrid>
        </FilterDropdown>

        <FilterDropdown
          label="Sort"
          value={SORTS[filters.sort].label}
          open={pop === 'sort'}
          onToggle={() => toggle('sort')}
          width={220}
          dense
        >
          {SORTS.map((s, i) => (
            <MenuOption
              key={s.label}
              variant="tall"
              active={filters.sort === i}
              onClick={() => pick({ sort: i })}
            >
              {s.label}
              <CheckIcon visible={filters.sort === i} />
            </MenuOption>
          ))}
        </FilterDropdown>

        <div className="flex-1" />
        {onReset && (
          <button
            type="button"
            className="h-[38px] rounded-full bg-pkx-surface2 px-3.5 text-[13px] font-extrabold"
            onClick={onReset}
          >
            Clear filters
          </button>
        )}
      </div>
    </>
  )
}

export default FilterBar
