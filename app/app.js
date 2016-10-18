/**
 * Created by Vadym Yatsyuk on 18/10/2016
 */
import React from 'react';
import { Link } from 'react-router';

export class App extends React.Component {
  render() {
    return (
      <div>
        <h1><Link to="/">GraphQL</Link></h1>
        { this.props.children }
      </div>
    );
  }
}