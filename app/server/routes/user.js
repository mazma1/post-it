const express = require('express');
const userController = require('../controllers/userController');
const tokenAuth = require('../middlewares/tokenAuth.js');

const router = express.Router();

/* Sign up router - create new user. */
// router.post('/api/user/signup', userController.signup);
router.route('/api/user/signup').post(userController.signup);
router.route('/api/user/signin').post(userController.signin);
router.route('/api/group').post(tokenAuth, userController.group);
router.route('/api/group/:group_id/user').post(tokenAuth, userController.addUserToGroup);
router.route('/api/group/:group_id/message').post(tokenAuth, userController.postMessageToGroup);
router.route('/api/group/:group_id/messages').get(tokenAuth, userController.getGroupMessages);

module.exports = router;
