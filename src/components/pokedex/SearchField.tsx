import { CloseIcon, SearchIcon } from '@/components/icons'

type Props = {
  value: string
  onChange: (value: string) => void
}

const SearchField: React.FC<Props> = ({ value, onChange }) => (
  <label className="flex h-[46px] min-w-[220px] max-w-[400px] flex-1 items-center gap-2.5 rounded-pkx-btn border border-pkx-field bg-pkx-surface px-4 text-pkx-ink3 max-md:max-w-none max-md:basis-full">
    <SearchIcon />
    <input
      id="pokemon-search"
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Search by name or number"
      autoComplete="off"
      className="min-w-0 flex-1 bg-transparent text-[15px] font-semibold text-pkx-ink outline-none placeholder:text-pkx-ink3"
    />
    {value && (
      <button
        type="button"
        className="grid size-[22px] place-items-center rounded-full bg-pkx-track"
        aria-label="Clear"
        onClick={() => onChange('')}
      >
        <CloseIcon />
      </button>
    )}
  </label>
)

export default SearchField
