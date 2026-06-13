import Blog from '../models/Blog.model.js'

export const getBlogs = async (req, res) => {
  try {
    const { status = 'published', page = 1, limit = 10, category, tag, search } = req.query
    const query = {}

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
  } catch (err) {
    console.error('getBlogs error:', err)
    res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
}

export const getBlog = async (req, res) => {
  try {
    // Fix #11 — atomic findOneAndUpdate: single query, no race condition
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name avatar')

    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' })
    res.json({ success: true, data: blog })
  } catch (err) {
    console.error('getBlog error:', err)
    res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
}

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, author: req.admin._id })
    res.status(201).json({ success: true, data: blog })
  } catch (err) {
    console.error('createBlog error:', err)
    res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
}

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' })
    res.json({ success: true, data: blog })
  } catch (err) {
    console.error('updateBlog error:', err)
    res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
}

export const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Blog deleted' })
  } catch (err) {
    console.error('deleteBlog error:', err)
    res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
    }
export const createBlog = async (req, res) => {
  try {
    // Whitelist only known fields
    const {
      title, slug, excerpt, content, featuredImage,
      categories, tags, status, metaTitle, metaDescription,
      publishedAt,
    } = req.body

    const blog = await Blog.create({
      title, slug, excerpt, content, featuredImage,
      categories, tags, status, metaTitle, metaDescription,
      publishedAt,
      author: req.admin._id,
    })
    res.status(201).json({ success: true, data: blog })
  } catch (err) {
    console.error('createBlog error:', err)
    res.status(500).json({ success: false, message: 'An unexpected error occurred.' })
  }
}
