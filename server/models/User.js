import md5 from 'md5';

export default function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: 3,
          msg: 'Name must be at least 3 characters'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING
    },
    role: DataTypes.STRING(32)
  }, {
    classMethods: {
      encryptPassword: password => md5(password)
    },
    instanceMethods: {
      authenticate(password) {
        return md5(password) === this.password;
      },
      is: type => (this.role === type)
    },
    associate: (models) => {
      User.hasMany(models.Expense, { foreignKey: 'userId' });
    },
    tableName: 'users',
    timestamps: false
  });

  return User;
}
