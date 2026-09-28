import PokemonListItem from '@/components/PokemonListItem'
import { memo } from 'react'

type Props = {
  data: Pokemon.Pokemon[]
}

const PokemonList: React.FC<Props> = ({ data }) => {
  return (
    <div className="pokemon-grid">
      {data.map(pokemon => (
        <PokemonListItem {...pokemon} key={pokemon.id} />
      ))}
    </div>
  )
}

export default memo(PokemonList)
