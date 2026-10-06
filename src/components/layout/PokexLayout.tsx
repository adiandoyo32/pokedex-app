import Sidebar from '@/components/Sidebar'
import Toolbar, { ListView } from '@/components/pokedex/Toolbar'
import usePokexTheme from '@/hooks/usePokexTheme'

type Props = {
  /** Grid/table toggle in the toolbar; omitted on pages without a list. */
  view?: ListView
  onViewChange?: (view: ListView) => void
  scrollRef?: React.Ref<HTMLDivElement>
  children: React.ReactNode
}

/** App shell: sidebar, toolbar and a scrolling, centered content column. */
const PokexLayout: React.FC<Props> = ({
  view,
  onViewChange,
  scrollRef,
  children
}) => {
  const { dark } = usePokexTheme()

  return (
    <div
      className="pkx flex h-screen bg-pkx-bg font-nunito text-pkx-ink transition-colors duration-300"
      data-theme={dark ? 'dark' : 'light'}
    >
      <Sidebar />
      <main className="relative flex min-w-0 flex-1 flex-col">
        <Toolbar view={view} onViewChange={onViewChange} />
        <div
          ref={scrollRef}
          className="min-h-0 flex-1 overflow-y-auto px-8 pb-12 pt-7 max-md:px-4 max-md:pb-10 max-md:pt-5"
        >
          {/* Centered column, as wide as three cards plus gaps */}
          <div className="mx-auto w-full max-w-[calc(var(--pkx-card-max)*3+40px)]">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

export default PokexLayout
