import PokemonListtem from '@/components/PokemonListItem'

type Props = {
  data?: Pokemon.PokemonList
}

const PokemonList: React.FC<Props> = ({ data }) => {
  const pokemonsList = data?.results || []

  return (
    <div>
      {pokemonsList.map((pokemon: Pokemon.Pokemon) => (
        <PokemonListtem key={pokemon.id} {...pokemon} />
      ))}
    </div>
  )
}

export default PokemonList
