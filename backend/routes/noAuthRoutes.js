import express from 'express';
import { getProfiles } from '../controllers/noAuthController.js';

const router = express.Router();

router.get('/profiles', getProfiles);

export default router;
