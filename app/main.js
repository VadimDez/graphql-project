/**
 * Created by Vadym Yatsyuk on 10/10/2016
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import { App } from './app';
import { Details } from './details';

render(
  <Router history={hashHistory}>
    <Route path="/" component={ App } />
    <Route path="/users/:id" component={ Details }/>
  </Router>,
  document.querySelector('#app')
);