module.exports = `
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    foo: Foo
  }

  type Mutation {
    setFoo: Foo
  }


  type Foo {
    value: String
  }
`;
