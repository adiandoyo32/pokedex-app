import { Link } from 'react-router-dom'
import PokemonType from './PokemonType'
import { app } from '@/config'

const PokemonListItem = ({ id, name, pokemons }: Pokemon.Pokemon) => {
  const pokemonDetailPath = `/pokemon/${id}--${name}`
  const types = pokemons[0].types ?? []

  const pokedexNumber = () => {
    if (!id) return '#????'
    return `#${id.toString().padStart(3, '0')}`
  }

  const primaryType = types[0]?.type?.name ?? 'normal'
  const bgColor =
    app.pokemonTypeColor[primaryType as keyof typeof app.pokemonTypeColor] ??
    '#A8A77A'

  return (
    <Link to={pokemonDetailPath} className="pokemon-card group">
      <div
        className="pokemon-card-image-wrapper"
        style={{ '--type-color': bgColor } as React.CSSProperties}
      >
        <div className="pokemon-card-bg-circle" />
        <img
          className="pokemon-card-image"
          src={app.sprite.official(id)}
          alt={name}
          loading="lazy"
          onError={e => {
            const target = e.target as HTMLImageElement
            target.src = pokemons[0]?.sprites[0]?.sprites ?? ''
          }}
        />
      </div>
      <div className="pokemon-card-body">
        <span className="pokemon-card-number">{pokedexNumber()}</span>
        <h3 className="pokemon-card-name">{name}</h3>
        <PokemonType types={types} />
      </div>
    </Link>
  )
}

export default PokemonListItem
