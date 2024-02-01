import { app } from '@/config'
import { GET_POKEMON_BY_NAME } from '@/graphql/queries/getPokemonByName'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { getDataViaApi } from '@/utils/http-api'

const PokemonDetail = () => {
  const params = useParams()

  const gqlVariables = { name: params.name }
  const {
    loading: isLoading,
    error: isError,
    data
  } = useQuery(GET_POKEMON_BY_NAME, {
    variables: gqlVariables,
    onCompleted: data => getPokemonSpecies(data.pokemon)
  })

  const getPokemonSpecies = async (pokemon: Pokemon.PokemonDetail) => {
    if (pokemon.species?.url) {
      getDataViaApi<Pokemon.PokemonSpecies>(pokemon.species?.url).then(res => {
        console.log('🚀 ~ getPokemonSpecies ~ res:', res.body)
      })
    }
  }

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error...</p>

  return (
    <div>
      <div>
        Name: {data.pokemon.name}
        link: {data.pokemon.species.url}
        <div className="flex flex-wrap">
          <img width={250} src={data?.pokemon?.sprites.front_default} />
          <img width={250} src={app.sprite.dreamWorld(data?.pokemon.id)} />
          <img width={250} src={app.sprite.home(data?.pokemon.id)} />
          <img width={250} src={app.sprite.official(data?.pokemon.id)} />
          <img width={250} src={app.sprite.showdown(data?.pokemon.id)} />
          <img width={250} src={app.sprite.genV(data?.pokemon.id)} />
          <img width={250} src={app.sprite.genVAnimated(data?.pokemon.id)} />
        </div>
      </div>
    </div>
  )
}

export default PokemonDetail
