/**
 * Created by Vadym Yatsyuk on 13/10/2016
 */
import React from 'react';
import { Link } from 'react-router';

export class User extends React.Component {
  render() {
    return (
      <li><Link to={'/users/' + this.props.user.id }>{ this.props.user.name }</Link></li>
    )
  }
}