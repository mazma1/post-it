import express from 'express';
import groupController from '../controllers/group';
import tokenAuth from '../middlewares/tokenAuth';

const router = express.Router();

router.post('/api/v1/groups', tokenAuth, groupController.createGroup);
router.post('/api/v1/groups/:group_id/user', tokenAuth, groupController.addUserToGroup);
router.post('/api/v1/groups/:group_id/message', tokenAuth, groupController.postMessageToGroup);
router.get('/api/v1/groups/:group_id/messages', tokenAuth, groupController.getGroupMessages);
router.get('/api/v1/groups/:group_id/members', tokenAuth, groupController.getGroupMembers);
router.patch('/api/v1/groups/:message_id/read', tokenAuth, groupController.updateMessageReadStatus);
router.patch('/api/v1/groups/:message_id/archive', tokenAuth, groupController.archiveMessage);

export default router;
