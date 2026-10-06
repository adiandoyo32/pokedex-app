import { capitalize, typePill } from '@/utils/pokex-theme'

type Props = {
  type: string
  size?: 'sm' | 'md' | 'lg'
  /** Damage multiplier badge, e.g. `×2`. */
  mult?: string
}

const sizeClass = {
  sm: 'h-6 px-[9px] text-xs',
  md: 'h-7 pl-2.5 pr-[5px] text-xs',
  lg: 'h-[30px] px-[13px] text-sm'
}

/** Solid pastel type pill used in the table, detail hero, moves and defenses. */
const TypeChip: React.FC<Props> = ({ type, size = 'sm', mult }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-pkx-pill font-extrabold ${sizeClass[size]}`}
    style={typePill(type)}
  >
    {capitalize(type)}
    {mult && (
      <span className="rounded-[5px] bg-white/45 px-[5px] text-[11px] font-black leading-[18px]">
        {mult}
      </span>
    )}
  </span>
)

export default TypeChip
