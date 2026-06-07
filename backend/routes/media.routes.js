import express from 'express'
import { uploadMedia, getMedia, deleteMedia, updateMediaMeta } from '../controllers/media.controller.js'
import { protect } from '../middleware/auth.middleware.js'
import { upload } from '../config/cloudinary.js'

const router = express.Router()

router.post('/upload', protect, upload.single('file'), uploadMedia)
router.get('/', protect, getMedia)
router.put('/:id', protect, updateMediaMeta)
router.delete('/:id', protect, deleteMedia)

export default router
