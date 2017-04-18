/**
 * Created by Vadym Yatsyuk on 18.04.17
 */

import React from 'react';
import { UserService } from './services/UserService';

export class EditUser extends React.Component {
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

  getUser(id) {
    UserService.get(id)
      .then(res => {
        this.setState({
          isLoading: false,
          user: res.data.user
        })
      });
  }

  render() {
    let user = null;
    if (!this.state.isLoading) {
      user = this.state.user || null;
    }

    return (
      <div>
        <div>Edit view</div>
        { user }
      </div>
    )
  }
}