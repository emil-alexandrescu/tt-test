import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Input, Button } from 'react-toolbox';

import User from '../../stores/models/User';

@observer
export default class SignupPage extends Component {
  constructor() {
    super();
    this.store = new User();
  }

  handleChange = (name, value) => {
    this.store[name] = value;
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    this.store.save();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Sign up</h1>
          <Input type="text" value={this.store.name} onChange={this.handleChange.bind(this, 'name')} required label="Name" />
          <Input type="email" value={this.store.email} onChange={this.handleChange.bind(this, 'email')} required label="Email" />
          <Input type="text" value={this.store.password} onChange={this.handleChange.bind(this, 'password')} required label="Password" />
          <Button label="Sign Up" primary raised />
        </form>
      </div>
    );
  }
}
