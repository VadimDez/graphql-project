/**
 * Created by Vadym Yatsyuk on 16/06/16
 */

var express = require('express');
var graphql = require('graphql');
var graphqlHttp = require('express-graphql');
var app = express();
var data = require('./data.json');

const PORT = 8000;

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
      },
      users: {
        type: new graphql.GraphQLList(userType),
        resolve: () => {
          let users = [];

          for (const key in data) {
            users.push(data[key]);
          }

          return users;
        }
      }
    }
  })
});

app.use('/graphql', graphqlHttp({
  schema,
  pretty: true,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log('Server running...');
});