import { GET_POKEMON_EVOLUTION } from '@/graphql/queries/getPokemonEvolution'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'

const PokemonEvolution = () => {
  const params = useParams()

  const gqlVariables = { id: params.id }
  const {
    loading: isLoading,
    error: isError,
    data
  } = useQuery(GET_POKEMON_EVOLUTION, {
    variables: gqlVariables
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error...</p>

  return (
    <div>
      <div>
        id: {params.id}
        {JSON.stringify(data)}
        <div className="flex flex-wrap">
          {/* <img width={250} src={data?.pokemon?.sprites.front_default} />
          <img width={250} src={app.sprite.dreamWorld(data?.pokemon.id)} />
          <img width={250} src={app.sprite.home(data?.pokemon.id)} />
          <img width={250} src={app.sprite.official(data?.pokemon.id)} />
          <img width={250} src={app.sprite.showdown(data?.pokemon.id)} />
          <img width={250} src={app.sprite.genV(data?.pokemon.id)} />
          <img width={250} src={app.sprite.genVAnimated(data?.pokemon.id)} /> */}
        </div>
      </div>
    </div>
  )
}

export default PokemonEvolution
