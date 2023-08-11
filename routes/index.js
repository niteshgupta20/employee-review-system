const express = require('express');
const router = express.Router();
const homeController = require('../controllers/');

router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/review', require('./review'));

module.exports = router;
