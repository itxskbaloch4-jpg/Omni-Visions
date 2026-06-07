import { useState, useEffect, useRef } from 'react'
import api from '../../services/api'
import { Upload, Trash2, Copy, Check, Search, Image, X } from 'lucide-react'

export default function MediaLibraryPage() {
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selected, setSelected] = useState(null)
  const [copied, setCopied] = useState(null)
  const [search, setSearch] = useState('')
  const fileRef = useRef(null)

  const fetchMedia = async () => {
    try {
      const res = await api.request('/media')
      setMedia(res.data)
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchMedia() }, [])

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (!files.length) return
    setUploading(true)
    for (const file of files) {
      const formData = new FormData()
      formData.append('file', file)
      try {
        const token = localStorage.getItem('ov_admin_token')
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/media/upload`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        })
        const data = await res.json()
        if (data.success) setMedia(p => [data.data, ...p])
      } catch (err) { console.error(err) }
    }
    setUploading(false)
    e.target.value = ''
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this media? This cannot be undone.')) return
    try {
      await api.delete(`/media/${id}`)
      setMedia(p => p.filter(m => m._id !== id))
      if (selected?._id === id) setSelected(null)
    } catch (err) { console.error(err) }
  }

  const copyUrl = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const filtered = media.filter(m =>
    m.originalName?.toLowerCase().includes(search.toLowerCase()) ||
    m.alt?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Media Library</h1>
          <p className="text-gray-400 mt-1">{media.length} files</p>
        </div>
        <div>
          <input ref={fileRef} type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" />
          <button onClick={() => fileRef.current?.click()} disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-60 text-sm">
            <Upload className="w-4 h-4" />
            {uploading ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input type="text" placeholder="Search media..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 text-sm" />
      </div>

      <div className="flex gap-6">
        {/* Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 bg-gray-900 border border-gray-800 rounded-2xl">
              <Image className="w-10 h-10 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-500">No media found. Upload some images!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {filtered.map(item => (
                <div key={item._id}
                  onClick={() => setSelected(selected?._id === item._id ? null : item)}
                  className={`relative group cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                    selected?._id === item._id ? 'border-amber-400' : 'border-gray-800 hover:border-gray-600'
                  }`}>
                  <div className="aspect-square bg-gray-800">
                    <img src={item.url} alt={item.alt || item.originalName} className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                    <div className="w-full p-2 opacity-0 group-hover:opacity-100 transition-opacity flex justify-end gap-1">
                      <button onClick={e => { e.stopPropagation(); copyUrl(item.url, item._id) }}
                        className="p-1.5 rounded-lg bg-white/20 text-white hover:bg-white/30 transition-colors">
                        {copied === item._id ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                      <button onClick={e => { e.stopPropagation(); handleDelete(item._id) }}
                        className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/40 transition-colors">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-64 flex-shrink-0">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white font-semibold text-sm">File Details</p>
                <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <img src={selected.url} alt={selected.alt} className="w-full aspect-video object-cover rounded-lg mb-4 bg-gray-800" />
              <dl className="space-y-2 text-xs">
                <div>
                  <dt className="text-gray-500">Filename</dt>
                  <dd className="text-white truncate">{selected.originalName}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">URL</dt>
                  <dd className="text-amber-400 truncate cursor-pointer hover:text-amber-300" onClick={() => copyUrl(selected.url, 'detail')}>
                    {copied === 'detail' ? 'Copied!' : 'Click to copy'}
                  </dd>
                </div>
                <div>
                  <dt className="text-gray-500">Uploaded</dt>
                  <dd className="text-white">{new Date(selected.createdAt).toLocaleDateString()}</dd>
                </div>
              </dl>
              <button onClick={() => handleDelete(selected._id)}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm">
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
