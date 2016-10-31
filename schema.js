/**
 * Created by Vadym Yatsyuk on 09/10/2016
 */
const graphql = require('graphql');
const sqlite3 = require('sqlite3');
const bluebird = require('bluebird');
let data = require('./data.json');

const db = new sqlite3.Database('storage.db');

db.get = bluebird.promisify(db.get);
db.all = bluebird.promisify(db.all);

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
        resolve: (_, { id }) => {
          return db.get(`SELECT * FROM users WHERE id = $id`, { id });
        }
      },
      users: {
        type: new graphql.GraphQLList(userType),
        resolve: () => {
          return db.get(`SELECT * FROM users`);
        }
      }
    }
  })
});