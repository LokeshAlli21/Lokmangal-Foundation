import express from 'express';
import { protect } from '../middlewares/protect.js';
import {getProfiles, getProfileById, getFullProfileByEmail, updateProfile} from '../controllers/profileController.js'

const router = express.Router();

router.get('/get-profiles', protect, getProfiles);

router.get('/profile/:id', protect, getProfileById);

router.post('/get-full-profile', protect, getFullProfileByEmail);

router.put('/update-profile/:id', protect, updateProfile);

export default router;


// ✅ Relationships Routes (Nice touch for frontend dev)
// Method   Endpoint	                    Description
// GET	    /api/users/:userId/profile	    Get profile by user ID
// POST 	/api/users/:userId/profile  	Create profile for specific user


// ✅ REST API ROUTES for profiles
// Method	Endpoint	                Description
// GET	    /api/profiles	            Get all profiles
// GET	    /api/users/:userId/profile	Get profile by user ID
// POST	    /api/profiles	            Create new profile
// PUT	    /api/profiles/:id	        Update profile by profile ID
// DELETE	/api/profiles/:id	        Delete profile by profile ID