import { useEffect, useState } from 'react'
import { DetailCard } from '@/components/detail/DetailCard'
import { typeBar } from '@/utils/pokex-theme'

const LABELS = ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed']
/** Bars are scaled against this value (a very high base stat). */
const STAT_CAP = 160

type Props = {
  stats: number[]
  /** Primary type — colors the bars. */
  type: string
}

const StatsCard: React.FC<Props> = ({ stats, type }) => {
  // Grow the bars in after mount (and again when the Pokémon changes).
  const [grown, setGrown] = useState(false)
  useEffect(() => {
    setGrown(false)
    const frame = requestAnimationFrame(() => setGrown(true))
    return () => cancelAnimationFrame(frame)
  }, [stats])

  const total = stats.reduce((a, b) => a + b, 0)

  return (
    <DetailCard
      title="Base stats"
      meta={
        <>
          Total <b className="font-black text-pkx-ink">{total}</b>
        </>
      }
    >
      {stats.map((value, i) => (
        <div
          key={LABELS[i] ?? i}
          className="grid grid-cols-[60px_30px_1fr] items-center gap-2.5"
        >
          <span className="text-[13px] font-bold text-pkx-ink2">
            {LABELS[i]}
          </span>
          <span className="text-right text-sm font-black">{value}</span>
          <div className="h-2 overflow-hidden rounded bg-pkx-track">
            <div
              className="h-full rounded transition-[width] duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none"
              style={{
                width: grown
                  ? `${Math.min(100, (value / STAT_CAP) * 100)}%`
                  : 0,
                background: typeBar(type),
                transitionDelay: `${i * 60}ms`
              }}
            />
          </div>
        </div>
      ))}
    </DetailCard>
  )
}

export default StatsCard
