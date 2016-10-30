/**
 * Created by Vadym Yatsyuk on 18/10/2016
 */
import React from 'react';

export class Details extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this.setState({
      isLoading: true
    });
    this.getUser(this.props.params.id);
  }

  render() {
    let user = '';
    let isLoading = '';

    if (this.state.user) {
      user = <h2>{ this.state.user.name }</h2>
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
    fetch(`/graphql?query={user(id:"${ id }"){id,name}}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          isLoading: false,
          user: res.data.user
        });
      });
  }
}