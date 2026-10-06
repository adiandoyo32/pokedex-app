import { GridIcon, ListIcon, MoonIcon, SunIcon } from '@/components/icons'
import usePokexTheme from '@/hooks/usePokexTheme'

export type ListView = 'grid' | 'table'

type Props = {
  /** Omit both to hide the grid/table toggle. */
  view?: ListView
  onViewChange?: (view: ListView) => void
}

const segmentClass = (active: boolean) =>
  `grid h-[38px] w-10 place-items-center rounded-[11px] ${
    active ? 'bg-pkx-ink text-pkx-bg' : 'text-pkx-ink2'
  }`

const Toolbar: React.FC<Props> = ({ view, onViewChange }) => {
  const { dark, toggleDark } = usePokexTheme()

  return (
    <div className="flex h-[76px] flex-none items-center justify-end gap-3 border-b border-pkx-line px-8 max-md:h-16 max-md:px-4">
      {view && (
        <div
          className="flex rounded-pkx-btn border border-pkx-field bg-pkx-surface p-[3px]"
          role="group"
          aria-label="Layout"
        >
          <button
            type="button"
            aria-label="Grid"
            aria-pressed={view === 'grid'}
            className={segmentClass(view === 'grid')}
            onClick={() => onViewChange?.('grid')}
          >
            <GridIcon />
          </button>
          <button
            type="button"
            aria-label="Table"
            aria-pressed={view === 'table'}
            className={segmentClass(view === 'table')}
            onClick={() => onViewChange?.('table')}
          >
            <ListIcon />
          </button>
        </div>
      )}
      <button
        type="button"
        className="grid size-[46px] place-items-center rounded-pkx-btn border border-pkx-field bg-pkx-surface"
        aria-label="Toggle dark mode"
        onClick={toggleDark}
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </button>
    </div>
  )
}

export default Toolbar
