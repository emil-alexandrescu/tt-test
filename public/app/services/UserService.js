import BaseAuthorizedService from './BaseAuthorizedService';

export default class UserService extends BaseAuthorizedService {
  create(data) {
    return this._post('/users', data);
  }

  get(id) {
    return this._get(`/users/${id}`);
  }

  delete(id) {
    return this._delete(`/users/${id}`);
  }

  update(id, data) {
    return this._put(`/users/${id}`, data);
  }

  list() {
    return this._get('/users');
  }
}
