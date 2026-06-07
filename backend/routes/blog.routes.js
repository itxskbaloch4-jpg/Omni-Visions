import express from 'express'
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blog.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/', getBlogs)                    // Public
router.get('/:slug', getBlog)               // Public
router.post('/', protect, createBlog)        // Admin
router.put('/:id', protect, updateBlog)      // Admin
router.delete('/:id', protect, deleteBlog)   // Admin

export default router
