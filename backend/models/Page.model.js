import mongoose from 'mongoose'

const sectionSchema = new mongoose.Schema({
  sectionId: { type: String, required: true },
  sectionType: {
    type: String,
    enum: ['hero', 'about', 'services', 'portfolio', 'testimonials', 'cta', 'stats', 'team', 'blog', 'packages', 'faq', 'contact', 'custom'],
    required: true
  },
  isVisible: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  data: { type: mongoose.Schema.Types.Mixed, default: {} },
}, { _id: false })

const pageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  sections: { type: [sectionSchema], default: [] },
  isPublished: { type: Boolean, default: true },
  template: { type: String, default: 'default' },
}, { timestamps: true })

export default mongoose.model('Page', pageSchema)
