import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Input, Button, DatePicker, TimePicker } from 'react-toolbox';

import history from '../../history';
import Expense from '../../stores/models/Expense';

@observer
export default class ExpenseEditPage extends Component {
  constructor() {
    super();
    this.store = new Expense();
  }

  componentWillMount() {
    this.store.load(this.props.params.expenseId);
  }

  goToList = (evt) => {
    evt.preventDefault();
    history.replace('/expenses');
  }

  handleChange = (name, value) => {
    this.store[name] = value;
  }

  handleSubmit = (evt) => {
    evt.preventDefault();

    this.store.save();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Edit Expense</h1>
          <Input type="text" value={this.store.description} onChange={this.handleChange.bind(this, 'description')} required label="Description" />
          <Input type="number" value={this.store.amount} onChange={this.handleChange.bind(this, 'amount')} required label="Amount" />
          <Input type="text" value={this.store.comment} onChange={this.handleChange.bind(this, 'comment')} label="Comment" />
          <DatePicker label="Date" sundayFirstDayOfWeek value={this.store.dateTime} required onChange={this.handleChange.bind(this, 'dateTime')} />
          <TimePicker format="ampm" label="Time" value={this.store.dateTime} required onChange={this.handleChange.bind(this, 'dateTime')} />
          <Button label="Update" primary raised />
          <Button label="Cancel" raised onClick={this.goToList} />
        </form>
      </div>
    );
  }
}
