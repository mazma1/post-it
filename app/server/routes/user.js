import express from 'express';
import userController from '../controllers/user';
import tokenAuth from '../middlewares/tokenAuth';

const router = express.Router();

router.post('/api/v1/users/signup', userController.signup);
router.post('/api/v1/users/signin', userController.signin);
router.post('/api/v1/users/googleAuth', userController.googleSignIn);
router.post('/api/v1/users/resetpassword', userController.sendResetPasswordLink);
router.post('/api/v1/users/newpassword', userController.validateResetPasswordToken);
router.patch('/api/v1/users/updatepassword/:token', userController.updateUserPassword);
router.get('/api/v1/users/:user_id/groups', tokenAuth, userController.getUserGroups);
router.get('/api/v1/users/search', tokenAuth, userController.searchForUser);
router.get('/api/v1/users/verifytoken', tokenAuth);

export default router;
