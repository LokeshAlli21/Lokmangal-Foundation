import express from 'express';
import { registerUser, loginUser, getUser } from '../controllers/authController.js';
import { protect } from '../middlewares/protect.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', protect, getUser);

export default router;
