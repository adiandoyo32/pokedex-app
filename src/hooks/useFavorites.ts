import { createContext, useContext } from 'react'

export type Favorites = {
  ids: number[]
  isFavorite: (id: number) => boolean
  toggleFavorite: (id: number) => void
}

export const FavoritesContext = createContext<Favorites>({
  ids: [],
  isFavorite: () => false,
  toggleFavorite: () => {}
})

const useFavorites = () => useContext(FavoritesContext)

export default useFavorites
