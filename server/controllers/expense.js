import db from '../sequelize';
import errorHandler from '../util/errorHandler';

export default class ExpenseController {
  /**
   * @method create
   * @param {Request} req
   * @param {Response} res
   */
  create(req, res) {
    const expense = db.Expense.build(req.body);
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
  list(req, res) {
    const conditions = {};
    if (!req.user.is('ADMIN')) {
      Object.assign(conditions, { userId: req.user.id });
    }

    db.Expense.findAll({ where: conditions }).then((expenses) => {
      res.send(expenses);
    }).catch(err => res.status(400).send(errorHandler(err)));
  }

  /**
   * @method update
   * @param {Request} req
   * @param {Response} res
   */
  update(req, res) {
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
  delete(req, res) {
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
  getWeeklyReport(req, res) {
    const conditions = {};

    if (!req.user.is('ADMIN')) {
      Object.assign(conditions, { userId: req.user.id });
    }

    db.Expense.findAll({
      where: conditions,
      attributes: [
        [db.sequelize.fn('SUM', db.sequelize.col('amount')), 'total'],
        [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'count'],
        [db.sequelize.fn('DATE_FORMAT', db.sequelize.col('dateTime'), '%Y-%U'), 'week']],
      group: ['week'],
      order: [['week', 'asc']]
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
  getByID(req, res, next, id) {
    db.Expense.findById(id).then((expense) => {
      if (!expense) {
        return next(new Error(`Failed to load expense ${id}`));
      }

      // only ADMIN can access every record
      if (!req.user.is('ADMIN') && req.user.id !== expense.id) {
        return res.status(403).send({
          message: 'You are not authorized'
        });
      }

      req.expense = expense; // eslint-disable-line
      return next();
    }).catch(err => next(err));
  }
}
