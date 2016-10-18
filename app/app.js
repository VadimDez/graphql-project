/**
 * Created by Vadym Yatsyuk on 18/10/2016
 */
import React from 'react';
import { List } from './list';

export class App extends React.Component {
  render() {
    return (
      <div>
        <h1>GraphQL</h1>
        <List />
      </div>
    );
  }
}