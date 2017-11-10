import express from 'express';
import userController from '../controllers/user';
import tokenAuth from '../middlewares/tokenAuth';
import { verifyUserId } from '../middlewares/verifyId';

const router = express.Router();

router.post(
  '/api/v1/users/signup',
  userController.signup
);

router.post(
  '/api/v1/users/signin',
  userController.signin
);

router.post(
  '/api/v1/users/google-auth',
  userController.googleSignIn
);

router.post(
  '/api/v1/users/verify-user',
  userController.verifyGoogleUser
);

router.post(
  '/api/v1/users/reset-password',
  userController.sendResetPasswordLink
);

router.post(
  '/api/v1/users/new-password',
  userController.validateResetPasswordToken
);

router.patch(
  '/api/v1/users/update-password/:token',
  userController.updateUserPassword
);

router.get(
  '/api/v1/users/:userId/groups',
  tokenAuth,
  verifyUserId,
  userController.getUserGroups
);

router.get(
  '/api/v1/users/search',
  tokenAuth,
  userController.searchForUser
);

export default router;
