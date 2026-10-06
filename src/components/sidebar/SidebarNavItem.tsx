import { Link } from 'react-router-dom'

type Props = {
  icon: React.ReactNode
  label: string
  /** Route to navigate to. Omit for an item that is not available yet. */
  to?: string
  active?: boolean
  count?: number
}

const itemClass =
  'flex h-[42px] items-center gap-3 rounded-xl px-3 text-sm transition-colors'

const SidebarNavItem: React.FC<Props> = ({
  icon,
  label,
  to,
  active,
  count
}) => {
  if (!to) {
    return (
      <div
        className={`${itemClass} font-bold text-pkx-ink2`}
        aria-disabled="true"
      >
        {icon}
        <span className="flex-1 text-left">{label}</span>
        <span className="rounded-md bg-pkx-surface2 px-[7px] py-0.5 text-[11px] font-extrabold text-pkx-ink3">
          Soon
        </span>
      </div>
    )
  }

  return (
    <Link
      to={to}
      className={`${itemClass} ${
        active
          ? 'bg-pkx-surface2 font-black text-pkx-ink'
          : 'font-bold text-pkx-ink2 hover:bg-pkx-surface2'
      }`}
      aria-current={active ? 'page' : undefined}
    >
      {icon}
      <span className="flex-1 text-left">{label}</span>
      {count !== undefined && (
        <span className="text-xs font-extrabold text-pkx-ink3">{count}</span>
      )}
    </Link>
  )
}

export default SidebarNavItem
