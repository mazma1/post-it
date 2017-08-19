import express from 'express';
import groupController from '../controllers/group';
import tokenAuth from '../middlewares/tokenAuth';

const router = express.Router();

router.post('/api/group', tokenAuth, groupController.createGroup);
router.post('/api/group/:group_id/user', tokenAuth, groupController.addUserToGroup);
router.post('/api/group/:group_id/message', tokenAuth, groupController.postMessageToGroup);
router.get('/api/group/:group_id/messages', tokenAuth, groupController.getGroupMessages);
router.get('/api/group/:group_id/members', tokenAuth, groupController.getGroupMembers);
router.patch('/api/group/message/read', groupController.updateMessageReadStatus);

export default router;
