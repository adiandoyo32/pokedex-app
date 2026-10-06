import { createContext, useContext } from 'react'

export type PokexTheme = {
  dark: boolean
  toggleDark: () => void
}

export const PokexThemeContext = createContext<PokexTheme>({
  dark: false,
  toggleDark: () => {}
})

const usePokexTheme = () => useContext(PokexThemeContext)

export default usePokexTheme
