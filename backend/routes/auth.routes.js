import express from 'express'
import { login, getMe, updateProfile, changePassword, createFirstAdmin } from '../controllers/auth.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { authLimiter } from '../middleware/rateLimit.middleware.js'

const router = express.Router()

router.post('/login', authLimiter, login)
router.post('/setup', createFirstAdmin) // First-time setup only
router.get('/me', protect, getMe)
router.put('/profile', protect, updateProfile)
router.put('/change-password', protect, changePassword)

export default router
