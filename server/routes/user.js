import AuthController from '../controllers/auth';
import UserController from '../controllers/user';

export default function (app) {
  const auth = new AuthController();
  const user = new UserController();

  app.route('/users')
    .get(auth.hasAuthorization('MANAGER'), user.list)
    .post(user.create);

  app.route('/users/:userId')
    .get(auth.requiresLogin, user.get)
    .put(auth.requiresLogin, user.update)
    .delete(auth.hasAuthorization('MANAGER'), user.delete);

  app.param('userId', user.getByID);
}
