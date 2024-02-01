import { GET_POKEMONS } from '@/graphql/queries/getPokemons'
import { useQuery } from '@apollo/client'
import PokemonList from '@/components/PokemonList'

const Pokemon = () => {
  const gqlVariables = { limit: 12, offset: 0 }
  const {
    loading: isLoading,
    error: isError,
    data
  } = useQuery(GET_POKEMONS, {
    variables: gqlVariables
  })

  const results = data?.pokemons || []

  return (
    <div className="flex flex-wrap">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {results && <PokemonList data={results} />}
    </div>
  )
}

export default Pokemon
