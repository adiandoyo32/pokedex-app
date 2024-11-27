import { GET_POKEMON_BY_NAME } from '@/graphql/queries/getPokemonByName'
import { useQuery } from '@apollo/client'
// import ApolloClient from '@apollo/client'
// import { getDataViaApi } from '@/utils/http-api'
import type { Query } from '@favware/graphql-pokemon'

type GraphQLPokemonResponse<K extends keyof Omit<Query, '__typename'>> = Record<
  K,
  Query[K]
>

const PokemonDetail = () => {
  const gqlVariables = { pokemon: 'dragonite' }
  const {
    loading: isLoading,
    error: isError,
    data
  } = useQuery<GraphQLPokemonResponse<'getPokemon'>>(GET_POKEMON_BY_NAME, {
    variables: gqlVariables
  })

  // const {
  //   data: { GET_POKEMON_BY_NAME: pokemonData }
  // } = await ApolloClient.query({
  //   query: GET_POKEMON_BY_NAME,
  //   variables: { pokemon: 'dragonite' }
  // });

  // const getPokemonSpecies = async (pokemon: Pokemon.PokemonDetail) => {
  //   if (pokemon.species?.url) {
  //     getDataViaApi<Pokemon.PokemonSpecies>(pokemon.species?.url).then(res => {
  //       console.log('🚀 ~ getPokemonSpecies ~ res:', res.body)
  //     })
  //   }
  // }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error...</p>

  return (
    <div>
      <div>
        {JSON.stringify(data?.getPokemon.species)}
        <img width={550} src={data?.getPokemon.sprite} />
        {/* Name: {data.pokemon.name}
        link: {data.pokemon.species.url}
        <div className="flex flex-wrap">
          <img width={250} src={data?.pokemon?.sprites.front_default} />
          <img width={250} src={app.sprite.dreamWorld(data?.pokemon.id)} />
          <img width={250} src={app.sprite.home(data?.pokemon.id)} />
          <img width={250} src={app.sprite.official(data?.pokemon.id)} />
          <img width={250} src={app.sprite.showdown(data?.pokemon.id)} />
          <img width={250} src={app.sprite.genV(data?.pokemon.id)} />
          <img width={250} src={app.sprite.genVAnimated(data?.pokemon.id)} />
        </div> */}
      </div>
    </div>
  )
}

export default PokemonDetail
