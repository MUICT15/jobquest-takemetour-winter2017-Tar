const { makeExecutableSchema } = require('graphql-tools');

// Some fake data
const todos = [];

// The GraphQL schema in string form
const typeDefs = `
  type Query { 
      books: [Book] 
    }
  type Book { 
      title: String, author: String 
    }
`;

// The resolvers
const resolvers = {
  Query: { books: () => books },
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports.schema = schema;