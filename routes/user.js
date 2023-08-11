const express = require('express');
const passport = require('passport');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.post('/sign-up', userController.createUser);
router.post(
  '/sign-in',
  passport.authenticate('local', { failureRedirect: '/user/sign-in' }),
  userController.loginUser
);
router.get('/sign-out', userController.signOut);

router.use('/admin', require('./admin'));
router.use('/employee', require('./employee'));

module.exports = router;
