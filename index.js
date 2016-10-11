/**
 * Created by Vadym Yatsyuk on 16/06/16
 */

const express = require('express');
const graphqlHttp = require('express-graphql');
const schema = require('./schema');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;
const isDevelopment = process.env.NODE_ENV !== "production";
const compiler = webpack(config);
const public_folder = path.join(__dirname, 'dist');
const html_file = path.join(public_folder, 'index.html');

app.use('/graphql', graphqlHttp({
  schema,
  pretty: true,
  graphiql: true
}));

if (isDevelopment) {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true
    }
  }));

  app.use(webpackHotMiddleware(compiler, {
    log: console.log
  }));

  app.get("*", (req, res) => {
    res.write(compiler.outputFileSystem.readFileSync(html_file));
    res.end();
  });
} else {
  app.use(express.static(public_folder));

  app.get("*", (req, res) => res.sendFile(html_file));
}


app.listen(PORT, () => {
  console.log('Server running...');
});