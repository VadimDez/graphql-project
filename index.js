/**
 * Created by Vadym Yatsyuk on 16/06/16
 */

const express = require('express');
const graphqlHttp = require('express-graphql');
const schema = require('./schema');

const app = express();
const PORT = 8000;

app.use('/graphql', graphqlHttp({
  schema,
  pretty: true,
  graphiql: true
}));

app.listen(PORT, () => {
  console.log('Server running...');
});