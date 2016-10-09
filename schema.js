/**
 * Created by Vadym Yatsyuk on 09/10/2016
 */
const graphql = require('graphql');
let data = require('./data.json');

var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLString },
    name: { type: graphql.GraphQLString }
  }
});

module.exports = new graphql.GraphQLSchema({
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