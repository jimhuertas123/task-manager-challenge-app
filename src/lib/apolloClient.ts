import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: import.meta.env.VITE_GRAPHQL_API_URL,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GRAPHQL_API_KEY}`,
    },
  }),
  cache: new InMemoryCache(),
});
