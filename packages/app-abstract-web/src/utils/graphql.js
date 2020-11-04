/* eslint-disable import/prefer-default-export */
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { GRAPHQL_API_URL } from '../constants';

export const graphqlClient = new ApolloClient({
  cache: new InMemoryCache().restore(global.APOLLO_INITIAL_STATE),
  link: createHttpLink({
    uri: GRAPHQL_API_URL,
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
    },
    credentials: 'include',
    fetchOptions: {
      mode: 'cors',
    },
  }),
});
