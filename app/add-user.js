/**
 * Created by Vadym Yatsyuk on 01/11/2016
 */

import React from 'react';

export class AddUser extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      phone: ''
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      isLoading: true
    });
  }

  onValueChange(key) {
    return event => {
      this.setState({ [key]: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(`/graphql?query={addUser(name:"${ this.state.name }",phone:"${ this.state.phone }"){id,name,phone}}`, {
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
                   onChange={ this.onValueChange('name') }
            />
          </label>
          <label>
            Phone:
            <input type="text"
                   value={ this.state.phone }
                   onChange={ this.onValueChange('phone') }
            />
          </label>

          <button type="submit">Create</button>
        </form>
      </div>
    );
  }
}