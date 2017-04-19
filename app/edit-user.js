/**
 * Created by Vadym Yatsyuk on 18.04.17
 */

import React from 'react';
import { UserService } from './services/UserService';

export class EditUser extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {},
      isUpdating: false,
      isUpdated: false
    };

    this.onNameChange = this.onNameChange.bind(this);
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

  onNameChange(event) {
    this.setState({
      user: Object.assign({}, this.state.user, { name: event.target.value })
    });
  }

  onUpdateUser() {
    this.setUpdating(true);
    this.setUpdated(false);

    fetch(`/graphql?query={updateUser(id:"${ this.state.user.id }",name:"${ this.state.user.name }"){id}}`, {
      method: 'POST'
    })
      .then(({ status }) => {
        this.setUpdating(false);

        if (status >= 400) {
          // error
          return;
        }

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
        <label>
          Name:
          <input type="text"
                 name="name"
                 value={ this.state.user.name }
                 onChange={ this.onNameChange }
          />
        </label>


        <button type="button"
                onClick={ this.onUpdateUser }
                disabled={ this.state.isUpdating }
        >Save</button>

        <div>
          { updated }
        </div>
      </div>;
    }

    return (
      <div>
        <h1>Edit view</h1>

        { user }

      </div>
    )
  }
}