export default function (sequelize, DataTypes) {
  const Expense = sequelize.define('Expense', {
    description: DataTypes.STRING,
    comment: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    dateTime: DataTypes.DATE
  }, {
    associate: (models) => {
      Expense.belongsTo(models.User, { foreignKey: 'userId' });
    },
    tableName: 'expenses',
    timestamps: false
  });

  return Expense;
}
