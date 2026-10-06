const SPRITES =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'

type SpriteKind =
  | 'front'
  | 'back'
  | 'shiny'
  | 'backShiny'
  | 'art'
  | 'artShiny'
  | 'home'
  | 'homeShiny'

const SPRITE_PATH: Record<SpriteKind, string> = {
  front: '',
  back: 'back/',
  shiny: 'shiny/',
  backShiny: 'back/shiny/',
  art: 'other/official-artwork/',
  artShiny: 'other/official-artwork/shiny/',
  home: 'other/home/',
  homeShiny: 'other/home/shiny/'
}

const spriteUrl = (id: number, kind: SpriteKind) =>
  `${SPRITES}${SPRITE_PATH[kind]}${id}.png`

const pokemonTypes = (p: Pokemon.Pokemon) =>
  p.pokemons[0]?.types.map(t => t.type.name) ?? []

const pokemonStats = (p: Pokemon.Pokemon) =>
  p.pokemons[0]?.stats.map(s => s.base_stat) ?? []

const pokemonDetailPath = (p: Pokemon.SpeciesRef) =>
  `/pokemon/${p.id}--${p.name}`

/** `solar-power` → `Solar Power` */
const titleCase = (s: string) =>
  s
    .split('-')
    .map(w => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ')

export { spriteUrl, pokemonTypes, pokemonStats, pokemonDetailPath, titleCase }
export type { SpriteKind }
