import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../../services/api'
import { useAdminAuth } from '../context/AdminAuthContext'
import { Save, ArrowLeft, Eye, Image } from 'lucide-react'

export default function BlogEditorPage() {
  const { id } = useParams()
  const isNew = !id || id === 'new'
  const navigate = useNavigate()
  const { admin } = useAdminAuth()
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '', featuredImage: '',
    featuredImageAlt: '', categories: '', tags: '', status: 'draft',
    metaTitle: '', metaDescription: '',
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(!isNew)

  useEffect(() => {
    if (!isNew) {
      api.get(`/blog/${id}`).then(res => {
        const b = res.data
        setForm({
          ...b,
          categories: (b.categories || []).join(', '),
          tags: (b.tags || []).join(', '),
        })
      }).catch(() => navigate('/ov-admin/blog'))
        .finally(() => setLoading(false))
    }
  }, [id])

  const update = (field, value) => setForm(p => ({ ...p, [field]: value }))

  const handleSave = async (status = form.status) => {
    setSaving(true)
    try {
      const payload = {
        ...form,
        status,
        categories: form.categories.split(',').map(s => s.trim()).filter(Boolean),
        tags: form.tags.split(',').map(s => s.trim()).filter(Boolean),
      }
      if (isNew) {
        const res = await api.post('/blog', payload)
        navigate(`/ov-admin/blog/${res.data._id}`, { replace: true })
      } else {
        await api.put(`/blog/${id}`, payload)
      }
      setMessage('Saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) { setMessage(err.message) }
    finally { setSaving(false) }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full" /></div>

  const Field = ({ label, name, type = 'text', placeholder, hint }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1.5">{label}</label>
      <input type={type} value={form[name] || ''} onChange={e => update(name, e.target.value)} placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 text-sm" />
      {hint && <p className="text-gray-600 text-xs mt-1">{hint}</p>}
    </div>
  )

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/ov-admin/blog" className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">{isNew ? 'New Post' : 'Edit Post'}</h1>
            <p className="text-gray-400 text-sm mt-0.5 capitalize">{form.status}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => handleSave('draft')} disabled={saving}
            className="px-4 py-2 border border-gray-700 text-gray-300 hover:text-white rounded-xl text-sm transition-colors disabled:opacity-60">
            Save Draft
          </button>
          <button onClick={() => handleSave('published')} disabled={saving}
            className="flex items-center gap-2 px-5 py-2 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-60 text-sm">
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>

      {message && <div className="p-4 bg-green-400/10 border border-green-400/20 rounded-xl text-green-400 text-sm">{message}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
            <Field label="Title" name="title" placeholder="Post title..." />
            <Field label="Slug" name="slug" placeholder="url-friendly-slug" hint="Leave blank to auto-generate from title" />
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Excerpt</label>
              <textarea value={form.excerpt || ''} onChange={e => update('excerpt', e.target.value)} rows={3}
                placeholder="Short description shown in post listings..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 text-sm resize-none" />
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <label className="block text-sm font-medium text-gray-300 mb-1.5">Content (HTML/Markdown)</label>
            <textarea value={form.content || ''} onChange={e => update('content', e.target.value)} rows={20}
              placeholder="Write your blog post content here. HTML is supported."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 text-sm resize-none font-mono" />
            <p className="text-gray-600 text-xs mt-2">Tip: HTML tags and basic markdown are supported</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Status */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
            <select value={form.status} onChange={e => update('status', e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-400/50 text-sm">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          {/* Featured Image */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-3">
            <label className="block text-sm font-medium text-gray-300">Featured Image</label>
            {form.featuredImage && (
              <img src={form.featuredImage} alt="preview" className="w-full aspect-video object-cover rounded-lg bg-gray-800" />
            )}
            <Field label="" name="featuredImage" placeholder="https://... or upload URL from Media Library" />
            <Field label="" name="featuredImageAlt" placeholder="Alt text for accessibility" />
          </div>

          {/* Categories & Tags */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
            <Field label="Categories" name="categories" placeholder="SEO, Marketing, Design" hint="Comma-separated" />
            <Field label="Tags" name="tags" placeholder="seo, google, analytics" hint="Comma-separated" />
          </div>

          {/* SEO */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-white text-sm font-semibold">SEO</h3>
            <Field label="Meta Title" name="metaTitle" placeholder="Custom title for search engines" />
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1.5">Meta Description</label>
              <textarea value={form.metaDescription || ''} onChange={e => update('metaDescription', e.target.value)} rows={3}
                placeholder="150-160 character description..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 text-sm resize-none" />
              <p className="text-gray-600 text-xs mt-1">{(form.metaDescription || '').length}/160 chars</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
