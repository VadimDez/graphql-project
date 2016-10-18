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
    this.getUser(this.props.params.id);
  }

  render() {
    let user = '';

    if (this.state.user) {
      user = <h2>{ this.state.user.name }</h2>
    }
    return (
      <div>
        { user }
      </div>
    );
  }

  getUser(id) {
    fetch(`/graphql?query={user(id:"${ id }"){id,name}}`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          user: res.data.user
        });
      });
  }
}