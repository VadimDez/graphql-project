/**
 * Created by Vadym Yatsyuk on 18.04.17
 */

import React from 'react';

import { UserService } from '../services/UserService';
import { UserForm } from '../user-form/user-form';
import './edit-user.scss';

export class EditUser extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      isUpdating: false,
      isUpdated: false
    };

    this.onUpdateUser = this.onUpdateUser.bind(this);
  }

  componentWillMount() {
    this.setState({
      isLoading: true
    });

    this.getUser(this.props.match.params.id);
  }

  getUser(id) {
    UserService.get(id)
      .then(res => {
        this.setState({
          isLoading: false,
          user: res.data.user
        })
      });
  }

  onUpdateUser(user) {
    this.setUpdating(true);
    this.setUpdated(false);

    fetch(`/graphql?query={updateUser(id:${ this.state.user.id },name:"${ user.name }"){id}}`, {
      method: 'POST'
    })
      .then(({ status }) => {
        this.setUpdating(false);

        if (status >= 400) {
          // error
          return;
        }
        this.setState({
          user
        });
        this.setUpdated(true);
      });
  }

  setUpdating(isUpdating) {
    this.setState({
      isUpdating
    })
  }

  setUpdated(isUpdated) {
    this.setState({
      isUpdated
    })
  }

  render() {
    let user = '';
    let updated = '';


    if (this.state.isUpdated) {
      updated = <span>Updated!</span>;
    }

    if (!this.state.isLoading) {
      user = <div>
        <h2>{ this.state.user.name }</h2>

        <UserForm user={ this.state.user } submitDisabled={ this.state.isUpdating } onSave={ this.onUpdateUser } />

        <div>
          { updated }
        </div>
      </div>;
    }

    return (
      <div className="edit-user-component content">
        <h1>Edit view</h1>

        { user }

      </div>
    )
  }
}