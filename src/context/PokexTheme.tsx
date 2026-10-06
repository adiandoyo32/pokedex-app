import { useCallback, useState } from 'react'
import { PokexThemeContext } from '@/hooks/usePokexTheme'

const STORAGE_KEY = 'pokex:dark'

const readStored = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

const PokexThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [dark, setDark] = useState(readStored)

  const toggleDark = useCallback(() => {
    setDark(prev => {
      const next = !prev
      try {
        localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
      } catch {
        // storage unavailable — keep the in-memory value
      }
      return next
    })
  }, [])

  return (
    <PokexThemeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </PokexThemeContext.Provider>
  )
}

export { PokexThemeProvider }
