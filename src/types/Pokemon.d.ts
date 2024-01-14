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
}
