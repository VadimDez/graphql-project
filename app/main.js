/**
 * Created by Vadym Yatsyuk on 10/10/2016
 */
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import { App } from './app';

render(
  <Router history={hashHistory}>
    <Route path="/" component={ App } />
  </Router>,
  document.querySelector('#app')
);