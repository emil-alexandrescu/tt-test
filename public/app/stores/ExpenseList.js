import { observable, action, computed } from 'mobx';
import moment from 'moment';
import _ from 'lodash';

import NotificationStore from './Notification';
import ExpenseService from '../services/ExpenseService';


const expenseService = new ExpenseService();

class ExpenseList {
  @observable expenses = [];
  @observable filter = {};

  @action load = () => {
    expenseService.list()
    .then((data) => {
      this.expenses = data;
      NotificationStore.showConfirmation('Expense list loaded');
    });
  }

  @action delete = (id) => {
    expenseService.delete(id)
    .then(() => {
      NotificationStore.showConfirmation('Expense deleted');
      this.load();
    });
  }

  @action setFilter = (filter) => {
    this.filter = Object.assign({}, this.filter, filter);
  }

  @computed get data() {
    const {
      filter
    } = this;
    // filter with filters
    return _.filter(this.expenses, (expense) => {
      if (filter.description && expense.description.indexOf(filter.description) === -1) {
        return false;
      }

      if (filter.amountStart >= 0 && expense.amount < filter.amountStart) {
        return false;
      }

      if (filter.amountEnd > 0 && expense.amount > filter.amountEnd) {
        return false;
      }

      if (filter.startDate && moment(filter.startDate).diff(expense.dateTime) > 0) {
        return false;
      }

      if (filter.endDate && moment(filter.endDate).diff(expense.dateTime) < 0) {
        return false;
      }

      return true;
    });
  }
}

const store = new ExpenseList();

export default store;
