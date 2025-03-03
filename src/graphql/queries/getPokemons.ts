import { gql } from '@apollo/client'

// versions.generation-vii.ultra-sun-ultra-moon.front_default

const GET_POKEMONS = gql`
  query getAllPokemon($limit: Int, $generation: String, $name: String) {
    pokemons: pokemon_v2_pokemonspecies(
      where: {
        pokemon_v2_generation: { name: { _eq: $generation } }
        _or: { name: { _regex: $name } }
      }
      order_by: { id: asc }
      limit: 30
    ) {
      name
      id
      pokemons: pokemon_v2_pokemons {
        name
        sprites: pokemon_v2_pokemonsprites {
          sprites(path: "versions.generation-vi.x-y.front_default")
        }
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            name
          }
        }
      }
    }
  }
`

export { GET_POKEMONS }
