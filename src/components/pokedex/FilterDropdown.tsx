import { ChevronDownIcon } from '@/components/icons'

type Props = {
  label: string
  value: React.ReactNode
  open: boolean
  onToggle: () => void
  /** Popover width in px. */
  width: number
  /** Tighter spacing for a plain list of options. */
  dense?: boolean
  children: React.ReactNode
}

/** Pill button with a label/value pair that opens a popover menu below it. */
const FilterDropdown: React.FC<Props> = ({
  label,
  value,
  open,
  onToggle,
  width,
  dense,
  children
}) => (
  <div className="relative">
    <button
      type="button"
      className="flex h-[46px] items-center gap-2 whitespace-nowrap rounded-pkx-btn border border-pkx-field bg-pkx-surface pl-3.5 pr-3 text-[13px] font-extrabold"
      aria-haspopup="true"
      aria-expanded={open}
      onClick={onToggle}
    >
      <span className="text-pkx-ink3">{label}</span>
      {value}
      <ChevronDownIcon />
    </button>
    {open && (
      <div
        className={`absolute left-0 top-[54px] flex max-w-[calc(100vw-32px)] animate-pkx-fade flex-col rounded-2xl border border-pkx-line bg-pkx-surface p-2 shadow-pkx-pop motion-reduce:animate-none ${
          dense ? 'gap-0.5' : 'gap-1.5'
        }`}
        style={{ width }}
      >
        {children}
      </div>
    )}
  </div>
)

type OptionProps = {
  active: boolean
  onClick: () => void
  /** Layout variant: single line, two stacked lines, or label + trailing icon. */
  variant?: 'line' | 'stacked' | 'tall'
  children: React.ReactNode
}

const variantClass = {
  line: 'h-9 items-center gap-2',
  stacked: 'h-[54px] flex-col items-start justify-center gap-px',
  tall: 'h-[38px] items-center justify-between gap-2'
}

const MenuOption: React.FC<OptionProps> = ({
  active,
  onClick,
  variant = 'line',
  children
}) => (
  <button
    type="button"
    className={`flex rounded-[10px] px-2.5 text-left text-[13px] transition-colors ${
      variantClass[variant]
    } ${
      active
        ? 'bg-pkx-surface2 font-black text-pkx-ink'
        : 'font-bold text-pkx-ink2 hover:bg-pkx-track'
    }`}
    aria-pressed={active}
    onClick={onClick}
  >
    {children}
  </button>
)

const MenuGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-3 gap-0.5">{children}</div>
)

const TypeDot = ({ color }: { color: string }) => (
  <span
    className="size-[9px] flex-none rounded-full"
    style={{ background: color }}
  />
)

export { FilterDropdown, MenuOption, MenuGrid, TypeDot }
