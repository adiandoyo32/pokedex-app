const PokemonListtem = ({ id, name, image }: Pokemon.Pokemon) => {
  return (
    <div>
      <div>{id}</div>
      <p>{name}</p>
      <img src={image} alt={name} />
    </div>
  )
}

export default PokemonListtem
