import { HeartIcon } from '@/components/icons'
import useFavorites from '@/hooks/useFavorites'

type Props = {
  id: number
  /** `card` sits on a Duo card; `row` is the muted table variant. */
  variant?: 'card' | 'row'
}

const FavoriteButton: React.FC<Props> = ({ id, variant = 'card' }) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const on = isFavorite(id)

  return (
    <button
      type="button"
      className={`relative grid flex-none place-items-center transition-transform active:scale-[0.88] ${
        variant === 'card' ? 'size-9 text-pkx-duo-ink' : 'size-10 text-pkx-ink3'
      }`}
      aria-label={on ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={on}
      onClick={e => {
        // Cards and rows are clickable; keep the click from opening detail.
        e.stopPropagation()
        toggleFavorite(id)
      }}
    >
      <HeartIcon filled={on} />
    </button>
  )
}

export default FavoriteButton
