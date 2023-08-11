const passport = require('passport');

const localStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(
  new localStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    async function (req, email, password, done) {
      try {
        const user = await User.findOne({ email: email });
        if (!user || user.password != password) {
          req.flash('error', 'Invalid Email/Password');
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        console.log('*** Error in passport Middleware ***', err);
        done(err, false);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (err) {
    console.log('*** Error in deserializeUser ***', err);
    done(err, false);
  }
});

passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect('/user/sign-in');
};

passport.checkAdminAuthentication = function (req, res, next) {
  if (req.isAuthenticated() && req.user.role == 'Admin') {
    return next();
  }
  return res.redirect('/user/sign-in');
};

passport.checkEmployeeAuthentication = function (req, res, next) {
  if (req.isAuthenticated() && req.user.role == 'Employee') {
    return next();
  }
  return res.redirect('/user/sign-in');
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

module.exports = passport;
