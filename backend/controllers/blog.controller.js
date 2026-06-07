import Blog from '../models/Blog.model.js'

export const getBlogs = async (req, res) => {
  try {
    const { status = 'published', page = 1, limit = 10, category, tag, search } = req.query
    const query = {}
    
    // Admin can see all, public only published
    if (!req.admin) query.status = 'published'
    else if (status !== 'all') query.status = status

    if (category) query.categories = category
    if (tag) query.tags = tag
    if (search) query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
    ]

    const total = await Blog.countDocuments(query)
    const blogs = await Blog.find(query)
      .populate('author', 'name avatar')
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select('-content')

    res.json({ success: true, data: blogs, pagination: { total, page: Number(page), pages: Math.ceil(total / limit) } })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'name avatar')
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' })
    await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } })
    res.json({ success: true, data: blog })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.admin._id })
    res.status(201).json({ success: true, data: blog })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' })
    res.json({ success: true, data: blog })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Blog deleted' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
