import { ApolloClient, InMemoryCache } from '@apollo/client'
const apolloClient = new ApolloClient({
  uri:
    process.env.NODE_ENV == 'production'
      ? 'https://coolwebs.vercel.app/api/graphql'
      : 'http://localhost:3000/api/graphql',
  credentials: 'same-origin',
  cache: new InMemoryCache(),
})
export default apolloClient
