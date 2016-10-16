import errorHandler from '../util/errorHandler';
import BaseAPIController from './BaseAPIController';

export default class UserController extends BaseAPIController {
  /**
   * @method create
   * @param {Request} req
   * @param {Response} res
   */
  create = (req, res) => {
    const user = this._db.User.build(req.body);
    user.password = this._db.User.encryptPassword(user.password);

    this._db.User.find({
      where: { email: user.email }
    }).then((result) => {
      if (result) {
        return res.status(400).send({
          message: 'Email address is already in use.'
        });
      }

      return user.save();
    }).then(() => {
      delete user.password;
      res.json(user);
    }).catch(err => res.status(400).send(errorHandler(err)));
  }

  /**
   * @method get
   * @param {Request} req
   * @param {Response} res
   */
  get = (req, res) => {
    res.json(req.profile);
  }

  /**
   * @method list
   * @param {Request} req
   * @param {Response} res
   */
  list = (req, res) => {
    this._db.User.findAll().then((users) => {
      res.send(users);
    }).catch(err => res.status(400).send(errorHandler(err)));
  }

  /**
   * @method update
   * @param {Request} req
   * @param {Response} res
   */
  update = (req, res) => {
    const user = req.profile;
    let password = user.password;
    if (req.body.password && req.body.password !== '') {
      password = this._db.User.encryptPassword(req.body.password);
    }

    Object.assign(user, req.body, { password });

    user.save().then(() => {
      res.json(user);
    }).catch(err => res.status(400).send(errorHandler(err)));
  }

  /**
   * @method delete
   * @param {Request} req
   * @param {Response} res
   */
  delete = (req, res) => {
    const user = req.profile;

    if (req.profile.id === req.user.id) {
      res.status(400).send({
        message: 'You can not delete yourself'
      });
      return;
    }

    this._db.Expense.destroy({
      where: { userId: req.profile.id }
    }).then(() => {
      user.destroy();
    }).then(() => {
      res.send({ status: 'SUCCESS' });
    }).catch(err => res.status(400).send(errorHandler(err)));
  }

  /**
   * Middleware to get user instance by id
   * @method getByID
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   * @param {number} id
   */
  getByID = (req, res, next, id) => {
    return this._db.User.findById(id).then((user) => {
      if (!user) {
        return next(new Error(`Failed to load user ${id}`));
      }

      if (req.user.role !== 'MANAGER' && req.user.role !== 'ADMIN' && req.user.id !== user.id) {
        return res.status(403).send({
          message: 'You are not authorized'
        });
      }

      if (req.user.role === 'MANAGER' && user.role === 'ADMIN') {
        return res.status(403).send({
          message: 'You are not authorized'
        });
      }

      req.profile = user; // eslint-disable-line
      return next();
    }).catch(err => next(err));
  }
}
