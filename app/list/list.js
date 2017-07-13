/**
 * Created by Vadym Yatsyuk on 13/10/2016
 */
import React from 'react';

import { User } from '../user';
import './list.scss';

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
        this.setState({
          users: response.data.users || []
        });
      }).catch(err => {
      });
  }

  render() {
    let users = [];

    this.state.users.forEach(user => {
      users.push(<User key={ user.id } user={ user } />);
    });

    return (
      <div className="list-component">
        <ul>{ users }</ul>
      </div>
    );
  }
}