import { DetailCard } from '@/components/detail/DetailCard'
import TypeChip from '@/components/pokedex/TypeChip'
import { titleCase } from '@/utils/pokemon'

const COLUMNS =
  'grid grid-cols-[44px_minmax(0,1fr)_110px_80px_60px_60px] items-center gap-2.5'

/** Level-up moves from the newest game that lists any, ordered by level. */
const latestLevelUpMoves = (moves: Pokemon.LevelUpMove[]) => {
  const latest = Math.max(...moves.map(m => m.versionGroup))
  const seen = new Set<string>()
  return moves
    .filter(m => m.versionGroup === latest)
    .filter(m => {
      const key = `${m.level}:${m.move.name}`
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .sort((a, b) => a.level - b.level)
}

type Props = {
  moves: Pokemon.LevelUpMove[]
  /** Flat layout (design 5d): shorter rows. */
  flat?: boolean
}

const MovesCard: React.FC<Props> = ({ moves, flat }) => {
  const list = moves.length ? latestLevelUpMoves(moves) : []

  return (
    <DetailCard
      title="Moves"
      meta={`Level-up · ${list.length}`}
      className="gap-1"
    >
      <div className="-mx-1 overflow-x-auto px-1">
        <div className="min-w-[560px]">
          <div
            className={`${COLUMNS} border-b border-pkx-line py-2.5 text-xs font-extrabold text-pkx-ink3`}
          >
            <span>Lv</span>
            <span>Move</span>
            <span>Type</span>
            <span>Category</span>
            <span className="text-right">Power</span>
            <span className="text-right">Acc.</span>
          </div>
          {list.map(({ level, move }) => (
            <div
              key={`${level}:${move.name}`}
              className={`${COLUMNS} ${flat ? 'h-[46px]' : 'h-[50px]'} border-b border-pkx-line last:border-b-0`}
            >
              <span className="text-sm font-extrabold text-pkx-ink3">
                {level === 0 ? 'Evo' : level}
              </span>
              <span className="truncate text-[15px] font-extrabold">
                {titleCase(move.name)}
              </span>
              <span className="justify-self-start">
                <TypeChip type={move.type.name} />
              </span>
              <span className="text-[13px] font-bold text-pkx-ink2">
                {titleCase(move.damageClass?.name ?? '—')}
              </span>
              <span className="text-right text-sm font-extrabold">
                {move.power ?? '—'}
              </span>
              <span className="text-right text-sm font-bold text-pkx-ink2">
                {move.accuracy ?? '—'}
              </span>
            </div>
          ))}
          {!list.length && (
            <div className="py-6 text-center text-sm font-bold text-pkx-ink3">
              No level-up moves for this form.
            </div>
          )}
        </div>
      </div>
    </DetailCard>
  )
}

export default MovesCard
