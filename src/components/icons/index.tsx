type IconProps = { size?: number; className?: string }

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const
}

const PokeballIcon = ({ size = 19 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="2"
    {...stroke}
  >
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.5 12h5.5M15 12h5.5" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const HeartIcon = ({
  size = 17,
  filled = false
}: IconProps & { filled?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? '#e5484d' : 'none'}
    stroke={filled ? '#e5484d' : 'currentColor'}
    strokeWidth="2.2"
    strokeLinejoin="round"
  >
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20z" />
  </svg>
)

const BoltIcon = ({ size = 19 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="2"
    {...stroke}
  >
    <path d="M13 3L5 13.5h6L10 21l8-10.5h-6z" />
  </svg>
)

const SparkleIcon = ({ size = 19 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="2"
    {...stroke}
  >
    <path d="M12 3.5l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2z" />
  </svg>
)

const BagIcon = ({ size = 19 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="2"
    {...stroke}
  >
    <path d="M5 8h14l-1 12H6z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </svg>
)

const ChartIcon = ({ size = 19 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="2"
    {...stroke}
  >
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <path d="M9.3 4v16M14.7 4v16M4 9.3h16M4 14.7h16" />
  </svg>
)

const GridIcon = ({ size = 17 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
  </svg>
)

const ListIcon = ({ size = 17 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="2.2"
    {...stroke}
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const MoonIcon = ({ size = 18 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="2"
    {...stroke}
  >
    <path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5z" />
  </svg>
)

const SunIcon = ({ size = 18 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="2"
    {...stroke}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
  </svg>
)

const SearchIcon = ({ size = 18 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="2.2"
    {...stroke}
  >
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4-4" />
  </svg>
)

const CloseIcon = ({ size = 10 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="3"
    {...stroke}
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)

const ChevronDownIcon = ({ size = 14 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="2.6"
    {...stroke}
    style={{ opacity: 0.6 }}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
)

const CheckIcon = ({
  size = 15,
  visible = true
}: IconProps & { visible?: boolean }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="2.6"
    {...stroke}
    style={{ opacity: visible ? 1 : 0 }}
  >
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
)

const ChevronLeftIcon = ({ size = 18 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="2.4"
    {...stroke}
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ChevronRightIcon = ({ size = 18 }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    strokeWidth="2.4"
    {...stroke}
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
)

const ShinyIcon = ({ size = 15 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.5l2.1 6.4 6.4 2.1-6.4 2.1L12 19.5l-2.1-6.4L3.5 11l6.4-2.1z" />
  </svg>
)

export {
  ChevronLeftIcon,
  ChevronRightIcon,
  ShinyIcon,
  PokeballIcon,
  HeartIcon,
  BoltIcon,
  SparkleIcon,
  BagIcon,
  ChartIcon,
  GridIcon,
  ListIcon,
  MoonIcon,
  SunIcon,
  SearchIcon,
  CloseIcon,
  ChevronDownIcon,
  CheckIcon
}
