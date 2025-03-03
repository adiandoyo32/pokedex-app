import { gql } from '@apollo/client'

const GET_POKEMON_BY_ID = gql`
  query getPokemonById($id: Int!) {
    pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      types: pokemon_v2_pokemontypes {
        type: pokemon_v2_type {
          name
        }
      }
      moves: pokemon_v2_pokemonmoves {
        move: pokemon_v2_move {
          name
        }
      }
      sprites: pokemon_v2_pokemonsprites {
        sprites
      }
      stats: pokemon_v2_pokemonstats {
        base_stat
        stat: pokemon_v2_stat {
          name
        }
      }
      abilities: pokemon_v2_pokemonabilities {
        ability: pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies {
            name
          }
        }
      }
    }
  }
`

export { GET_POKEMON_BY_ID }
