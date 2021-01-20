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

export const setComponentFragments = (Component, fragments) => {
  /* eslint-disable no-param-reassign */
  Component.fragments = fragments;
  Component.fragmentNames = Object.entries(fragments).reduce(
    (acc, [name, document]) => {
      acc[name] = document.definitions.find(
        (definition) => definition.kind === 'FragmentDefinition',
      )?.name.value;
    },
    {},
  );
  /* eslint-enable no-param-reassign */

  return Component;
};
