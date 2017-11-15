import express from 'express';
import GroupController from '../controllers/GroupController';
import tokenAuth from '../middlewares/tokenAuth';
import verifyMembership from '../middlewares/verifyMembership';

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

export default router;
