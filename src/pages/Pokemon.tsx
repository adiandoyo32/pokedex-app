import { GET_POKEMONS } from '@/graphql/queries/getPokemons'
import { useQuery } from '@apollo/client'
import PokemonList from '@/components/PokemonList'
import type { Response } from '@/types/Response'
import type { Pokemon, QueryGetAllPokemonArgs } from '@favware/graphql-pokemon'

const Pokemon = () => {
  const gqlVariables: QueryGetAllPokemonArgs = { offset: 93, take: 20 }
  const {
    loading: isLoading,
    error: isError,
    data
  } = useQuery<Response.PokemonResponse<'getAllPokemon'>>(GET_POKEMONS, {
    variables: gqlVariables
  })

  const results = data?.getAllPokemon || []

  return (
    <div className="flex flex-wrap">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {results && <PokemonList data={data?.getAllPokemon} />}
    </div>
  )
}

export default Pokemon
