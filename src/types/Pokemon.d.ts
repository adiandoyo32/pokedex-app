declare namespace Pokemon {
  type Aggregate = {
    aggregate: { count: number }
  }

  type PokemonList = {
    filtered: Aggregate
    pokemons: Pokemon[]
  }

  type PokemonCount = {
    total: Aggregate
  }

  type Pokemon = {
    id: number
    name: string
    pokemons: {
      types: Types[]
      stats: { base_stat: number }[]
    }[]
  }

  type Types = {
    type: {
      name: string
    }
  }

  type SpeciesRef = {
    id: number
    name: string
  }

  type Evolution = {
    minLevel: number | null
    minHappiness: number | null
    timeOfDay: string
    minAffection: number | null
    knownMoveTypeId: number | null
    location: { name: string } | null
    item: { name: string } | null
    trigger: { name: string } | null
  }

  type ChainSpecies = SpeciesRef & {
    evolvesFrom: number | null
    evolutions: Evolution[]
  }

  type LevelUpMove = {
    level: number
    versionGroup: number
    move: {
      name: string
      power: number | null
      accuracy: number | null
      type: { name: string }
      damageClass: { name: string } | null
    }
  }

  type Form = {
    id: number
    name: string
    isDefault: boolean
    height: number
    weight: number
    types: Types[]
    stats: { base_stat: number }[]
    abilities: { isHidden: boolean; ability: { name: string } }[]
    moves: LevelUpMove[]
  }

  type Species = {
    id: number
    name: string
    captureRate: number
    genderRate: number
    generationId: number
    names: { name: string; genus: string }[]
    flavor: { text: string }[]
    chain: { species: ChainSpecies[] } | null
    forms: Form[]
  }

  type Detail = {
    species: Species[]
    prev: SpeciesRef[]
    next: SpeciesRef[]
    first: SpeciesRef[]
    last: SpeciesRef[]
  }
}
