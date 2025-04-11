import express from 'express';
import { getNoAuthProfiles } from '../controllers/noAuthController.js';

const router = express.Router();

router.get('/profiles', getNoAuthProfiles);

export default router;
