import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import webAppHandler from './handlers/webApp';
import graphqlHandler from './handlers/graphql';
import { IS_DEV } from './constants';

export default express()
  /* Request logger */
  .use(morgan(IS_DEV ? 'dev' : 'combined'))
  /* Gzip compression */
  .use(compression())
  /** GraphQL handler
   *  - handle graphql queries
   *  - serv playground in development
   * */
  .use(graphqlHandler)
  /** Web app handler
   *  - render app
   *  - serv static assets
   * */
  .use(webAppHandler);
