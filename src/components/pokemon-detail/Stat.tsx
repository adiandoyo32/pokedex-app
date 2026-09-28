import React from 'react'

type Props = {
  stats: Pokemon.Stat[]
  typeColor?: string
}

const STAT_LABELS: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  speed: 'SPD'
}

const MAX_STAT = 255

const Stat: React.FC<Props> = ({ stats, typeColor = '#ef4444' }) => {
  return (
    <div className="stats-grid">
      {stats.map((stat, index) => {
        const label = STAT_LABELS[stat.stat.name] ?? stat.stat.name
        const pct = Math.round((stat.base_stat / MAX_STAT) * 100)
        const isHigh = stat.base_stat >= 100
        const isMid = stat.base_stat >= 60

        return (
          <div key={index} className="stat-row">
            <span className="stat-label">{label}</span>
            <span className="stat-value" style={{ color: isHigh ? typeColor : undefined }}>
              {stat.base_stat}
            </span>
            <div className="stat-bar-track">
              <div
                className="stat-bar-fill"
                style={{
                  '--target-width': `${pct}%`,
                  background: typeColor,
                  animationDelay: `${index * 80}ms`
                } as React.CSSProperties}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Stat
