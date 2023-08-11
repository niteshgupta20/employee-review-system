const User = require('../models/user');

module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.role == 'Admin') {
      return res.redirect('/user/admin/home');
    } else {
      res.redirect('/user/employee/home');
    }
  }
  return res.render('sign-in', {
    title: 'Sign In',
  });
};

module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    if (req.user.role == 'Admin') {
      return res.redirect('/user/admin/home');
    } else {
      return res.redirect('/user/employee/home');
    }
  }
  return res.render('sign-up', {
    title: 'Sign Up',
  });
};

module.exports.createUser = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      req.flash('error', 'Password and Confirm Password not Same');
      return res.redirect('back');
    }

    let user = await User.findOne({ email: req.body.email });
    if (user) {
      req.flash('error', 'User already exists in DB');
      return res.redirect('back');
    } else {
      user = await User.create(req.body);
      req.flash('success', 'User Signed Up Successfully');
      return res.redirect('/user/sign-in');
    }
  } catch (err) {
    console.log('Error in createUser controller', err);
    return;
  }
};

module.exports.loginUser = function (req, res) {
  req.flash('success', 'Logged In Successfully');
  if (req.user.role == 'Admin') {
    return res.redirect('/user/admin/home');
  } else {
    res.redirect('/user/employee/home');
  }
};

module.exports.signOut = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      req.flash('error', 'User could not be Signed Out');
      return res.redirect('back');
    }
    req.flash('success', 'You have Logged Out');
    return res.redirect('/user/sign-in');
  });
};
