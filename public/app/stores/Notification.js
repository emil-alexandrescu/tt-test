import { observable, action } from 'mobx';

class Notification {
  @observable message;
  @observable type = 'cancel';
  @observable active = false;

  @action
  showConfirmation = (message: string) => {
    this.message = message;
    this.type = 'accept';
    this.active = true;
  }

  @action
  showError = (message: string) => {
    this.message = message;
    this.type = 'cancel';
    this.active = true;
  }

  @action
  hideNotification = () => {
    this.active = false;
  }
}

const store = new Notification();
export default store;
