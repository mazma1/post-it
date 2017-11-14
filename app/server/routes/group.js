import express from 'express';
import GroupController from '../controllers/GroupController';
import tokenAuth from '../middlewares/tokenAuth';
import { verifyGroupId } from '../middlewares/verifyId';
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
  verifyGroupId,
  verifyMembership,
  GroupController.addUserToGroup
);

router.post(
  '/api/v1/groups/:groupId/message',
  tokenAuth,
  verifyGroupId,
  verifyMembership,
  GroupController.postMessageToGroup
);

router.get(
  '/api/v1/groups/:groupId/messages',
  tokenAuth,
  verifyGroupId,
  verifyMembership,
  GroupController.getGroupMessages
);

router.get(
  '/api/v1/groups/:groupId/members',
  tokenAuth,
  verifyGroupId,
  verifyMembership,
  GroupController.getGroupMembers
);

export default router;
