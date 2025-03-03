declare namespace Pokemon {
  type PokemonList = {
    pokemons: []
  }

  type Pokemon = {
    id: number
    name: string
    pokemons: [
      {
        sprites: Sprites[]
        types: Types[]
      }
    ]
  }

  type Sprites = {
    sprites: string
  }

  type Types = {
    type: {
      name: string
    }
  }

  type PokemonDetail = {
    pokemon: {
      id: number
      name: string
      moves: Move[]
      sprites: Sprites[]
      stats: Stat[]
    }
  }

  type Move = {
    move: {
      name: string
    }
  }

  type Stat = {
    base_stat: number
    stat: {
      name: string
    }
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
