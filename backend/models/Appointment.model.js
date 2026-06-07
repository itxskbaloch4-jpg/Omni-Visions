import mongoose from 'mongoose'

const appointmentSchema = new mongoose.Schema({
  // Client Info
  clientName: { type: String, required: true, trim: true },
  clientEmail: { type: String, required: true, lowercase: true },
  clientPhone: { type: String, default: '' },
  company: { type: String, default: '' },

  // Appointment Details
  service: {
    type: String,
    enum: ['web-design', 'seo', 'google-ads', 'social-media', 'digital-marketing', 'ai-photo', 'ai-video', 'livechat', 'mini-packages', 'consultation', 'other'],
    required: true
  },
  preferredDate: { type: Date, required: true },
  preferredTime: { type: String, required: true },
  timezone: { type: String, default: 'America/Montreal' },
  duration: { type: Number, default: 60 }, // minutes
  notes: { type: String, default: '' },
  budget: { type: String, default: '' },

  // Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed', 'no-show'],
    default: 'pending'
  },
  adminNotes: { type: String, default: '' },
  confirmedAt: { type: Date },
  cancelledAt: { type: Date },
  cancelReason: { type: String, default: '' },

  // Tracking
  source: { type: String, default: 'website' },
  ipAddress: { type: String, default: '' },
}, { timestamps: true })

appointmentSchema.index({ preferredDate: 1, status: 1 })
appointmentSchema.index({ clientEmail: 1 })

export default mongoose.model('Appointment', appointmentSchema)
