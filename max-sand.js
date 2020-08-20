const express = require('express');
const { GraphQLSchema, GraphQLObjectType, GraphQLList } = require('graphql');
var { graphqlHTTP } = require('express-graphql');
const app = express();

const data = './gumtree.json';

const DataType = new GraphQLObjectType({
  name: 'Data',
  description: 'This Stuff',
  fields: () => ({
    edges: { type: GraphQLList }
  })
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    data: {
      type: new GraphQLList(DataType),
      description: 'data list',
      resolve: () => data
    }
  })
});

const schema = new GraphQLSchema({
  query: RootQueryType
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');

