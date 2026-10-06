import { Link } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons'
import { pokemonDetailPath, titleCase } from '@/utils/pokemon'

type Props = {
  onBack: () => void
  /** Called before following a prev/next link (to queue its animation). */
  onStep?: (direction: -1 | 1) => void
  prev?: Pokemon.SpeciesRef
  next?: Pokemon.SpeciesRef
}

const pillClass =
  'flex h-10 items-center gap-2 rounded-full border border-pkx-card bg-pkx-surface text-sm font-extrabold shadow-pkx-card transition-transform active:scale-[0.97]'

const DetailNav: React.FC<Props> = ({ onBack, onStep, prev, next }) => (
  <div className="mb-5 flex items-center justify-between gap-2">
    <button
      type="button"
      className={`${pillClass} gap-1.5 pl-2 pr-3.5`}
      onClick={onBack}
    >
      <ChevronLeftIcon />
      All Pokémon
    </button>
    <div className="flex gap-2">
      {prev && (
        <Link
          to={pokemonDetailPath(prev)}
          className={`${pillClass} pl-2 pr-3.5`}
          aria-label={`Previous: ${titleCase(prev.name)}`}
          onClick={() => onStep?.(-1)}
        >
          <ChevronLeftIcon />
          <span className="text-pkx-ink3">N° {prev.id}</span>
          <span className="max-sm:hidden">{titleCase(prev.name)}</span>
        </Link>
      )}
      {next && (
        <Link
          to={pokemonDetailPath(next)}
          className={`${pillClass} pl-3.5 pr-2`}
          aria-label={`Next: ${titleCase(next.name)}`}
          onClick={() => onStep?.(1)}
        >
          <span className="max-sm:hidden">{titleCase(next.name)}</span>
          <span className="text-pkx-ink3">N° {next.id}</span>
          <ChevronRightIcon />
        </Link>
      )}
    </div>
  </div>
)

export default DetailNav
