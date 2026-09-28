import { app } from '@/config'
import React from 'react'

type Props = {
  types: Pokemon.Types[]
}

const PokemonType: React.FC<Props> = ({ types }) => {
  const pokemonTypeColor = (type: string) => {
    return app.pokemonTypeColor[type as keyof typeof app.pokemonTypeColor]
  }

  return (
    <div className="type-badges">
      {types.map(e => (
        <span
          key={e.type.name}
          className="type-badge"
          style={
            {
              '--badge-color': pokemonTypeColor(e.type.name)
            } as React.CSSProperties
          }
        >
          {e.type.name}
        </span>
      ))}
    </div>
  )
}

export default PokemonType
