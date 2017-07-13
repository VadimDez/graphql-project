/**
 * Created by Vadym Yatsyuk on 01/11/2016
 */

import React, { PropTypes } from 'react';

import { UserForm } from '../user-form/user-form'
import './add-user.scss';
import { User } from '../user';

export class AddUser extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.state = {
      isLoading: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateLoading(isLoading) {
    this.setState({
      isLoading
    });
  }

  handleSubmit(user) {

    const url = `/graphql?query={addUser(name:"${ encodeURIComponent(user.name) }",phone:"${ encodeURIComponent(user.phone) }"){id,name,phone}}`;

    this.updateLoading(true);
    fetch(url, {
      method: 'POST'
    }).then(() => {
      this.updateLoading(false);
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <div className="add-user-component content">
        <h2>Add user</h2>

        <UserForm onSave={ this.handleSubmit } submitDisabled={ this.state.isLoading } />
      </div>
    );
  }
}