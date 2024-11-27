import { gql } from '@apollo/client'

const GET_POKEMONS = gql`
  query GetAllPokemon($offset: Int, $take: Int) {
    getAllPokemon(offset: $offset, take: $take) {
      sprite
      species
    }
  }
`

export { GET_POKEMONS }
