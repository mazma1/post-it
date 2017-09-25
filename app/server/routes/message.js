import express from 'express';
import messageCtrl from '../controllers/message';
import tokenAuth from '../middlewares/tokenAuth';

const router = express.Router();

router.patch('/api/v1/messages/:message_id/read', tokenAuth, messageCtrl.updateMessageReadStatus);
router.patch('/api/v1/messages/:message_id/archive', tokenAuth, messageCtrl.archiveMessage);

export default router;