import request from 'superagent';

export default class AuthService {
  signin(data) {
    return request.post('/auth/signin')
      .send(data);
  }

  signout() {
    return request.get('/auth/signout');
  }
}
