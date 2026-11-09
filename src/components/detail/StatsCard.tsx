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
  /** Flat layout (design 5d): thinner bars, tighter rows. */
  flat?: boolean
}

const StatsCard: React.FC<Props> = ({ stats, type, flat }) => {
  // Grow the bars in after mount (and again when the Pokémon changes).
  const [grown, setGrown] = useState(false)
  useEffect(() => {
    setGrown(false)
    const frame = requestAnimationFrame(() => setGrown(true))
    return () => cancelAnimationFrame(frame)
  }, [stats])

  const total = stats.reduce((a, b) => a + b, 0)

  const rows = stats.map((value, i) => (
    <div
      key={LABELS[i] ?? i}
      className={`grid items-center gap-2.5 ${
        flat ? 'grid-cols-[64px_32px_1fr]' : 'grid-cols-[60px_30px_1fr]'
      }`}
    >
      <span className="text-[13px] font-bold text-pkx-ink2">{LABELS[i]}</span>
      <span className="text-right text-sm font-black tabular-nums">
        {value}
      </span>
      <div
        className={`overflow-hidden bg-pkx-track ${
          flat ? 'h-1.5 rounded-[3px]' : 'h-2 rounded'
        }`}
      >
        <div
          className={`h-full transition-[width] duration-[900ms] ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transition-none ${
            flat ? 'rounded-[3px]' : 'rounded'
          }`}
          style={{
            width: grown ? `${Math.min(100, (value / STAT_CAP) * 100)}%` : 0,
            background: typeBar(type),
            transitionDelay: `${i * 60}ms`
          }}
        />
      </div>
    </div>
  ))

  return (
    <DetailCard
      title="Base stats"
      className={flat ? 'gap-3.5' : ''}
      meta={
        <>
          Total <b className="font-black text-pkx-ink">{total}</b>
        </>
      }
    >
      {flat ? <div className="flex flex-col gap-2.5">{rows}</div> : rows}
    </DetailCard>
  )
}

export default StatsCard
