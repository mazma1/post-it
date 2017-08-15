const express = require('express');
const userController = require('../controllers/userController');
const tokenAuth = require('../middlewares/tokenAuth.js');

const router = express.Router();

/* Sign up router - create new user. */
// router.post('/api/user/signup', userController.signup);
router.route('/api/user/signup').post(userController.signup);
router.route('/api/user/signin').post(userController.signin);
router.route('/api/user/:user_id/groups').get(tokenAuth, userController.getUserGroups);
router.route('/api/user/reset_password').post(userController.sendResetPasswordLink);

module.exports = router;
