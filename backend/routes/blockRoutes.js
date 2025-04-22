import express from 'express';
import { protect } from '../middlewares/protect.js';
import {isBlocked, blockUser, unblockUser} from '../controllers/blockController.js'

const router = express.Router();

router.get('/isBlocked', protect, isBlocked);

router.put('/block-user', protect, blockUser);

router.post('/unblock-user', protect, unblockUser);

export default router;