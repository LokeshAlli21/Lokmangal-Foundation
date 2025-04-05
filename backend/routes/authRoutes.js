import express from 'express';
import { registerUser, loginUser, testRoute } from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/test', testRoute);

export default router;
