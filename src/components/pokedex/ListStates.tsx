type StateProps = {
  title: string
  text: string
  action: string
  onAction: () => void
}

const ListState = ({ title, text, action, onAction }: StateProps) => (
  <div className="flex flex-col items-center gap-2 px-5 py-[120px] text-center">
    <div className="text-[22px] font-black">{title}</div>
    <div className="text-[15px] font-semibold text-pkx-ink2">{text}</div>
    <button
      type="button"
      className="mt-3 h-11 rounded-full bg-pkx-ink px-[22px] text-sm font-extrabold text-pkx-bg"
      onClick={onAction}
    >
      {action}
    </button>
  </div>
)

const EmptyState = ({ onReset }: { onReset: () => void }) => (
  <ListState
    title="No Pokémon found"
    text="Try another name, or clear filters to see the full list."
    action="Clear filters"
    onAction={onReset}
  />
)

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <ListState
    title="Couldn’t load Pokémon"
    text="Check your connection and try again."
    action="Retry"
    onAction={onRetry}
  />
)

const EndOfList = ({ count }: { count: number }) => (
  <div className="pt-9 text-center text-sm font-bold text-pkx-ink3">
    You&apos;ve reached the end · {count} shown
  </div>
)

export { ListState, EmptyState, ErrorState, EndOfList }
