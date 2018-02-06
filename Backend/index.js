const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const {schema} = require('./schema');
const cors = require('cors');
// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', cors(), bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3001, () => {
  console.log('Go to http://localhost:3001/graphiql to run queries!');
});