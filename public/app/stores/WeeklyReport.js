import { observable, action } from 'mobx';

import NotificationStore from './Notification';
import ExpenseService from '../services/ExpenseService';

const expenseService = new ExpenseService();

class WeeklyReport {
  @observable records = [];

  @action load = () => {
    expenseService.getWeeklyReport()
    .then((data) => {
      this.records = data;
      NotificationStore.showConfirmation('Weekly report loaded');
    });
  }
}

const store = new WeeklyReport();

export default store;
