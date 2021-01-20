module.exports = `
  schema {
    query: Query
    mutation: Mutation
  }

  type Query {
    todoList: [Todo]!
  }

  type Mutation {
    addTodo(description: String!): Todo!
  }
  
  type Todo {
    id: ID!
    description: String
    isComplete: Boolean!
    isDeleted: Boolean!
  }
`;
