import { Router } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { GRAPHQL_ENDPOINT } from '../constants';
import schema from '../schema';

const graphqlHandler = new Router();

new ApolloServer({
  schema,
  context: ({ req }) => req,
  playground: {
    endpoint: GRAPHQL_ENDPOINT,
    settings: {
      'editor.cursorShape': 'line',
      'request.credentials': 'include',
    },
  },
}).applyMiddleware({
  app: graphqlHandler,
  path: GRAPHQL_ENDPOINT,
  cors: false,
});

export default graphqlHandler;
