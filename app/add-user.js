/**
 * Created by Vadym Yatsyuk on 01/11/2016
 */

import React, { PropTypes } from 'react';

export class AddUser extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

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

    const url = `/graphql?query={addUser(name:"${ encodeURIComponent(this.state.name) }",phone:"${ encodeURIComponent(this.state.phone) }"){id,name,phone}}`;

    fetch(url, {
      method: 'POST'
    }).then(() => {
      this.props.history.push('/');
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