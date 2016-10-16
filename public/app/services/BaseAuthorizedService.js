import request from 'superagent';
import CurrentUserStore from '../stores/CurrentUser';
import NotificationStore from '../stores/Notification';
import history from '../history';

export default class BaseAuthorizedService {
  _checkError(err) {
    const {
      response: {
        body,
        status
      }
    } = err;

    NotificationStore.showError(body.error || body.message || 'Unknown Error');
    if (status === 401 || status === 403) {
      history.replace('/login');
    }
  }

  _get(apiUrl) {
    return new Promise((resolve, reject) => {
      request
      .get(apiUrl)
      .set('Authorization', `Bearer ${CurrentUserStore.token}`)
      .then((resp) => {
        resolve(resp.body);
      })
      .catch((err) => {
        this._checkError(err);
        reject(err);
      });
    });
  }

  _post(apiUrl, data) {
    return new Promise((resolve, reject) => {
      request
      .post(apiUrl)
      .set('Authorization', `Bearer ${CurrentUserStore.token}`)
      .send(data)
      .then((resp) => {
        resolve(resp.body);
      })
      .catch((err) => {
        this._checkError(err);
        reject(err);
      });
    });
  }

  _put(apiUrl, data) {
    return new Promise((resolve, reject) => {
      request
      .put(apiUrl)
      .set('Authorization', `Bearer ${CurrentUserStore.token}`)
      .send(data)
      .then((resp) => {
        resolve(resp.body);
      })
      .catch((err) => {
        this._checkError(err);
        reject(err);
      });
    });
  }

  _delete(apiUrl) {
    return new Promise((resolve, reject) => {
      request
      .delete(apiUrl)
      .set('Authorization', `Bearer ${CurrentUserStore.token}`)
      .then((resp) => {
        resolve(resp.body);
      })
      .catch((err) => {
        this._checkError(err);
        reject(err);
      });
    });
  }
}
