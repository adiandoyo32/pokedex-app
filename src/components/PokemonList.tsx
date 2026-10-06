import PokemonListItem from '@/components/PokemonListItem'
import { memo } from 'react'

type Props = {
  data: Pokemon.Pokemon[]
  /** Number of skeleton cards to append while a page is loading. */
  skeletons?: number
}

// Phone: fluid columns. Tablet: 2, desktop: 3 — each capped at --pkx-card-max.
const gridClass =
  'grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3.5 pt-2 md:grid-cols-[repeat(2,minmax(0,var(--pkx-card-max)))] md:gap-5 min-[1101px]:grid-cols-[repeat(3,minmax(0,var(--pkx-card-max)))]'

const PokemonList: React.FC<Props> = ({ data, skeletons = 0 }) => {
  return (
    <div className={gridClass}>
      {data.map(pokemon => (
        <PokemonListItem pokemon={pokemon} key={pokemon.id} />
      ))}
      {Array.from({ length: skeletons }, (_, i) => (
        <div
          key={`skeleton-${i}`}
          className="h-[150px] animate-pkx-pulse rounded-xl bg-pkx-surface2 motion-reduce:animate-none"
          style={{ animationDelay: `${(i % 3) * 0.1}s` }}
        />
      ))}
    </div>
  )
}

export default memo(PokemonList)
