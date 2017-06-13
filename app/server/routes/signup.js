const express = require('express');
const userController = require('../controllers').userController;

const router = express.Router();

/* POST user details - create new user. */
router.post('/api/user/signup', userController.signup);

module.exports = router;
