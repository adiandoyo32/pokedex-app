import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import FavoriteButton from '@/components/pokedex/FavoriteButton'
import { app } from '@/config'
import usePokexTheme from '@/hooks/usePokexTheme'
import usePrefetchDetail from '@/hooks/usePrefetchDetail'
import { setDetailTransition } from '@/utils/detail-transition'
import { capitalize, duoBackground, typeSolid } from '@/utils/pokex-theme'
import { pokemonDetailPath, pokemonTypes } from '@/utils/pokemon'

type Props = {
  pokemon: Pokemon.Pokemon
}

/** "Duo" card: the card is its type color, blended diagonally for dual types. */
const PokemonListItem: React.FC<Props> = ({ pokemon }) => {
  const navigate = useNavigate()
  const { dark } = usePokexTheme()
  const { id, name } = pokemon
  const types = pokemonTypes(pokemon)
  const prefetch = usePrefetchDetail()
  const artRef = useRef<HTMLDivElement>(null)

  const open = () => {
    // Hand the sprite's position to the detail page so it can fly it into the hero.
    const art = artRef.current
    if (art) {
      setDetailTransition({
        id,
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
      className="relative grid cursor-pointer grid-cols-[minmax(0,1fr)_104px] grid-rows-[auto_auto] items-center gap-x-2 rounded-xl pb-4 pl-[18px] pr-2 pt-2 shadow-pkx-duo outline-none transition-transform duration-[180ms] ease-in-out [overflow:clip] hover:translate-y-[-3px] focus-visible:translate-y-[-3px] focus-visible:shadow-[var(--pkx-duo-edge),0_0_0_2px_var(--pkx-ink)] motion-reduce:transition-none"
      style={{ background: duoBackground(types, dark) }}
      onClick={open}
      onKeyDown={e => e.key === 'Enter' && open()}
      onPointerEnter={() => prefetch(id)}
      onFocus={() => prefetch(id)}
    >
      <svg
        className="pointer-events-none absolute bottom-[-34px] right-[-34px] size-[150px] rotate-[18deg] text-white opacity-pkx-ball"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="45" />
        <path d="M5 50h31M64 50h31" />
        <circle cx="50" cy="50" r="14" />
      </svg>

      <div className="col-span-full flex h-9 items-center justify-between">
        <span className="text-xs font-extrabold tabular-nums leading-4 tracking-[0.02em] text-pkx-duo-ink2">
          #{String(id).padStart(4, '0')}
        </span>
        <FavoriteButton id={id} />
      </div>

      <div className="relative flex min-w-0 flex-col items-start gap-2.5 self-start">
        <span className="max-w-full text-[17px] font-black capitalize leading-[1.15] tracking-[-0.01em] text-pkx-duo-ink [overflow-wrap:anywhere]">
          {name}
        </span>
        <div className="flex flex-wrap gap-[5px]">
          {types.map(type => (
            <span
              key={type}
              className="inline-flex h-[22px] items-center rounded-[5px] px-2 text-[11px] font-extrabold text-white"
              style={{ background: typeSolid(type, dark) }}
            >
              {capitalize(type)}
            </span>
          ))}
        </div>
      </div>

      <div
        ref={artRef}
        className="pointer-events-none relative -mb-1 size-[88px] self-end justify-self-start"
      >
        <img
          className="absolute inset-0 size-full object-contain"
          src={app.sprite.official(id)}
          alt={name}
          loading="lazy"
        />
      </div>
    </div>
  )
}

export default PokemonListItem
