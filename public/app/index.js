import React, { Component } from 'react';
import { Router, Route, IndexRedirect } from 'react-router';

import localforage from './localforage';
import history from './history';
import CurrentUserStore from './stores/CurrentUser';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './components/login';
import SignupPage from './components/login/signup';
import UsersPage from './components/users';
import UserCreatePage from './components/users/create';
import UserEditPage from './components/users/edit';
import ExpensesPage from './components/expenses';
import ExpenseCreatePage from './components/expenses/create';
import ExpenseEditPage from './components/expenses/edit';
import WeeklyReportPage from './components/expenses/weeklyReport';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      storageLoaded: false
    };
  }

  componentWillMount() {
    localforage.load('currentUser').then((data) => {
      Object.assign(CurrentUserStore, data);
      this.setState({
        storageLoaded: true
      });
    });
  }

  render() {
    if (!this.state.storageLoaded) return null;

    return (
      <Router history={history}>
        <Route path="/" component={MainLayout}>
          <IndexRedirect to="/login" />
          <Route path="login" component={LoginPage} />
          <Route path="signup" component={SignupPage} />
          <Route path="users" component={UsersPage} />
          <Route path="users/create/" component={UserCreatePage} />
          <Route path="users/:userId" component={UserEditPage} />
          <Route path="expenses" component={ExpensesPage} />
          <Route path="expenses/create" component={ExpenseCreatePage} />
          <Route path="expenses-report" component={WeeklyReportPage} />
          <Route path="expenses/:expenseId" component={ExpenseEditPage} />
        </Route>
      </Router>
    );
  }
}
