import { gql } from '@apollo/client'

// const GET_POKEMON_BY_NAME = gql`
//   query getPokemonByName($name: String!) {
//     pokemon(name: $name) {
//       message
//       id
//       name
//       weight
//       height
//       sprites {
//         back_default
//         front_default
//       }
//       types {
//         type {
//           name
//         }
//       }
//       moves {
//         move {
//           name
//         }
//       }
//       abilities {
//         ability {
//           name
//         }
//       }
//       stats {
//         stat {
//           name
//         }
//         base_stat
//       }
//       species {
//         id
//         name
//         url
//       }
//     }
//   }
// `

const GET_POKEMON_BY_NAME = gql`
  query ($pokemon: PokemonEnum!) {
    getPokemon(pokemon: $pokemon) {
      baseSpecies
      baseForme
      sprite
      num
      species
      color
    }
  }
`

export { GET_POKEMON_BY_NAME }
