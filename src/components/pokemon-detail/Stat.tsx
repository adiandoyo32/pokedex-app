import React from 'react'

type Props = {
  stats: Pokemon.Stat[]
}

const Stat: React.FC<Props> = ({ stats }) => {
  return (
    <>
      {stats.map((stat, index) => {
        return (
          <div key={index}>
            {stat.base_stat} - {stat.stat.name}
          </div>
        )
      })}
    </>
  )
}

export default Stat
