import { useQuery } from '@apollo/client'
import { useLocation } from 'react-router-dom'
import SidebarNavItem from '@/components/sidebar/SidebarNavItem'
import {
  BagIcon,
  BoltIcon,
  ChartIcon,
  HeartIcon,
  PokeballIcon,
  SparkleIcon
} from '@/components/icons'
import useFavorites from '@/hooks/useFavorites'
import usePokexTheme from '@/hooks/usePokexTheme'
import { GET_POKEMON_COUNT } from '@/graphql/queries/getPokemons'

const exploreItems = [
  { label: 'Moves', icon: <BoltIcon /> },
  { label: 'Abilities', icon: <SparkleIcon /> },
  { label: 'Items', icon: <BagIcon /> },
  { label: 'Type chart', icon: <ChartIcon /> }
]

type Props = {
  /** Page-specific sidebar content (list filters), shown on wide screens. */
  children?: React.ReactNode
}

const Sidebar: React.FC<Props> = ({ children }) => {
  const location = useLocation()
  const { dark } = usePokexTheme()
  const { ids } = useFavorites()
  const { data } = useQuery<Pokemon.PokemonCount>(GET_POKEMON_COUNT)

  const onDex = location.pathname === '/'
  const favOnly =
    onDex && new URLSearchParams(location.search).get('view') === 'favorites'

  return (
    <aside
      className="pkx sticky top-0 flex h-screen w-60 flex-none flex-col gap-7 overflow-y-auto border-r border-pkx-line bg-pkx-surface px-3.5 py-6 font-nunito text-pkx-ink transition-colors duration-300 [scrollbar-width:none] max-md:hidden wide:w-[300px]"
      data-theme={dark ? 'dark' : 'light'}
      aria-label="Sidebar navigation"
    >
      <div className="flex items-center gap-2.5 px-2.5">
        <div className="grid size-9 place-items-center rounded-[11px] bg-pkx-ink text-pkx-bg">
          <PokeballIcon />
        </div>
        <span className="text-2xl font-black tracking-[-0.02em]">Pokex</span>
      </div>

      <nav className="flex flex-col gap-0.5">
        <SidebarNavItem
          to="/"
          icon={<PokeballIcon />}
          label="Pokédex"
          active={onDex && !favOnly}
          count={data?.total.aggregate.count}
        />
        <SidebarNavItem
          to="/?view=favorites"
          icon={<HeartIcon size={19} />}
          label="Favorites"
          active={favOnly}
          count={ids.length}
        />
      </nav>

      <div className="flex flex-col gap-0.5">
        <span className="px-3 pb-1.5 text-xs font-extrabold text-pkx-ink3">
          Explore
        </span>
        {exploreItems.map(item => (
          <SidebarNavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </div>

      {children && <div className="hidden wide:contents">{children}</div>}
    </aside>
  )
}

export default Sidebar
