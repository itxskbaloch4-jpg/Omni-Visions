import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Save, Plus, Trash2 } from 'lucide-react'

export default function FooterEditorPage() {
  const [form, setForm] = useState({
    footerAboutText: '',
    footerCopyright: '© {year} Omnivision Design. All rights reserved.',
    socialLinks: [],
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/site/settings').then(res => {
      setForm({
        footerAboutText: res.data.footerAboutText || '',
        footerCopyright: res.data.footerCopyright || '© {year} Omnivision Design. All rights reserved.',
        socialLinks: res.data.socialLinks || [],
      })
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const update = (field, value) => setForm(p => ({ ...p, [field]: value }))
  const updateSocial = (idx, field, value) => {
    setForm(p => ({ ...p, socialLinks: p.socialLinks.map((s, i) => i === idx ? { ...s, [field]: value } : s) }))
  }
  const addSocial = () => setForm(p => ({ ...p, socialLinks: [...p.socialLinks, { platform: '', url: '', icon: '' }] }))
  const removeSocial = (idx) => setForm(p => ({ ...p, socialLinks: p.socialLinks.filter((_, i) => i !== idx) }))

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.put('/site/settings', form)
      setMessage('Footer saved!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) { setMessage(err.message) }
    finally { setSaving(false) }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full" /></div>

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Footer Editor</h1>
          <p className="text-gray-400 mt-1">Edit footer content and social links</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-60 text-sm">
          <Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {message && <div className="p-4 bg-green-400/10 border border-green-400/20 rounded-xl text-green-400 text-sm">{message}</div>}

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-white font-semibold">Footer Content</h2>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">About Text</label>
          <textarea value={form.footerAboutText} onChange={e => update('footerAboutText', e.target.value)} rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 text-sm resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1.5">Copyright Text</label>
          <input value={form.footerCopyright} onChange={e => update('footerCopyright', e.target.value)}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-400/50 text-sm" />
          <p className="text-gray-600 text-xs mt-1">Use {'{year}'} for current year</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-white font-semibold">Social Links</h2>
          <button onClick={addSocial} className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Link
          </button>
        </div>
        <div className="divide-y divide-gray-800">
          {form.socialLinks.map((link, idx) => (
            <div key={idx} className="p-4 flex items-center gap-3">
              <div className="grid grid-cols-3 gap-2 flex-1">
                <input value={link.platform} onChange={e => updateSocial(idx, 'platform', e.target.value)} placeholder="Platform" 
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-amber-400/50" />
                <input value={link.url} onChange={e => updateSocial(idx, 'url', e.target.value)} placeholder="https://..."
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-amber-400/50" />
                <input value={link.icon} onChange={e => updateSocial(idx, 'icon', e.target.value)} placeholder="icon name"
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-amber-400/50" />
              </div>
              <button onClick={() => removeSocial(idx)} className="p-2 text-gray-600 hover:text-red-400 transition-colors flex-shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {form.socialLinks.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-8">No social links. Add some!</p>
          )}
        </div>
      </div>
    </div>
  )
}
