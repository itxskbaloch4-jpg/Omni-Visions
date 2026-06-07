import express from 'express'
import { getSettings, updateSettings, resetSettings } from '../controllers/site.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/settings', getSettings)                    // Public — frontend reads this
router.put('/settings', protect, updateSettings)        // Admin only
router.post('/settings/reset', protect, resetSettings)  // Admin only

export default router
