const {
  makeExecutableSchema
} = require('graphql-tools');

// Some fake data
const todos = ["111","2222"];

// The GraphQL schema in string form
const query = `
    
  type Query { 
      listTodos: [String] 
    }
  type Mutation{
      addTodos(todo: String!): [String]
      remove(index: Int): [String]
    }

    schema {
        query: Query
        mutation: Mutation
      }
`;

// The resolvers
const resolvers = {
  Query: {
    listTodos: () =>{
        return todos
    }
  },
  Mutation: {
    addTodos: (root, params, options) => {
      todos.push(params.todo)
      return todos
    },
    remove: (root , params , options)=>{
      todos.splice(params.index ,1)
    }
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs: query,
  resolvers,
});

module.exports.schema = schema;
