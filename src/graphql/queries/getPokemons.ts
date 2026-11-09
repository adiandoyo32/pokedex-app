import { gql } from '@apollo/client'

const GET_POKEMONS = gql`
  query getAllPokemon(
    $where: pokemonspecies_bool_exp
    $orderBy: [pokemonspecies_order_by!]
    $limit: Int
    $offset: Int
  ) {
    filtered: pokemonspecies_aggregate(where: $where) {
      aggregate {
        count
      }
    }
    pokemons: pokemonspecies(
      where: $where
      order_by: $orderBy
      limit: $limit
      offset: $offset
    ) {
      name
      id
      pokemons: pokemons(where: { is_default: { _eq: true } }) {
        types: pokemontypes(order_by: { slot: asc }) {
          type: type {
            name
          }
        }
        stats: pokemonstats(order_by: { stat_id: asc }) {
          base_stat
        }
      }
    }
  }
`

const GET_POKEMON_COUNT = gql`
  query getPokemonCount {
    total: pokemonspecies_aggregate {
      aggregate {
        count
      }
    }
  }
`

export { GET_POKEMONS, GET_POKEMON_COUNT }
