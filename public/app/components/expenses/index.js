import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Button, Table, Dialog } from 'react-toolbox';
import moment from 'moment';

import history from '../../history';
import ExpenseFilter from './ExpenseFilter';
import ExpenseListStore from '../../stores/ExpenseList';

const ExpenseModel = {
  id: { type: Number },
  description: { type: String },
  amount: { type: Number },
  dateTime: { type: String },
  comment: { type: String },
  user: { type: String },
  action: { type: String }
};

@observer
export default class ExpensesList extends Component {
  state = {
    active: false
  };

  componentWillMount() {
    ExpenseListStore.load();
  }

  onCreate() {
    history.replace('/expenses/create');
  }

  onEdit(id) {
    history.replace(`/expenses/${id}`);
  }

  onDelete(id) {
    this.handleToggle();
    this.currentId = id;
  }

  deleteExpense = () => {
    ExpenseListStore.delete(this.currentId);
    this.handleToggle();
  }

  handleToggle = () => {
    this.setState({ active: !this.state.active });
  }

  actions = [
    { label: 'Cancel', onClick: this.handleToggle },
    { label: 'Delete', onClick: this.deleteExpense }
  ];

  render() {
    return (
      <div>
        <ExpenseFilter />
        <br /><br />
        <h3>Content</h3>
        <Table
          model={ExpenseModel}
          selectable={false}
          source={ExpenseListStore.data.map(expense => ({
            ...expense,
            dateTime: moment(expense.dateTime).format('LLL'),
            user: expense.User.name,
            amount: `$${expense.amount}`,
            action: (
              <span>
                <Button label="Edit" raised floating mini onClick={this.onEdit.bind(this, expense.id)} />
                <Button label="Delete" raised accent floating mini onClick={this.onDelete.bind(this, expense.id)} />
              </span>
            )
          }))}
        />
        <Button raised primary label="Add Expense" onClick={this.onCreate} />
        <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          title="Notification"
        >
          <p>Are you sure you want to delete this expense?</p>
        </Dialog>
      </div>
    );
  }
}
