/**
 * Created by Vadym Yatsyuk on 18/10/2016
 */
import React from 'react';
import { NavLink } from 'react-router-dom';

import './app.scss';

export class App extends React.Component {
  render() {
    return (
      <div className="app-component">
        <header>
          <div className="header-container">
            <NavLink to="/" exact activeClassName='active'>GraphQL</NavLink>
            <span className="divider"></span>
            <NavLink to="/new" exact activeClassName='active'>Add new user</NavLink>
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