import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Input, Button, DatePicker, TimePicker, Checkbox } from 'react-toolbox';

import ExpenseListStore from '../../stores/ExpenseList';

@observer
export default class ExpensesList extends Component {
  state = {
    description: '',
    amountStart: '',
    amountEnd: ''
  }

  handleChange = (name, value) => {
    this.setState({
      ...this.state,
      [name]: value
    });
  }

  applyFilter = () => {
    ExpenseListStore.setFilter(this.state);
  }

  resetFilter = () => {
    this.setState({
      description: '',
      amountStart: '',
      amountEnd: '',
      startDate: undefined,
      endDate: undefined
    });
    ExpenseListStore.setFilter({
      description: '',
      amountStart: '',
      amountEnd: '',
      startDate: undefined,
      endDate: undefined
    });
  }

  render() {
    return (
      <div>
        <h3>Expense Filter</h3>
        <Checkbox checked={this.state.showFilter} label="Show/Hide Filters" onChange={this.handleChange.bind(this, 'showFilter')} />
        <div style={{ display: this.state.showFilter ? 'block' : 'none' }}>
          <Input type="text" value={this.state.description} onChange={this.handleChange.bind(this, 'description')} label="Description" />
          <Input type="number" value={this.state.amountStart} onChange={this.handleChange.bind(this, 'amountStart')} label="Amount Start" />
          <Input type="number" value={this.state.amountEnd} onChange={this.handleChange.bind(this, 'amountEnd')} label="Amount End" />
          <DatePicker label="Start Date" sundayFirstDayOfWeek value={this.state.startDate} required onChange={this.handleChange.bind(this, 'startDate')} />
          <TimePicker format="ampm" label="Start Time" value={this.state.startDate} required onChange={this.handleChange.bind(this, 'startDate')} />
          <DatePicker label="End Date" sundayFirstDayOfWeek value={this.state.endDate} required onChange={this.handleChange.bind(this, 'endDate')} />
          <TimePicker format="ampm" label="End Time" value={this.state.endDate} required onChange={this.handleChange.bind(this, 'endDate')} />
          <Button label="Apply" primary raised onClick={this.applyFilter} />
          <Button label="Reset" raised onClick={this.resetFilter} />
        </div>
      </div>
    );
  }
}
