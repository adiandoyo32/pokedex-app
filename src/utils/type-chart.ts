import { POKEMON_TYPES } from '@/utils/pokex-theme'

// Attacking type → [super effective against, not very effective against, no effect on]
const CHART: Record<string, [string, string, string]> = {
  normal: ['', 'rock steel', 'ghost'],
  fire: ['grass ice bug steel', 'fire water rock dragon', ''],
  water: ['fire ground rock', 'water grass dragon', ''],
  electric: ['water flying', 'electric grass dragon', 'ground'],
  grass: ['water ground rock', 'fire grass poison flying bug dragon steel', ''],
  ice: ['grass ground flying dragon', 'fire water ice steel', ''],
  fighting: [
    'normal ice rock dark steel',
    'poison flying psychic bug fairy',
    'ghost'
  ],
  poison: ['grass fairy', 'poison ground rock ghost', 'steel'],
  ground: ['fire electric poison rock steel', 'grass bug', 'flying'],
  flying: ['grass fighting bug', 'electric rock steel', ''],
  psychic: ['fighting poison', 'psychic steel', 'dark'],
  bug: [
    'grass psychic dark',
    'fire fighting poison flying ghost steel fairy',
    ''
  ],
  rock: ['fire ice flying bug', 'fighting ground steel', ''],
  ghost: ['psychic ghost', 'dark', 'normal'],
  dragon: ['dragon', 'steel', 'fairy'],
  dark: ['psychic ghost', 'fighting dark fairy', ''],
  steel: ['ice rock fairy', 'fire water electric steel', ''],
  fairy: ['fighting dragon dark', 'fire poison steel', '']
}

const has = (list: string, type: string) => list.split(' ').includes(type)

/** Damage multiplier of each attacking type against a defender's types. */
const defenseMultipliers = (defender: string[]) =>
  Object.fromEntries(
    POKEMON_TYPES.map(attacker => {
      const [strong, weak, none] = CHART[attacker]
      const mult = defender.reduce(
        (m, d) =>
          m * (has(none, d) ? 0 : has(strong, d) ? 2 : has(weak, d) ? 0.5 : 1),
        1
      )
      return [attacker, mult]
    })
  ) as Record<string, number>

const multiplierLabel = (m: number) =>
  m === 0 ? '×0' : m === 0.25 ? '×¼' : m === 0.5 ? '×½' : `×${m}`

export { defenseMultipliers, multiplierLabel }
