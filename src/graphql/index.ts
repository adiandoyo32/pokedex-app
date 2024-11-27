import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

// const cache = new InMemoryCache({
//   typePolicies: {
//     Query: {
//       fields: {
//         pokemons: {
//           keyArgs: [],
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           merge(existing, incoming, { args: { offset = 0 } }: any) {
//             if (!existing) return incoming
//             const merged = existing.results.slice(0)
//             for (let i = 0; i < incoming.results.length; ++i) {
//               merged[offset + i] = incoming.results[i]
//             }
//             return { ...existing, results: merged }
//           }
//         }
//       }
//     }
//   }
// })

const cache = new InMemoryCache()
const link = new HttpLink({
  uri: 'https://graphqlpokemon.favware.tech/v8'
})

const client = new ApolloClient({
  connectToDevTools: process.env.NODE_ENV === 'development',
  cache,
  link,
  name: 'graphql-pokemon-client',
  version: '1.0',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
})

export default client
