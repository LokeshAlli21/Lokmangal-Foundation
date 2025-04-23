import express from 'express';
import { protect } from '../middlewares/protect.js';
import { requireSuperAdmin } from '../middlewares/requireSuperAdmin.js';
import {getProfilesForSuperAdmin} from '../controllers/superAdminController.js'

const router = express.Router();

router.get('/get-profiles', protect, requireSuperAdmin, getProfilesForSuperAdmin);

export default router;