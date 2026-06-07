import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { Plus, Edit, Trash2, Eye, Clock, CheckCircle } from 'lucide-react'

const STATUS_CONFIG = {
  draft: { label: 'Draft', color: 'bg-gray-400/10 text-gray-400 border-gray-400/20' },
  published: { label: 'Published', color: 'bg-green-400/10 text-green-400 border-green-400/20' },
  archived: { label: 'Archived', color: 'bg-orange-400/10 text-orange-400 border-orange-400/20' },
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')

  const fetchBlogs = async () => {
    try {
      const res = await api.get(`/blog?status=${statusFilter}&limit=50`)
      setBlogs(res.data)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchBlogs() }, [statusFilter])

  const handleDelete = async (id) => {
    if (!confirm('Delete this blog post?')) return
    try {
      await api.delete(`/blog/${id}`)
      setBlogs(p => p.filter(b => b._id !== id))
    } catch (err) { console.error(err) }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-gray-400 mt-1">{blogs.length} posts</p>
        </div>
        <Link to="/ov-admin/blog/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm">
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {['all', 'published', 'draft', 'archived'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
              statusFilter === s ? 'bg-amber-400 text-gray-900' : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}>
            {s}
          </button>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No blog posts found. <Link to="/ov-admin/blog/new" className="text-amber-400 hover:text-amber-300">Create one!</Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {blogs.map(blog => {
              const status = STATUS_CONFIG[blog.status] || STATUS_CONFIG.draft
              return (
                <div key={blog._id} className="flex items-center gap-4 p-5 hover:bg-gray-800/40 transition-colors">
                  {blog.featuredImage ? (
                    <img src={blog.featuredImage} alt={blog.title} className="w-16 h-12 object-cover rounded-lg flex-shrink-0 bg-gray-800" />
                  ) : (
                    <div className="w-16 h-12 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                      <Edit className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{blog.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5 truncate">{blog.excerpt}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${status.color}`}>{status.label}</span>
                      <span className="text-gray-600 text-xs">{blog.views} views</span>
                      {blog.publishedAt && <span className="text-gray-600 text-xs">{new Date(blog.publishedAt).toLocaleDateString()}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {blog.status === 'published' && (
                      <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer"
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                        <Eye className="w-4 h-4" />
                      </a>
                    )}
                    <Link to={`/ov-admin/blog/${blog._id}`}
                      className="p-2 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-amber-400/10 transition-colors">
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button onClick={() => handleDelete(blog._id)}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
