const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/* Sign up router - create new user. */
// router.post('/api/user/signup', userController.signup);
router.route('/api/user/signup').post(userController.signup);
router.route('/api/user/login').post(userController.login);

module.exports = router;
