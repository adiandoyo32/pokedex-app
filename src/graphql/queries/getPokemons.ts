import { gql } from '@apollo/client'

const GET_POKEMONS = gql`
  query getAllPokemon(
    $where: pokemon_v2_pokemonspecies_bool_exp
    $orderBy: [pokemon_v2_pokemonspecies_order_by!]
    $limit: Int
    $offset: Int
  ) {
    filtered: pokemon_v2_pokemonspecies_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    pokemons: pokemon_v2_pokemonspecies(
      where: $where
      order_by: $orderBy
      limit: $limit
      offset: $offset
    ) {
      name
      id
      pokemons: pokemon_v2_pokemons(where: { is_default: { _eq: true } }) {
        types: pokemon_v2_pokemontypes(order_by: { slot: asc }) {
          type: pokemon_v2_type {
            name
          }
        }
        stats: pokemon_v2_pokemonstats(order_by: { stat_id: asc }) {
          base_stat
        }
      }
    }
  }
`

const GET_POKEMON_COUNT = gql`
  query getPokemonCount {
    total: pokemon_v2_pokemonspecies_aggregate {
      aggregate {
        count
      }
    }
  }
`

export { GET_POKEMONS, GET_POKEMON_COUNT }
