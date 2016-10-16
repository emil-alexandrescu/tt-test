import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Input, Button } from 'react-toolbox';

import CurrentUserStore from '../../stores/CurrentUser';

@observer
export default class LoginPage extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    const authData = {
      email: this.state.email,
      password: this.state.password
    };

    CurrentUserStore.signin(authData);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Log In</h1>
          <Input type="email" icon="email" value={this.state.email} onChange={this.handleChange.bind(this, 'email')} required label="Email" />
          <Input type="password" icon="lock" value={this.state.password} onChange={this.handleChange.bind(this, 'password')} required label="Password" />
          <Button label="Log In" primary raised />
        </form>
      </div>
    );
  }
}
