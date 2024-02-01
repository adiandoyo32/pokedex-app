declare namespace Pokemon {
  type PokemonList = {
    count: number
    next?: string | null
    previous?: string | null
    nextOffset?: number | null
    prevOffset?: number | null
    results: []
    status: boolean
    message?: string
  }

  type Pokemon = {
    id?: number
    url?: string
    name: string
    image?: string
  }

  type PokemonDetail = {
    abilities?: Ability[]
    base_experience?: number
    forms?: Pokemon[]
    game_indices?: GameIndex[]
    height?: number
    held_items?: HeldItem[]
    id?: number
    is_default?: boolean
    location_area_encounters?: string
    moves?: Move[]
    name?: string
    order?: number
    species?: Pokemon
    sprites?: Sprite
    stats?: Stat[]
    types?: Type[]
    weight?: number
    status?: boolean
    message?: string
  }

  type PokemonSpecies = {
    base_happiness?: number
    capture_rate?: number
    color?: {
      name: string
      url: string
    }
  }
}
