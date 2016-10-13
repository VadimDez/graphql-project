/**
 * Created by Vadym Yatsyuk on 13/10/2016
 */
import React from 'react';

export class User extends React.Component {
  render() {
    return (
      <li>{ this.props.user.name }</li>
    )
  }
}