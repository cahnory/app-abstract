/* eslint-disable import/prefer-default-export */
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import schema from '../schema';

export const createClient = ({ context }) =>
  new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: new SchemaLink({
      context,
      schema,
    }),
  });
