/**
 * Created by Vadym Yatsyuk on 18/10/2016
 */
import React from 'react';
import { Link } from 'react-router-dom';

import './app.scss';

export class App extends React.Component {
  render() {
    return (
      <div className="app-component">
        <header>
          <div className="header-container">
            <Link to="/">GraphQL</Link>
            <Link to={ '/new' }>Add new user</Link>
          </div>
        </header>
        <section>
          { this.props.children }
        </section>
        <footer>
          Vadym Yatsyuk
        </footer>
      </div>
    );
  }
}