import express from 'express';
import userController from '../controllers/user';
import tokenAuth from '../middlewares/tokenAuth';

const router = express.Router();

router.post('/api/user/signup', userController.signup);
router.post('/api/user/signin', userController.signin);
router.get('/api/user/:user_id/groups', tokenAuth, userController.getUserGroups);
router.post('/api/user/reset_password', userController.sendResetPasswordLink);
router.post('/api/user/newpassword', userController.validateResetPasswordToken);
router.post('/api/user/updatepassword/:token', userController.updateUserPassword);
router.post('/api/user/search', userController.searchForUser);

export default router;
