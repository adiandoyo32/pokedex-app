import { Link } from 'react-router-dom'

const PokemonListItem = ({ species, sprite }: any) => {
  const pokemonDetailPath = `/pokemon/${species}--${species}`

  return (
    <Link to={pokemonDetailPath} className="flex flex-col border-2 p-2">
      <div className="text-3xl">{species}</div>
      <p className="text-red-400">{species}</p>
      <img src={sprite} alt={species} />
    </Link>
  )
}

export default PokemonListItem
