import { ApolloProvider } from '@apollo/client'
import './App.css'
import client from '@/graphql'
import Routes from '@/routes'
import { FavoritesProvider } from '@/context/Favorites'
import { PokexThemeProvider } from '@/context/PokexTheme'

function App() {
  return (
    <ApolloProvider client={client}>
      <FavoritesProvider>
        <PokexThemeProvider>
          <Routes />
        </PokexThemeProvider>
      </FavoritesProvider>
    </ApolloProvider>
  )
}

export default App
