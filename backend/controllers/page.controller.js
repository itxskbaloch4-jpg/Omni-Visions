import Page from '../models/Page.model.js'

export const getPages = async (req, res) => {
  try {
    const pages = await Page.find({}).select('slug title isPublished updatedAt')
    res.json({ success: true, data: pages })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getPage = async (req, res) => {
  try {
    const page = await Page.findOne({ slug: req.params.slug })
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' })
    res.json({ success: true, data: page })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const createPage = async (req, res) => {
  try {
    const page = await Page.create(req.body)
    res.status(201).json({ success: true, data: page })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updatePage = async (req, res) => {
  try {
    const page = await Page.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true, runValidators: true })
    if (!page) return res.status(404).json({ success: false, message: 'Page not found' })
    res.json({ success: true, data: page, message: 'Page updated' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
