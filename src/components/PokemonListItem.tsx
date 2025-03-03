import { Link } from 'react-router-dom'
import PokemonType from './PokemonType'

const PokemonListItem = ({ id, name, pokemons }: Pokemon.Pokemon) => {
  const pokemonDetailPath = `/pokemon/${id}--${name}`

  const sprites = pokemons[0].sprites[0].sprites
  const types = pokemons[0].types ?? []

  const pokedexNumber = () => {
    if (!id) {
      return '#????'
    }
    return `#${id.toString().padStart(4, '0')}`
  }

  return (
    <Link
      to={pokemonDetailPath}
      className="group relative flex flex-col items-center justify-center rounded-lg bg-white p-5 pt-12 shadow-[rgba(149,_157,_165,_0.2)_0px_4px_20px]"
    >
      <div className="absolute left-1/2 top-[-4.2rem] flex size-24 -translate-x-1/2 items-end justify-center">
        <img
          className="object-contain duration-150 ease-in-out pixelated group-hover:scale-[1.15]"
          src={sprites}
          alt={name}
        />
      </div>
      <div className="text-xs">{pokedexNumber()}</div>
      <div className="text-base capitalize">{name}</div>
      <PokemonType types={types} />
    </Link>
  )
}

export default PokemonListItem
