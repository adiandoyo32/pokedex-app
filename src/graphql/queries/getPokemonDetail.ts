import { gql } from '@apollo/client'

// Species-level detail: every form (Mega, Gigantamax, regional…) comes back
// in `forms`, with the default one flagged `is_default`.
const GET_POKEMON_DETAIL = gql`
  query getPokemonDetail($id: Int!) {
    species: pokemon_v2_pokemonspecies_by_pk(id: $id) {
      id
      name
      captureRate: capture_rate
      genderRate: gender_rate
      generationId: generation_id
      names: pokemon_v2_pokemonspeciesnames(
        where: { language_id: { _eq: 9 } }
      ) {
        name
        genus
      }
      flavor: pokemon_v2_pokemonspeciesflavortexts(
        where: { language_id: { _eq: 9 } }
        order_by: { version_id: desc }
        limit: 1
      ) {
        text: flavor_text
      }
      chain: pokemon_v2_evolutionchain {
        species: pokemon_v2_pokemonspecies(order_by: { order: asc }) {
          id
          name
          evolvesFrom: evolves_from_species_id
          evolutions: pokemon_v2_pokemonevolutions {
            minLevel: min_level
            minHappiness: min_happiness
            timeOfDay: time_of_day
            minAffection: min_affection
            knownMoveTypeId: known_move_type_id
            location: pokemon_v2_location {
              name
            }
            item: pokemon_v2_item {
              name
            }
            trigger: pokemon_v2_evolutiontrigger {
              name
            }
          }
        }
      }
      forms: pokemon_v2_pokemons(order_by: { id: asc }) {
        id
        name
        isDefault: is_default
        height
        weight
        types: pokemon_v2_pokemontypes(order_by: { slot: asc }) {
          type: pokemon_v2_type {
            name
          }
        }
        stats: pokemon_v2_pokemonstats(order_by: { stat_id: asc }) {
          base_stat
        }
        abilities: pokemon_v2_pokemonabilities(order_by: { slot: asc }) {
          isHidden: is_hidden
          ability: pokemon_v2_ability {
            name
          }
        }
        moves: pokemon_v2_pokemonmoves(
          where: { pokemon_v2_movelearnmethod: { name: { _eq: "level-up" } } }
          order_by: [{ version_group_id: desc }, { level: asc }]
        ) {
          level
          versionGroup: version_group_id
          move: pokemon_v2_move {
            name
            power
            accuracy
            type: pokemon_v2_type {
              name
            }
            damageClass: pokemon_v2_movedamageclass {
              name
            }
          }
        }
      }
    }
    prev: pokemon_v2_pokemonspecies(
      where: { id: { _lt: $id } }
      order_by: { id: desc }
      limit: 1
    ) {
      id
      name
    }
    next: pokemon_v2_pokemonspecies(
      where: { id: { _gt: $id } }
      order_by: { id: asc }
      limit: 1
    ) {
      id
      name
    }
    first: pokemon_v2_pokemonspecies(order_by: { id: asc }, limit: 1) {
      id
      name
    }
    last: pokemon_v2_pokemonspecies(order_by: { id: desc }, limit: 1) {
      id
      name
    }
  }
`

export { GET_POKEMON_DETAIL }
