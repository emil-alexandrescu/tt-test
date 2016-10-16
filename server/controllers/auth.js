import passport from 'passport';
import chalk from 'chalk';
import jwt from 'jsonwebtoken';
import config from '../config';

export default class AuthController {
  signin(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err || !user) {
        console.log(chalk.red(err, JSON.stringify(info)));
        res.status(400).json(err || info);
      } else {
        req.login(user, (err1) => {
          if (err1) {
            console.log(chalk.red(err1));
            res.status(400).send(err1);
          } else {
            // signs a token
            const token = jwt.sign(user, config.jwt.secret);
            const {
              password, // eslint-disable-line
              ...userData
            } = user;
            res.json({
              ...userData,
              token
            });
          }
        });
      }
    })(req, res, next);
  }

  signout(req, res) {
    req.logout();
    res.json({ status: 'Success' });
  }

  // middleware for logged in users
  requiresLogin(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).send({
        error: 'User is not logged in'
      });
    }
  }

  hasAuthorization(role) {
    return (req, res, next) => {
      this.requiresLogin(req, res, () => {
        console.log(req.user.role);
        if (req.user.role === role || req.user.role === 'ADMIN') {
          return next();
        }
        return res.status(403).send({
          message: 'User is not authorized'
        });
      });
    };
  }
}
