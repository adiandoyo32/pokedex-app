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
    <div className="flex gap-1">
      {types.map(e => (
        <span
          style={{ backgroundColor: pokemonTypeColor(e.type.name) }}
          className="rounded p-1 text-xs font-medium capitalize text-slate-700"
          key={e.type.name}
        >
          {e.type.name}
        </span>
      ))}
    </div>
  )
}

export default PokemonType
