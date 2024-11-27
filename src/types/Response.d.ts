import type { Query } from '@favware/graphql-pokemon'

declare namespace Response {
  export type PokemonResponse<K extends keyof Omit<Query, '__typename'>> =
    Record<K, Query[K]>
}
