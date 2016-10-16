import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Input, Button, Dropdown } from 'react-toolbox';

import history from '../../history';
import User from '../../stores/models/User';
import CurrentUserStore from '../../stores/CurrentUser';

@observer
export default class UserEditPage extends Component {
  constructor() {
    super();
    this.store = new User();
  }

  componentWillMount() {
    this.store.load(this.props.params.userId);
  }

  goToList = (evt) => {
    evt.preventDefault();
    history.replace(CurrentUserStore.role === 'USER' ? '/expenses' : '/users');
  }

  handleChange = (name, value) => {
    this.store[name] = value;
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    this.store.save();
  }

  render() {
    const roles = this.store.roles.map(role => ({ value: role, label: role }));
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Edit User</h1>
          <Input type="text" value={this.store.name} onChange={this.handleChange.bind(this, 'name')} required label="Name" />
          <Input type="email" value={this.store.email} onChange={this.handleChange.bind(this, 'email')} required label="Email" />
          <Input type="text" value={this.store.password} onChange={this.handleChange.bind(this, 'password')} label="Password" />
          {
            (CurrentUserStore.role === 'ADMIN') ?
            (<Dropdown source={roles} value={this.store.role} onChange={this.handleChange.bind(this, 'role')} required label="Role" />) : null
          }
          <Button label="Update" primary raised />
          <Button label="Cancel" raised onClick={this.goToList} />
        </form>
      </div>
    );
  }
}
