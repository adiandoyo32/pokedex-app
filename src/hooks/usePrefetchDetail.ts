import { useApolloClient } from '@apollo/client'
import { useCallback } from 'react'
import { GET_POKEMON_DETAIL } from '@/graphql/queries/getPokemonDetail'

const requested = new Set<number>()

/**
 * Warm the Apollo cache for a detail page so the card → detail transition
 * plays straight away instead of after a loading skeleton.
 */
const usePrefetchDetail = () => {
  const client = useApolloClient()
  return useCallback(
    (id: number) => {
      if (requested.has(id)) return
      requested.add(id)
      client
        .query({ query: GET_POKEMON_DETAIL, variables: { id } })
        .catch(() => requested.delete(id))
    },
    [client]
  )
}

export default usePrefetchDetail
