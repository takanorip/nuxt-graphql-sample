import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'

export default (context) => {
  const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: { Authorization: `bearer ${context.env.GITHUB_TOKEN}` }
    }
  })

  const cache = new InMemoryCache()

  persistCache({
    cache,
    storage: window.localStorage,
  })

  const link = ApolloLink.from([
    authLink,
    httpLink
  ])

  return {
    link,
    cache
  }
}
