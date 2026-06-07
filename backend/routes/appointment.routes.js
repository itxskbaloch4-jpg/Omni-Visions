import express from 'express'
import {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getAppointmentStats,
} from '../controllers/appointment.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/', createAppointment)                              // Public — clients book
router.get('/', protect, getAppointments)                        // Admin — list all
router.get('/stats', protect, getAppointmentStats)               // Admin — stats
router.get('/:id', protect, getAppointment)                      // Admin — single
router.put('/:id/status', protect, updateAppointmentStatus)      // Admin — update status
router.delete('/:id', protect, deleteAppointment)                // Admin — delete

export default router
