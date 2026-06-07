import mongoose from 'mongoose'

const mediaSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  type: { type: String, enum: ['image', 'document', 'video'], default: 'image' },
  size: { type: Number, default: 0 },
  width: { type: Number },
  height: { type: Number },
  alt: { type: String, default: '' },
  caption: { type: String, default: '' },
  folder: { type: String, default: 'general' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  usedIn: [{ type: String }],
}, { timestamps: true })

export default mongoose.model('Media', mediaSchema)
