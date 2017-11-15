import express from 'express';
import MessageController from '../controllers/MessageController';
import tokenAuth from '../middlewares/tokenAuth';

const router = express.Router();

router.patch(
  '/api/v1/messages/:messageId/read',
  tokenAuth,
  MessageController.updateMessageReadStatus
);

router.patch(
  '/api/v1/messages/:messageId/archive',
  tokenAuth,
  MessageController.archiveMessage
);

export default router;
