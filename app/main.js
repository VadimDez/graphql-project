/**
 * Created by Vadym Yatsyuk on 10/10/2016
 */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { App } from './app';
import { List } from './list';
import { Details } from './details';
import { AddUser } from './add-user';
import { EditUser } from './edit-user';

render(
  <BrowserRouter>
    <App>
      <Route exact={ true } path="/" component={ List } />
      <Route path="/new" component={ AddUser } />
      <Route exact={ true } path="/users" component={ List } />
      <Route exact={ true } path="/users/:id" component={ Details }/>
      <Route path="/users/:id/edit" component={ EditUser }/>
    </App>
  </BrowserRouter>,
  document.querySelector('#app')
);