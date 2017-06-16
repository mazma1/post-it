const express = require('express');
const groupController = require('../controllers/groupController');
const tokenAuth = require('../middlewares/tokenAuth.js');

const router = express.Router();

router.route('/api/group').post(tokenAuth, groupController.createGroup);
router.route('/api/group/:group_id/user').post(tokenAuth, groupController.addUserToGroup);
router.route('/api/group/:group_id/message').post(tokenAuth, groupController.postMessageToGroup);
router.route('/api/group/:group_id/messages').get(tokenAuth, groupController.getGroupMessages);

module.exports = router;
