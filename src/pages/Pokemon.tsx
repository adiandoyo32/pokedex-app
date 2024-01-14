import { GET_POKEMON_LIST } from '@/graphql/queries/getPokemonList'
import { useQuery } from '@apollo/client'
import PokemonList from '@/components/PokemonList'

const Pokemon = () => {
  const gqlVariables = { limit: 12, offset: 0 }
  const {
    loading: isLoading,
    error: isError,
    data
  } = useQuery(GET_POKEMON_LIST, {
    variables: gqlVariables
  })

  const results = data?.pokemons || []

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {results && <PokemonList data={results} />}
    </div>
  )
}

export default Pokemon
