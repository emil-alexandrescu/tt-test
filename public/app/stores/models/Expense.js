import { observable, action } from 'mobx';
import moment from 'moment';
import ExpenseService from '../../services/ExpenseService';
import NotificationStore from '../Notification';
import history from '../../history';

const expenseService = new ExpenseService();

export default class Expense {
  @observable id;
  @observable amount;
  @observable description;
  @observable comment;
  @observable dateTime;
  @observable userId;

  @action save() {
    if (this.id) {
      const expenseData = {
        amount: this.amount,
        description: this.description,
        comment: this.comment,
        dateTime: moment(this.dateTime).format()
      };

      expenseService.update(this.id, expenseData).then(() => {
        NotificationStore.showConfirmation('Expense data updated!');
      });
    } else {
      expenseService.create({
        amount: this.amount,
        description: this.description,
        comment: this.comment,
        dateTime: moment(this.dateTime).format()
      }).then((expenseData) => {
        this.id = expenseData.id;
        NotificationStore.showConfirmation('Expense created!');
        history.replace(`/expenses/${this.id}`);
      });
    }
  }

  @action load(id) {
    expenseService.get(id).then((expenseData) => {
      this.id = expenseData.id;
      this.amount = expenseData.amount;
      this.comment = expenseData.comment;
      this.description = expenseData.description;
      this.userId = expenseData.userId;
      this.dateTime = moment(expenseData.dateTime).toDate();
      NotificationStore.showConfirmation('Expense data loaded!');
    });
  }
}
