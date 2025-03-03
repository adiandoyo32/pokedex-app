import { GET_POKEMON_BY_ID } from '@/graphql/queries/getPokemonById'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import MoveList from '@/components/pokemon-detail/MoveList'
import Stat from '@/components/pokemon-detail/Stat'

const PokemonDetail = () => {
  const params = useParams()

  const gqlVariables = { id: params.id }
  const {
    loading: isLoading,
    error: isError,
    data
  } = useQuery<Pokemon.PokemonDetail>(GET_POKEMON_BY_ID, {
    variables: gqlVariables
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error...</p>

  const sprites = data?.pokemon.sprites[0].sprites ?? ({} as any)
  const moves = data?.pokemon.moves ?? []
  const stats = data?.pokemon.stats ?? []

  return (
    <div>
      <div>
        {JSON.stringify(stats)}
        <img width={550} src={sprites.other.home.front_default} />
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
      {/* <MoveList moves={moves} /> */}
      <Stat stats={stats} />
    </div>
  )
}

export default PokemonDetail
