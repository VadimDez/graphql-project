/**
 * Created by Vadym Yatsyuk on 18/10/2016
 */
import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { UserService } from '../services/UserService';

import "./details.scss";

export class Details extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired
  };

  constructor() {
    super();
    this.state = {};

    this.deleteUser = this.deleteUser.bind(this);
  }

  componentWillMount() {
    this.setState({
      isLoading: true
    });
    this.getUser(this.props.match.params.id);
  }

  render() {
    let user = '';
    let isLoading = '';

    if (this.state.user) {
      user = <div className="user-details-component__container content">
        <header>
          <h2>{ this.state.user.name }</h2>
          <div>
            <Link to={ `/users/${ this.state.user.id }/edit`}>Edit</Link>
            <button onClick={ this.deleteUser } type="button">Delete</button>
          </div>
        </header>

        <section>
          <p>Phone: { this.state.user.phone }</p>
        </section>
      </div>
    }

    if (this.state.isLoading) {
      isLoading = <span>Is loading...</span>;
    } else if (!this.state.user) {
      user = 'User not found';
    }

    return (
      <div className="user-details-component">
        { isLoading }
        { user }
      </div>
    );
  }

  getUser(id) {
    UserService.get(id)
      .then(res => {
        this.setState({
          isLoading: false,
          user: res.data.user
        });
      });
  }

  deleteUser() {
    fetch(`/graphql?query={deleteUser(id:${ this.state.user.id }){id}}`, {
      method: 'GET'
    }).then(() => {
      this.props.history.push('/');
    });
  }
}