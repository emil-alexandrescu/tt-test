import { observable, action } from 'mobx';

class Layout {
  @observable drawerActive = false;
  @observable drawerPinned = false;

  @action
  toggleDrawerActive = () => {
    this.drawerActive = !this.drawerActive;
  }

  @action
  toggleDrawerPinned = () => {
    this.drawerPinned = !this.drawerPinned;
  }
}

const store = new Layout();

export default store;
