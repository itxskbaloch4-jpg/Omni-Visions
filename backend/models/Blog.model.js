import mongoose from 'mongoose'
import slugify from 'slugify'

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  featuredImage: { type: String, default: '' },
  featuredImageAlt: { type: String, default: '' },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  categories: [{ type: String }],
  tags: [{ type: String }],
  status: { type: String, enum: ['draft', 'published', 'archived'], default: 'draft' },
  publishedAt: { type: Date },
  metaTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  views: { type: Number, default: 0 },
  readTime: { type: Number, default: 5 },
}, { timestamps: true })

blogSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date()
  }
  next()
})

export default mongoose.model('Blog', blogSchema)
