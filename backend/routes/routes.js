import express from 'express';
import { testWithAuth } from '../controllers/controller.js';
import { protect } from '../middlewares/protect.js';

const router = express.Router();

router.post('/',protect, testWithAuth);

export default router;
