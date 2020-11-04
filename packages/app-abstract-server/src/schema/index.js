import { makeExecutableSchema } from 'apollo-server-express';
import typeDefs from 'app-abstract-schema';

import QueryType from './types/QueryType';
import MutationType from './types/MutationType';

import FooType from './types/FooType';

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: QueryType,
    Mutation: MutationType,

    Foo: FooType,
  },
});
