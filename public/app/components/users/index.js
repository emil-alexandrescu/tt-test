import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Table, Dialog } from 'react-toolbox';

import history from '../../history';
import UserListStore from '../../stores/UserList';

const UserModel = {
  id: { type: Number },
  name: { type: String },
  email: { type: String },
  role: { type: String },
  action: { type: String }
};

@observer
export default class UsersList extends Component {
  state = {
    active: false
  };

  componentWillMount() {
    UserListStore.load();
  }

  onCreate() {
    history.replace('/users/create/');
  }

  onEdit(id) {
    history.replace(`/users/${id}`);
  }

  onDelete(id) {
    this.handleToggle();
    this.currentId = id;
  }

  deleteUser = () => {
    UserListStore.delete(this.currentId);
    this.handleToggle();
  }

  handleToggle = () => {
    this.setState({ active: !this.state.active });
  }

  actions = [
    { label: 'Cancel', onClick: this.handleToggle },
    { label: 'Delete', onClick: this.deleteUser }
  ];

  render() {
    return (
      <div>
        <Table
          model={UserModel}
          selectable={false}
          source={UserListStore.users.map(user => ({
            ...user,
            action: (
              <span>
                <Button label="Edit" raised floating mini onClick={this.onEdit.bind(this, user.id)} />
                <Button label="Delete" raised accent floating mini onClick={this.onDelete.bind(this, user.id)} />
              </span>
            )
          }))}
        />
        <Button raised primary label="Add User" onClick={this.onCreate} />
        <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          title="Notification"
        >
          <p>Are you sure you want to delete this user?</p>
        </Dialog>
      </div>
    );
  }
}
