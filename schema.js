/**
 * Created by Vadym Yatsyuk on 09/10/2016
 */
const graphql = require('graphql');
const sqlite3 = require('sqlite3');
const bluebird = require('bluebird');
const chalk = require('chalk');
let data = require('./data.json');

const db = new sqlite3.Database('storage.db');

db.get = bluebird.promisify(db.get);
db.all = bluebird.promisify(db.all);

var userType = new graphql.GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: graphql.GraphQLInt },
    name: { type: graphql.GraphQLString },
    phone: { type: graphql.GraphQLString }
  }
});

module.exports = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        args: {
          id: { type: graphql.GraphQLInt }
        },
        resolve: (_, { id }) => db.get('SELECT * FROM users u WHERE u.id = $id', { $id: id })
      },
      addUser: {
        type: userType,
        args: {
          name: { type: graphql.GraphQLString },
          phone: { type: graphql.GraphQLString }
        },
        resolve: (_, { name, phone }) => {
          const stmt = db.prepare('INSERT INTO users(name, phone) VALUES (?, ?)');

          stmt.run([name, phone]);
        },
      },
      updateUser: {
        type: userType,
        args: {
          id: { type: graphql.GraphQLInt },
          name: { type: graphql.GraphQLString },
          phone: { type: graphql.GraphQLString }
        },
        resolve: ( _, { id, name }) => {
          const stmt = db.prepare('UPDATE users SET name = ?, phone = ? WHERE id = ?');

          stmt.run([name, id], logError);
        }
      },
      users: {
        type: new graphql.GraphQLList(userType),
        resolve: () => db.all(`SELECT * FROM users`)
      },
      deleteUser: {
        type: userType,
        args: {
          id: { type: graphql.GraphQLInt }
        },
        resolve: ( _, { id }) => {
          const stmt = db.prepare('DELETE FROM users WHERE id = ?');

          stmt.run([parseInt(id, 10)], logError);
        }
      }
    }
  })
});

function logError(err) {
  console.log(chalk.red('Error:'));
  console.log(chalk.red(err));
}