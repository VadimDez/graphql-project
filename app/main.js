/**
 * Created by Vadym Yatsyuk on 10/10/2016
 */
import React from 'react';
import { render } from 'react-dom';

import { List } from './list';

render(
  <div>
    <h1>GraphQL</h1>
    <List />
  </div>,
  document.querySelector('#app')
);