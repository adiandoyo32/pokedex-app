import { useCallback, useMemo, useState } from 'react'
import { FavoritesContext } from '@/hooks/useFavorites'

const STORAGE_KEY = 'pokex:favorites'

const readStored = (): number[] => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    return Array.isArray(parsed) ? parsed.filter(Number.isInteger) : []
  } catch {
    return []
  }
}

const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [ids, setIds] = useState<number[]>(readStored)

  const toggleFavorite = useCallback((id: number) => {
    setIds(prev => {
      const next = prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // storage unavailable — keep the in-memory value
      }
      return next
    })
  }, [])

  const value = useMemo(() => {
    const set = new Set(ids)
    return { ids, isFavorite: (id: number) => set.has(id), toggleFavorite }
  }, [ids, toggleFavorite])

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export { FavoritesProvider }
