import errorHandler from '../util/errorHandler';
import BaseAPIController from './BaseAPIController';

export default class ExpenseController extends BaseAPIController {
  /**
   * @method create
   * @param {Request} req
   * @param {Response} res
   */
  create = (req, res) => {
    const expense = this._db.Expense.build(req.body);
    expense.userId = req.user.id;
    expense.save().then(() => {
      res.json(expense);
    }).catch(err => res.status(400).send(errorHandler(err)));
  }

  /**
   * @method get
   * @param {Request} req
   * @param {Response} res
   */
  get(req, res) {
    res.json(req.expense);
  }

  /**
   * @method list
   * @param {Request} req
   * @param {Response} res
   */
  list = (req, res) => {
    const conditions = {};
    if (req.user.role !== 'ADMIN') {
      Object.assign(conditions, { userId: req.user.id });
    }

    this._db.Expense.findAll({
      where: conditions,
      include: [{
        model: this._db.User,
        attributes: ['name']
      }]
    }).then((expenses) => {
      res.send(expenses);
    }).catch(err => res.status(400).send(errorHandler(err)));
  }

  /**
   * @method update
   * @param {Request} req
   * @param {Response} res
   */
  update = (req, res) => {
    const expense = req.expense;
    Object.assign(expense, req.body);

    expense.save().then(() => {
      res.json(expense);
    }).catch(err => res.status(400).send(errorHandler(err)));
  }

  /**
   * @method delete
   * @param {Request} req
   * @param {Response} res
   */
  delete = (req, res) => {
    const expense = req.expense;
    expense.destroy().then(() => {
      res.send({ status: 'SUCCESS' });
    }).catch(err => res.status(400).send(errorHandler(err)));
  }

  /**
   * @method getWeeklyReport
   * @param {Request} req
   * @param {Response} res
   */
  getWeeklyReport = (req, res) => {
    const conditions = {};
    const { _db } = this;

    if (req.user.role !== 'ADMIN') {
      Object.assign(conditions, { userId: req.user.id });
    }

    this._db.Expense.findAll({
      where: conditions,
      attributes: [
        [_db.sequelize.fn('SUM', _db.sequelize.col('amount')), 'total'],
        [_db.sequelize.fn('AVG', _db.sequelize.col('amount')), 'avg'],
        [_db.sequelize.fn('DATE_FORMAT', _db.sequelize.col('dateTime'), '%Y, Week %U'), 'week']
      ],
      group: ['week'],
      order: [['dateTime', 'asc']]
    }).then((result) => {
      res.json(result);
    }).catch(err => res.status(400).send(errorHandler(err)));
  }

  /**
   * Middleware to get expense instance by id
   * @method getByID
   * @param {Request} req
   * @param {Response} res
   * @param {Function} next
   * @param {number} id
   */
  getByID = (req, res, next, id) => {
    this._db.Expense.findOne({
      where: { id },
      include: [{
        model: this._db.User,
        attributes: ['name']
      }]
    }).then((expense) => {
      if (!expense) {
        return next(new Error(`Failed to load expense ${id}`));
      }

      // only ADMIN can access every record
      if (req.user.role !== 'ADMIN' && req.user.id !== expense.userId) {
        return res.status(403).send({
          message: 'You are not authorized'
        });
      }

      req.expense = expense; // eslint-disable-line
      return next();
    }).catch(err => res.status(400).send(errorHandler(err)));
  }
}
