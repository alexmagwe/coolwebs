import {ApolloClient,InMemoryCache} from '@apollo/client'
const apolloClient=new ApolloClient({
    uri:"http://localhost:3000/api/graphql",
    credentials:'same-origin',
    cache:new InMemoryCache()
})
export default apolloClient