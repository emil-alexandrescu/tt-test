import { observable, action, observe } from 'mobx';

import localforage from '../localforage';
import history from '../history';
import NotificationStore from './Notification';
import AuthService from '../services/AuthService';
import User from './models/User';

const authService = new AuthService();

class CurrentUser extends User {
  @observable token;
  @observable isLoggedIn = false;

  @action signin = (authData) => {
    authService.signin(authData)
    .then((resp: any) => {
      const newData = Object.assign({}, resp.body, { isLoggedIn: true });
      Object.assign(this, newData);

      NotificationStore.showConfirmation('You are logged in');
      if (newData.role === 'USER') {
        history.replace('/expenses');
      } else {
        history.replace('/users');
      }
    })
    .catch((err: any) => {
      let message: string = 'Unknown Error';
      if (err && err.response && err.response.body.message) {
        message = err.response.body.message;
      }

      NotificationStore.showError(message);
    });
  }

  @action signout = () => {
    authService.signout()
    .then(() => {
      this.isLoggedIn = false;
      this.token = '';
      this.email = '';
      this.name = '';
      NotificationStore.showConfirmation('You are logged out');
      history.replace('/login');
    })
    .catch(() => {
      NotificationStore.showError('There was some problem logging out');
    });
  }
}

const store = new CurrentUser();

// observe current user data and sync with storage
observe(store, (change) => {
  const {
    token,
    isLoggedIn,
    id,
    email,
    name,
    role
  } = change.object;

  const data = {
    token,
    isLoggedIn,
    id,
    email,
    name,
    role
  };

  localforage.store('currentUser', data);
});

export default store;
