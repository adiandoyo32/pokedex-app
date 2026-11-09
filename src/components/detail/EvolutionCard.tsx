import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { DetailCard } from '@/components/detail/DetailCard'
import { ChevronRightIcon } from '@/components/icons'
import { pokemonDetailPath, spriteUrl, titleCase } from '@/utils/pokemon'

// PokeAPI type ids, used for "knows a <type> move" evolutions.
const TYPE_BY_ID = [
  '',
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy'
]

/** How a species evolves from its predecessor, e.g. "Lv. 16" or "Trade". */
const evolutionNote = (sp: Pokemon.ChainSpecies) => {
  if (!sp.evolvesFrom) return 'Base form'
  // Several methods can be listed (one per game); the last is the newest.
  const e = sp.evolutions[sp.evolutions.length - 1]
  if (!e) return 'Special'
  if (e.item) return titleCase(e.item.name)
  if (e.minLevel) return `Lv. ${e.minLevel}`
  if (e.knownMoveTypeId) {
    return `${titleCase(TYPE_BY_ID[e.knownMoveTypeId] ?? '')} move`
  }
  if (e.minHappiness || e.minAffection) {
    const base = e.minHappiness ? 'Friendship' : 'Affection'
    return e.timeOfDay ? `${base} · ${e.timeOfDay}` : base
  }
  if (e.location) return 'Special location'
  if (e.trigger?.name === 'trade') return 'Trade'
  return titleCase(e.trigger?.name ?? 'special')
}

/** Group the chain into stages by how many steps each is from the base. */
const toStages = (chain: Pokemon.ChainSpecies[]) => {
  const byId = new Map(chain.map(sp => [sp.id, sp]))
  const depth = (sp: Pokemon.ChainSpecies): number => {
    const parent = sp.evolvesFrom ? byId.get(sp.evolvesFrom) : undefined
    return parent ? depth(parent) + 1 : 0
  }
  const stages: Pokemon.ChainSpecies[][] = []
  chain.forEach(sp => {
    const d = depth(sp)
    ;(stages[d] ??= []).push(sp)
  })
  return stages.filter(Boolean)
}

type Props = {
  chain: Pokemon.ChainSpecies[]
  currentId: number
  /** Called before following a link to another species in the chain. */
  onSelect?: (id: number) => void
  /** Flat layout (design 5d): slightly smaller sprite circles. */
  flat?: boolean
}

const EvolutionCard: React.FC<Props> = ({
  chain,
  currentId,
  onSelect,
  flat
}) => {
  const stages = toStages(chain)
  // Wide branches (Eevee) stack stages vertically with a downward arrow.
  const branching = stages.some(stage => stage.length > 3)

  return (
    <DetailCard title="Evolution" className={flat ? 'gap-3.5' : ''}>
      <div
        className={`flex items-center justify-center gap-5 max-sm:gap-3 ${
          branching ? 'flex-col' : 'flex-wrap'
        }`}
      >
        {stages.map((stage, i) => (
          <Fragment key={stage[0].id}>
            {i > 0 && (
              <span
                className={`flex-none text-pkx-ink3 ${
                  branching ? 'rotate-90' : 'mb-10'
                }`}
              >
                <ChevronRightIcon size={20} />
              </span>
            )}
            <div className="flex flex-wrap justify-center gap-3.5">
              {stage.map(sp => {
                const current = sp.id === currentId
                return (
                  <Link
                    key={sp.id}
                    to={pokemonDetailPath(sp)}
                    className="flex w-[110px] flex-col items-center gap-0.5 max-sm:w-24"
                    aria-current={current ? 'page' : undefined}
                    onClick={() => !current && onSelect?.(sp.id)}
                  >
                    <div
                      className={`${flat ? 'size-[88px]' : 'size-24'} rounded-full bg-pkx-surface2 transition-shadow duration-300 max-sm:size-20 ${
                        current
                          ? 'shadow-[0_0_0_2px_var(--pkx-surface),0_0_0_4px_var(--pkx-ink)]'
                          : ''
                      }`}
                    >
                      <img
                        src={spriteUrl(sp.id, 'front')}
                        alt={titleCase(sp.name)}
                        loading="lazy"
                        className="size-full object-contain pixelated"
                      />
                    </div>
                    <span
                      className={`mt-2 text-center text-sm ${current ? 'font-black' : 'font-bold'}`}
                    >
                      {titleCase(sp.name)}
                    </span>
                    <span className="text-center text-xs font-bold text-pkx-ink3">
                      {evolutionNote(sp)}
                    </span>
                  </Link>
                )
              })}
            </div>
          </Fragment>
        ))}
      </div>
    </DetailCard>
  )
}

export default EvolutionCard
