import { observable, action } from 'mobx';
import UserService from '../../services/UserService';
import NotificationStore from '../Notification';
import CurrentUserStore from '../CurrentUser';
import history from '../../history';

const userService = new UserService();

export default class User {
  @observable id;
  @observable name;
  @observable password;
  @observable email;
  @observable role = 'USER';

  roles = ['USER', 'MANAGER', 'ADMIN'];

  @action save() {
    if (this.id) {
      const userData = {
        name: this.name,
        email: this.email,
        role: this.role
      };

      if (this.password) {
        Object.assign(userData, { password: this.password });
      }
      userService.update(this.id, userData).then(() => {
        NotificationStore.showConfirmation('User data updated!');
      });
    } else {
      userService.create({
        name: this.name,
        password: this.password,
        email: this.email,
        role: this.role
      }).then((userData) => {
        this.id = userData.id;
        NotificationStore.showConfirmation('User created!');
        if (CurrentUserStore.isLoggedIn) {
          history.replace(`/users/${this.id}`);
        } else {
          history.replace('/login');
        }
      });
    }
  }

  @action load(id) {
    userService.get(id).then((userData) => {
      this.name = userData.name;
      this.id = userData.id;
      this.email = userData.email;
      this.role = userData.role;
      NotificationStore.showConfirmation('User data loaded!');
    });
  }
}
