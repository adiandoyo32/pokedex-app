import { gql } from '@apollo/client'

const GET_POKEMON_EVOLUTION = gql`
  query evolutionChain($id: String!) {
    evolutionChain(id: $id) {
      params
      status
      message
      response
    }
  }
`

export { GET_POKEMON_EVOLUTION }
