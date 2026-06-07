import express from 'express'
import { getPages, getPage, createPage, updatePage } from '../controllers/page.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', protect, getPages)
router.get('/:slug', getPage)
router.post('/', protect, createPage)
router.put('/:slug', protect, updatePage)

export default router
