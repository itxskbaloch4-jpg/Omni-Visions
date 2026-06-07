import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Save, Eye, EyeOff, Layers } from 'lucide-react'

export default function PagesEditorPage() {
  const [pages, setPages] = useState([])
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ title: '', metaTitle: '', metaDescription: '', isPublished: true })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/pages').then(res => setPages(res.data))
      .catch(() => {}).finally(() => setLoading(false))
  }, [])

  const selectPage = async (page) => {
    setSelected(page)
    try {
      const res = await api.get(`/pages/${page.slug}`)
      setForm({
        title: res.data.title || '',
        metaTitle: res.data.metaTitle || '',
        metaDescription: res.data.metaDescription || '',
        isPublished: res.data.isPublished ?? true,
      })
    } catch {}
  }

  const handleSave = async () => {
    if (!selected) return
    setSaving(true)
    try {
      await api.put(`/pages/${selected.slug}`, form)
      setMessage('Page saved!')
      setPages(p => p.map(pg => pg.slug === selected.slug ? { ...pg, ...form } : pg))
      setTimeout(() => setMessage(''), 3000)
    } catch (err) { setMessage(err.message) }
    finally { setSaving(false) }
  }

  const PAGE_SLUGS = [
    { slug: 'home', title: 'Home' },
    { slug: 'about', title: 'About' },
    { slug: 'services', title: 'Services' },
    { slug: 'our-work', title: 'Our Work' },
    { slug: 'blog', title: 'Blog' },
    { slug: 'contact', title: 'Contact' },
    { slug: 'team', title: 'Team' },
    { slug: 'testimonials', title: 'Testimonials' },
    { slug: 'faq', title: 'FAQ' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Pages</h1>
        <p className="text-gray-400 mt-1">Manage SEO and publish state of each page</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pages list */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-gray-800">
            <p className="text-white font-semibold text-sm">All Pages</p>
          </div>
          <div className="divide-y divide-gray-800">
            {PAGE_SLUGS.map(page => (
              <button key={page.slug} onClick={() => selectPage(page)}
                className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                  selected?.slug === page.slug ? 'bg-amber-400/10 text-amber-400' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}>
                <div className="flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-sm">{page.title}</span>
                </div>
                <span className="text-xs text-gray-600">/{page.slug}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-2">
          {selected ? (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-white font-semibold">{selected.title} — Settings</h2>
                <button onClick={handleSave} disabled={saving}
                  className="flex items-center gap-2 px-4 py-2 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-60 text-sm">
                  <Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save'}
                </button>
              </div>

              {message && <div className="p-3 bg-green-400/10 border border-green-400/20 rounded-xl text-green-400 text-sm">{message}</div>}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Page Title</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-400/50 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Meta Title</label>
                <input value={form.metaTitle} onChange={e => setForm(p => ({ ...p, metaTitle: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-400/50 text-sm" />
                <p className="text-gray-600 text-xs mt-1">{(form.metaTitle || '').length}/70 chars</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Meta Description</label>
                <textarea value={form.metaDescription} onChange={e => setForm(p => ({ ...p, metaDescription: e.target.value }))} rows={3}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-400/50 text-sm resize-none" />
                <p className="text-gray-600 text-xs mt-1">{(form.metaDescription || '').length}/160 chars</p>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
                <div>
                  <p className="text-white text-sm font-medium">Published</p>
                  <p className="text-gray-500 text-xs">Page is visible to visitors</p>
                </div>
                <button onClick={() => setForm(p => ({ ...p, isPublished: !p.isPublished }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${form.isPublished ? 'bg-amber-400' : 'bg-gray-600'}`}>
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.isPublished ? 'translate-x-7' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-900 border border-gray-800 rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center">
                <Layers className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500">Select a page to edit its settings</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
