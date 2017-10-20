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
  '/api/v1/groups/:group_id/user',
  tokenAuth,
  verifyGroupId,
  groupController.addUserToGroup
);

router.post(
  '/api/v1/groups/:group_id/message',
  tokenAuth,
  verifyGroupId,
  verifyMembership,
  groupController.postMessageToGroup
);

router.get(
  '/api/v1/groups/:group_id/messages',
  tokenAuth,
  verifyGroupId,
  groupController.getGroupMessages
);

router.get(
  '/api/v1/groups/:group_id/members',
  tokenAuth,
  verifyGroupId,
  groupController.getGroupMembers
);

export default router;
