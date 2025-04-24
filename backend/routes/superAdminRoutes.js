import express from 'express';
import { protect } from '../middlewares/protect.js';
import { requireSuperAdmin } from '../middlewares/requireSuperAdmin.js';
import {getProfilesForSuperAdmin, getUserRole, blockUserByAdmin, getBlockedUsersList, unBlockUserByAdmin, checkIsUserIdBlockedByAdmin } from '../controllers/superAdminController.js'

const router = express.Router();

router.get('/get-profiles', protect, requireSuperAdmin, getProfilesForSuperAdmin);

router.get('/get-user-role', protect, getUserRole);

router.post('/block-user', protect, requireSuperAdmin, blockUserByAdmin );

router.post('/un-block-user', protect, requireSuperAdmin, unBlockUserByAdmin );

router.get('/get-blocked-users-list', protect, requireSuperAdmin, getBlockedUsersList );

router.get('/check-is-user-id-blocked-by-admin', protect, checkIsUserIdBlockedByAdmin );

export default router;