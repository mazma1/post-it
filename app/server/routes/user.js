import express from 'express';
import UserController from '../controllers/UserController';
import tokenAuth from '../middlewares/tokenAuth';
import verifyUserId from '../middlewares/verifyUserId';

const router = express.Router();

router.get('/api/v1', (req, res) => {
  res.status(200).send({
    message: 'Welcome to Post It API',
    docs: 'https://postiit.docs.apiary.io/'
  });
});

router.post(
  '/api/v1/users/signup',
  UserController.signup
);

router.post(
  '/api/v1/users/signin',
  UserController.signin
);

router.post(
  '/api/v1/users/google-auth',
  UserController.googleSignIn
);

router.post(
  '/api/v1/users/verify-user',
  UserController.verifyGoogleUser
);

router.post(
  '/api/v1/users/reset-password',
  UserController.sendResetPasswordLink
);

router.post(
  '/api/v1/users/new-password',
  UserController.validateResetPasswordToken
);

router.patch(
  '/api/v1/users/update-password/:token',
  UserController.updateUserPassword
);

router.get(
  '/api/v1/users/:userId/groups',
  tokenAuth,
  verifyUserId,
  UserController.getUserGroups
);

router.get(
  '/api/v1/users/search',
  tokenAuth,
  UserController.searchForUser
);

export default router;
