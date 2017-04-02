/**
 * Created by Vadym Yatsyuk on 13/10/2016
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from './user';

export class List extends React.Component {
  constructor() {
    super();

    this.state = {
      users: []
    };

    this.getUsers();
  }

  getUsers() {
    fetch('/graphql?query={users{id, name}}')
      .then(response => response.json())
      .then(response => {
        this.setState(response.data);
      }).catch(err => {
      });
  }

  render() {
    let users = [];

    this.state.users.forEach(user => {
      users.push(<User key={ user.id } user={ user } />);
    });

    return (
      <div>
        <Link to={ '/new' }>Add new user</Link>
        <ul>{ users }</ul>
      </div>
    );
  }
}