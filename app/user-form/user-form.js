/**
 * Created by Vadym Yatsyuk on 13.07.17
 */

import React from 'react';

import "./user-form.scss";

export class UserForm extends React.Component {
  constructor() {
    super();

    this.state = {
      user: {
        name: '',
        phone: ''
      },
      submitDisabled: false
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  componentWillMount() {
    if (this.props.user) {
      this.setState({
        user: this.props.user
      });
    }
  }

  onValueChange(key) {
    return event => {
      this.setState({
        user: Object.assign({}, this.state.user, { [key]: event.target.value })
      });
    };
  }

  onSave(e) {
    e.preventDefault();

    this.props.onSave(this.state.user);
  }

  render() {
    return (
      <form className="user-edit-form" onSubmit={ this.onSave }>
        <div className="row">
          <div className="input-field">
            <label>
              Name:
              <input type="text"
                     name="name"
                     placeholder="Name"
                     value={ this.state.user.name }
                     onChange={ this.onValueChange('name') }
              />
            </label>
          </div>

          <div className="input-field">
            <label>
              Phone:
              <input type="text"
                     name="phone"
                     placeholder="Phone"
                     value={ this.state.user.phone }
                     onChange={ this.onValueChange('phone') }
              />
            </label>
          </div>
        </div>

        <div className="actions">
          <button type="submit"
                  disabled={ this.props.submitDisabled }
          >Save</button>
        </div>
      </form>
    );
  }
}