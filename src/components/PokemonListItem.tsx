import { Link } from 'react-router-dom'

const PokemonListtem = ({ id, name, image }: Pokemon.Pokemon) => {
  const pokemonDetailPath = `/pokemon/${id}--${name}`

  return (
    <Link to={pokemonDetailPath} className="flex flex-col border-2 p-2">
      <div className="text-3xl">{id}</div>
      <p className="text-red-400">{name}</p>
      <img src={image} alt={name} />
    </Link>
  )
}

export default PokemonListtem
