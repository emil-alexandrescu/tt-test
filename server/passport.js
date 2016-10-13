import passport from 'passport';
import glob from 'glob';
import path from 'path';
import chalk from 'chalk';
import db from './sequelize';

export default function () {
  // serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // deserialize sessions
  passport.deserializeUser((id, done) => {
    db.User.findOne({
      where: { id }
    })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
  });

  // initialize strategies
  glob('./strategies/*.js', { cwd: path.resolve('./server') }, (err, strategies) => {
    if (err) {
      console.log(chalk.red('Error occured including strategies'));
      return;
    }

    strategies.forEach((strategyPath) => {
      require(strategyPath).default(); // eslint-disable-line
    });
    console.log(chalk.green(`included ${strategies.length} strategy files`));
  });
}
