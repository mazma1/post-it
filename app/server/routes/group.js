import express from 'express';
import groupController from '../controllers/group';
import tokenAuth from '../middlewares/tokenAuth';
import { verifyGroupId } from '../middlewares/verifyId';
import verifyMembership from '../middlewares/verifyMembership';

const router = express.Router();

router.post(
  '/api/v1/groups',
  tokenAuth,
  groupController.createGroup
);

router.post(
  '/api/v1/groups/:groupId/user',
  tokenAuth,
  verifyGroupId,
  verifyMembership,
  groupController.addUserToGroup
);

router.post(
  '/api/v1/groups/:groupId/message',
  tokenAuth,
  verifyGroupId,
  verifyMembership,
  groupController.postMessageToGroup
);

router.get(
  '/api/v1/groups/:groupId/messages',
  tokenAuth,
  verifyGroupId,
  verifyMembership,
  groupController.getGroupMessages
);

router.get(
  '/api/v1/groups/:groupId/members',
  tokenAuth,
  verifyGroupId,
  verifyMembership,
  groupController.getGroupMembers
);

export default router;
