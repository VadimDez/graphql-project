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
          <h1 style={ styles.headerH1 }><Link to="/">GraphQL</Link></h1>
        </header>
        <section style={ styles.container }>
          { this.props.children }
        </section>
        <footer style={ styles.footer }>
          Vadym Yatsyuk
        </footer>
      </div>
    );
  }
}

const styles = {
  header: {
    backgroundColor: '#e3e3e3',
    padding: '10px',
  },
  headerH1: {
    width: '800px',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  container: {
    width: '800px',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingTop: '15px'
  },
  footer: {
    textAlign: 'center',
    position: 'absolute',
    paddingBottom: '15px',
    bottom: 0,
    left: 0,
    right: 0
  }
};