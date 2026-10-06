import { memo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import FavoriteButton from '@/components/pokedex/FavoriteButton'
import { app } from '@/config'
import usePokexTheme from '@/hooks/usePokexTheme'
import usePrefetchDetail from '@/hooks/usePrefetchDetail'
import { setDetailTransition } from '@/utils/detail-transition'
import TypeChip from '@/components/pokedex/TypeChip'
import { typeTint } from '@/utils/pokex-theme'
import { pokemonDetailPath, pokemonStats, pokemonTypes } from '@/utils/pokemon'

const STAT_COLUMNS = ['HP', 'Atk', 'Def', 'SpA', 'SpD', 'Spe']

// Shared by the header and every row so the columns line up.
const rowClass =
  'grid grid-cols-[64px_64px_minmax(0,1.2fr)_minmax(0,1.3fr)_repeat(7,52px)_44px] items-center gap-2 border-b border-pkx-line px-4'

const PokemonTableRow = ({ pokemon }: { pokemon: Pokemon.Pokemon }) => {
  const navigate = useNavigate()
  const { dark } = usePokexTheme()
  const types = pokemonTypes(pokemon)
  const stats = pokemonStats(pokemon)
  const prefetch = usePrefetchDetail()
  const artRef = useRef<HTMLDivElement>(null)

  const open = () => {
    const art = artRef.current
    if (art) {
      setDetailTransition({
        id: pokemon.id,
        kind: 'open',
        from: art.getBoundingClientRect()
      })
    }
    navigate(pokemonDetailPath(pokemon))
  }

  return (
    <div
      role="link"
      tabIndex={0}
      className={`${rowClass} h-[72px] cursor-pointer outline-none transition-colors hover:bg-[rgba(127,127,127,0.06)] focus-visible:bg-[rgba(127,127,127,0.06)]`}
      onClick={open}
      onKeyDown={e => e.key === 'Enter' && open()}
      onPointerEnter={() => prefetch(pokemon.id)}
      onFocus={() => prefetch(pokemon.id)}
    >
      <div
        ref={artRef}
        className="size-[60px] rounded-pkx-btn"
        style={{ background: typeTint(types[0] ?? 'normal', dark) }}
      >
        <img
          className="size-full object-contain"
          src={app.sprite.official(pokemon.id)}
          alt={pokemon.name}
          loading="lazy"
        />
      </div>
      <span className="text-[13px] font-extrabold text-pkx-ink3">
        N° {pokemon.id}
      </span>
      <span className="truncate text-base font-black capitalize">
        {pokemon.name}
      </span>
      <div className="flex gap-1.5">
        {types.map(type => (
          <TypeChip key={type} type={type} />
        ))}
      </div>
      <span className="text-right text-sm font-black">
        {stats.reduce((a, b) => a + b, 0)}
      </span>
      {STAT_COLUMNS.map((col, i) => (
        <span key={col} className="text-right text-sm font-bold text-pkx-ink2">
          {stats[i] ?? '—'}
        </span>
      ))}
      <FavoriteButton id={pokemon.id} variant="row" />
    </div>
  )
}

type Props = {
  data: Pokemon.Pokemon[]
  loading?: boolean
}

const PokemonTable: React.FC<Props> = ({ data, loading }) => (
  <div className="mt-[18px] overflow-x-auto rounded-pkx-card border border-pkx-card bg-pkx-surface shadow-pkx-card">
    <div className="min-w-[880px]">
      <div className={`${rowClass} h-11 text-xs font-extrabold text-pkx-ink3`}>
        <span />
        <span>No.</span>
        <span>Name</span>
        <span>Type</span>
        <span className="text-right">Total</span>
        {STAT_COLUMNS.map(col => (
          <span key={col} className="text-right">
            {col}
          </span>
        ))}
        <span />
      </div>
      {data.map(pokemon => (
        <PokemonTableRow key={pokemon.id} pokemon={pokemon} />
      ))}
      {loading && (
        <div className="h-[72px] animate-pkx-pulse bg-pkx-surface2 motion-reduce:animate-none" />
      )}
    </div>
  </div>
)

export default memo(PokemonTable)
