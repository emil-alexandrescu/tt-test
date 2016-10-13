import passport from 'passport';
import PassportLocal from 'passport-local';
import db from '../sequelize';

const LocalStrategy = PassportLocal.Strategy;

export default function () {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, done) => {
    db.User.findOne({
      where: {
        email
      }
    }).then((user) => {
      if (!user) {
        return done(null, false, {
          message: 'Unknown user'
        });
      }
      if (!user.authenticate(password)) {
        return done(null, false, {
          message: 'Invalid password'
        });
      }

      return done(null, user.toJSON());
    })
    .catch((err) => {
      done(err);
    });
  }));
}
