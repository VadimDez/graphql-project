/**
 * Created by Vadym Yatsyuk on 10/10/2016
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import { App } from './app';
import { List } from './list';
import { Details } from './details';

render(
  <Router history={hashHistory}>
    <Route path="/" component={ App }>
      <IndexRoute component={ List } />
      <Route path="/users" component={ List } />
      <Route path="/users/:id" component={ Details }/>
    </Route>
  </Router>,
  document.querySelector('#app')
);