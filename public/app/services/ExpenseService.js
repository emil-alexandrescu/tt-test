import BaseAuthorizedService from './BaseAuthorizedService';

export default class ExpenseService extends BaseAuthorizedService {
  create(data) {
    return this._post('/expenses', data);
  }

  get(id) {
    return this._get(`/expenses/${id}`);
  }

  delete(id) {
    return this._delete(`/expenses/${id}`);
  }

  update(id, data) {
    return this._put(`/expenses/${id}`, data);
  }

  list() {
    return this._get('/expenses');
  }

  getWeeklyReport() {
    return this._get('/expenses-report');
  }
}
