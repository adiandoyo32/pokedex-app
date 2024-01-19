import { ApolloProvider } from '@apollo/client'
import './App.css'
import client from '@/graphql'
import Routes from '@/routes'

function App() {
  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  )
}

export default App
