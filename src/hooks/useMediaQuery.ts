import { useCallback, useSyncExternalStore } from 'react'

/** Live `matchMedia` result, e.g. `useMediaQuery('(min-width: 1500px)')`. */
const useMediaQuery = (query: string) => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', onChange)
      return () => list.removeEventListener('change', onChange)
    },
    [query]
  )
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  )
}

/** Wide desktop (design 5d) — matches the Tailwind `wide` screen. */
export const WIDE_QUERY = '(min-width: 1500px)'

export default useMediaQuery
