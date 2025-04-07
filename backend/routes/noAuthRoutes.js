import express from 'express';
import { getProfiles } from '../controllers/noAuthController.js';

const router = express.Router();

router.post('/get-profiles', getProfiles);

export default router;
