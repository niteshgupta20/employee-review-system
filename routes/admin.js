const express = require('express');
const passport = require('passport');
const router = express.Router();

const adminController = require('../controllers/adminController');

router.get('/home', passport.checkAuthentication, adminController.home);
router.get(
  '/add-user-form',
  passport.checkAdminAuthentication,
  adminController.addUserForm
);
router.post(
  '/create-user',
  passport.checkAdminAuthentication,
  adminController.createUser
);
router.post(
  '/edit-user-form',
  passport.checkAdminAuthentication,
  adminController.editUserForm
);

router.post(
  '/update-user',
  passport.checkAdminAuthentication,
  adminController.updateUser
);

router.post(
  '/delete-user',
  passport.checkAdminAuthentication,
  adminController.deleteUser
);

router.post(
  '/assign-reviewers-form',
  passport.checkAdminAuthentication,
  adminController.assignReviewersForm
);

router.post(
  '/assign-reviewers',
  passport.checkAdminAuthentication,
  adminController.assignReviewers
);

router.get(
  '/view-reviewers/:user_id',
  passport.checkAdminAuthentication,
  adminController.viewReviewers
);

router.post(
  '/edit-feedback-form',
  passport.checkAdminAuthentication,
  adminController.editFeedbackForm
);

module.exports = router;
