import Media from '../models/Media.model.js'
import cloudinary from '../config/cloudinary.js'

export const uploadMedia = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' })
    const media = await Media.create({
      filename: req.file.filename,
      originalName: req.file.originalname,
      url: req.file.path,
      publicId: req.file.filename,
      type: req.file.mimetype.startsWith('image') ? 'image' : 'document',
      size: req.file.size,
      alt: req.body.alt || '',
      caption: req.body.caption || '',
      folder: req.body.folder || 'general',
      uploadedBy: req.admin._id,
    })
    res.status(201).json({ success: true, data: media })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getMedia = async (req, res) => {
  try {
    const { folder, type, page = 1, limit = 20 } = req.query
    const query = {}
    if (folder) query.folder = folder
    if (type) query.type = type
    const total = await Media.countDocuments(query)
    const media = await Media.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
    res.json({ success: true, data: media, pagination: { total, page: Number(page), pages: Math.ceil(total / limit) } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateMediaMeta = async (req, res) => {
  try {
    const { alt, caption, folder } = req.body
    const media = await Media.findByIdAndUpdate(req.params.id, { alt, caption, folder }, { new: true })
    res.json({ success: true, data: media })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteMedia = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id)
    if (!media) return res.status(404).json({ success: false, message: 'Media not found' })
    await cloudinary.uploader.destroy(media.publicId)
    await Media.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Media deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
