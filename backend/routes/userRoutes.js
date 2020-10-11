import express from 'express';
const router = express.Router();
import { authUser, getUserProfile, registerUser, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'


// public route, fetching all the products
router.route('/').post(registerUser);
router.post('/login', authUser);
router.route('/profile')
.get(protect, getUserProfile)
.put(protect,updateUserProfile)

export default router  