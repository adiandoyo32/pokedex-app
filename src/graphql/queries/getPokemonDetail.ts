import { gql } from '@apollo/client'

// Species-level detail: every form (Mega, Gigantamax, regional…) comes back
// in `forms`, with the default one flagged `is_default`. v1beta2 has no
// `_by_pk` root for species, so `species` is a one-item list.
const GET_POKEMON_DETAIL = gql`
  query getPokemonDetail($id: Int!) {
    species: pokemonspecies(where: { id: { _eq: $id } }, limit: 1) {
      id
      name
      captureRate: capture_rate
      genderRate: gender_rate
      generationId: generation_id
      names: pokemonspeciesnames(where: { language_id: { _eq: 9 } }) {
        name
        genus
      }
      flavor: pokemonspeciesflavortexts(
        where: { language_id: { _eq: 9 } }
        order_by: { version_id: desc }
        limit: 1
      ) {
        text: flavor_text
      }
      chain: evolutionchain {
        species: pokemonspecies(order_by: { order: asc }) {
          id
          name
          evolvesFrom: evolves_from_species_id
          evolutions: pokemonevolutions {
            minLevel: min_level
            minHappiness: min_happiness
            timeOfDay: time_of_day
            minAffection: min_affection
            knownMoveTypeId: known_move_type_id
            location: location {
              name
            }
            item: item {
              name
            }
            trigger: evolutiontrigger {
              name
            }
          }
        }
      }
      forms: pokemons(order_by: { id: asc }) {
        id
        name
        isDefault: is_default
        height
        weight
        types: pokemontypes(order_by: { slot: asc }) {
          type: type {
            name
          }
        }
        stats: pokemonstats(order_by: { stat_id: asc }) {
          base_stat
        }
        abilities: pokemonabilities(order_by: { slot: asc }) {
          isHidden: is_hidden
          ability: ability {
            name
          }
        }
        moves: pokemonmoves(
          where: { movelearnmethod: { name: { _eq: "level-up" } } }
          order_by: [{ version_group_id: desc }, { level: asc }]
        ) {
          level
          versionGroup: version_group_id
          move: move {
            name
            power
            accuracy
            type: type {
              name
            }
            damageClass: movedamageclass {
              name
            }
          }
        }
      }
    }
    prev: pokemonspecies(
      where: { id: { _lt: $id } }
      order_by: { id: desc }
      limit: 1
    ) {
      id
      name
    }
    next: pokemonspecies(
      where: { id: { _gt: $id } }
      order_by: { id: asc }
      limit: 1
    ) {
      id
      name
    }
    first: pokemonspecies(order_by: { id: asc }, limit: 1) {
      id
      name
    }
    last: pokemonspecies(order_by: { id: desc }, limit: 1) {
      id
      name
    }
  }
`

export { GET_POKEMON_DETAIL }
