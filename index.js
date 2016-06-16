/**
 * Created by Vadym Yatsyuk on 16/06/16
 */

var express = require('express');
var graphql = require('graphql');
var graphqlHttp = require('express-graphql');
var app = express();
var data = require('./data.json');

var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString }
  }
});

var schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: graphql.GraphQLString }
        },
        resolve: (_, args) => {
          return data[args.id];
        }
      }
    }
  })
});

app.use('/graphql', graphqlHttp({
  schema: schema,
  pretty: true
}));

app.listen(8888, () => {
  console.log('Server running...');
});