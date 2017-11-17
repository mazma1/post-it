import express from 'express';
import GroupController from '../controllers/GroupController';
import tokenAuth from '../middlewares/tokenAuth';
import verifyMembership from '../middlewares/verifyMembership';
import verifyUserId from '../middlewares/verifyUserId';

const router = express.Router();

router.post(
  '/api/v1/groups',
  tokenAuth,
  GroupController.createGroup
);

router.post(
  '/api/v1/groups/:groupId/user',
  tokenAuth,
  verifyMembership,
  GroupController.addUserToGroup
);

router.post(
  '/api/v1/groups/:groupId/message',
  tokenAuth,
  verifyMembership,
  GroupController.postMessageToGroup
);

router.get(
  '/api/v1/groups/:groupId/messages',
  tokenAuth,
  verifyMembership,
  GroupController.getGroupMessages
);

router.get(
  '/api/v1/groups/:groupId/members',
  tokenAuth,
  verifyMembership,
  GroupController.getGroupMembers
);

router.delete(
  '/api/v1/groups/:groupId/users/:userId',
  tokenAuth,
  verifyUserId,
  verifyMembership,
  GroupController.removeUser
);

export default router;
