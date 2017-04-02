/**
 * Created by Vadym Yatsyuk on 18/10/2016
 */
import React from 'react';
import { Link } from 'react-router-dom';

export class App extends React.Component {
  render() {
    return (
      <div>
        <header style={ styles.header }>
          <h1><Link to="/">GraphQL</Link></h1>
        </header>
        <section>
          { this.props.children }
        </section>
      </div>
    );
  }
}

const styles = {
  header: {
    backgroundColor: '#e3e3e3',
    padding: '10px'
  }
};