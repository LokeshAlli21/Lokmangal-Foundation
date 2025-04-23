import express from 'express';
import { protect } from '../middlewares/protect.js';
import { requireSuperAdmin } from '../middlewares/requireSuperAdmin.js';
import {getProfilesForSuperAdmin, getUserRole, blockUserByAdmin } from '../controllers/superAdminController.js'

const router = express.Router();

router.get('/get-profiles', protect, requireSuperAdmin, getProfilesForSuperAdmin);

router.get('/get-user-role', protect, getUserRole);

router.post('/block-user', protect, requireSuperAdmin, blockUserByAdmin );

export default router;