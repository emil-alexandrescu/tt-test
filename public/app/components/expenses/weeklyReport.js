import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Table } from 'react-toolbox';

import WeeklyReportStore from '../../stores/WeeklyReport';

const ExpenseWeeklyModel = {
  week: { type: String },
  total: { type: Number },
  avg: { type: Number, title: 'Average day spending' }
};

@observer
export default class ExpensesList extends Component {
  state = {
    active: false
  };

  componentWillMount() {
    WeeklyReportStore.load();
  }

  render() {
    return (
      <div>
        <h3>Weekly Report</h3>
        <Table
          model={ExpenseWeeklyModel}
          selectable={false}
          source={WeeklyReportStore.records.map(record => ({
            ...record,
            total: `$${record.total}`,
            avg: `$${(record.total / 7).toFixed(2)}`
          }))}
        />
      </div>
    );
  }
}
