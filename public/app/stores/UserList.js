import { observable, action } from 'mobx';

import NotificationStore from './Notification';
import UserService from '../services/UserService';

const userService = new UserService();

class UserList {
  @observable users = [];

  @action load = () => {
    userService.list()
    .then((data) => {
      this.users = data;
      NotificationStore.showConfirmation('User list loaded');
    });
  }

  @action delete = (id) => {
    userService.delete(id)
    .then(() => {
      NotificationStore.showConfirmation('User deleted');
      this.load();
    });
  }
}

const store = new UserList();

export default store;
