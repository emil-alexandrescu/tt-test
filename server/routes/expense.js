import AuthController from '../controllers/auth';
import ExpenseController from '../controllers/expense';

export default function (app) {
  const auth = new AuthController();
  const expense = new ExpenseController();

  app.route('/expenses')
    .get(auth.requiresLogin, expense.list)
    .post(auth.requiresLogin, expense.create);

  app.route('/expenses/:expenseId')
    .get(auth.requiresLogin, expense.get)
    .put(auth.requiresLogin, expense.update)
    .delete(auth.requiresLogin, expense.delete);

  app.route('/expenses/report')
    .get(auth.requiresLogin, expense.getWeeklyReport);

  app.param('expenseId', expense.getByID);
}
