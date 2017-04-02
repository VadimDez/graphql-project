/**
 * Created by Vadym Yatsyuk on 01/11/2016
 */

import React from 'react';

export class AddUser extends React.Component {
  constructor() {
    super();

    this.state = {
      name: ''
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      isLoading: true
    });
  }

  onNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit() {
    fetch(`/graphql?query={addUser(name:"${ this.state.name }"){id,name}}`, {
      method: 'POST'
    });
  }

  render() {
    return (
      <div>
        <h2>Add user</h2>
        <form onSubmit={ this.handleSubmit }>
          <label>
            Name:
            <input type="text"
                   value={ this.state.name }
                   onChange={ this.onNameChange }
            />
          </label>

          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}