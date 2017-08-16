import express from 'express';
import userController from '../controllers/userController';
import tokenAuth from '../middlewares/tokenAuth';

const router = express.Router();

router.post('/api/user/signup', userController.signup);
router.post('/api/user/signin', userController.signin);
router.get('/api/user/:user_id/groups', tokenAuth, userController.getUserGroups);
router.route('/api/user/reset_password').post(userController.sendResetPasswordLink);
router.route('/api/user/newpassword').post(userController.validateResetPasswordToken);
router.route('/api/user/updatepassword/:token').post(userController.updateUserPassword);

export default router;
