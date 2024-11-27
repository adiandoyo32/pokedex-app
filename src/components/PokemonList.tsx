import PokemonListItem from '@/components/PokemonListItem'
import { Pokemon } from '@favware/graphql-pokemon'

type Props = {
  data?: readonly Pokemon[]
}

const PokemonList: React.FC<Props> = ({ data }) => {
  const pokemonsList = data || []

  return (
    <>
      {pokemonsList.map((pokemon: any) => (
        <PokemonListItem key={pokemon.species} {...pokemon} />
      ))}
    </>
  )
}

export default PokemonList
