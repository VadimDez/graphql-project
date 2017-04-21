/**
 * Created by Vadym Yatsyuk on 18/10/2016
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { UserService } from './services/UserService';

export class Details extends React.Component {
  constructor() {
    super();
    this.state = {};
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
      user = <div>
        <Link to={ `/users/${ this.state.user.id }/edit`}>Edit</Link>
        <h2>{ this.state.user.name }</h2>

        <div>
          <p>Phone: { this.state.user.phone }</p>
        </div>
      </div>
    }

    if (this.state.isLoading) {
      isLoading = <span>Is loading...</span>;
    } else if (!this.state.user) {
      user = 'User not found';
    }

    return (
      <div>
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
}