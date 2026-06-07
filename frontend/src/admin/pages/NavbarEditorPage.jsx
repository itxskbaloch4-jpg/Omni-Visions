import { useState, useEffect } from 'react'
import api from '../../services/api'
import { Save, Plus, Trash2, GripVertical, ChevronDown } from 'lucide-react'

const defaultNavItems = [
  { label: 'Home', href: '/', order: 0, children: [] },
  { label: 'About', href: '/web-marketing-agency/', order: 1, children: [
    { label: 'Why Choose Us', href: '/web-marketing-agency/#why-choose-us', order: 0 },
    { label: 'Team', href: '/team/', order: 1 },
    { label: 'Clients', href: '/clients/', order: 2 },
  ]},
  { label: 'Services', href: '/services/', order: 2, children: [
    { label: 'Web Design', href: '/web-design/', order: 0 },
    { label: 'SEO / GEO', href: '/seo/', order: 1 },
    { label: 'Google Ads', href: '/google-ads/', order: 2 },
  ]},
  { label: 'Our Work', href: '/our-work/', order: 3, children: [] },
  { label: 'Blog', href: '/blog/', order: 4, children: [] },
  { label: 'Contact', href: '/contact/', order: 5, children: [] },
]

export default function NavbarEditorPage() {
  const [items, setItems] = useState(defaultNavItems)
  const [phone, setPhone] = useState('(514)-655-6276')
  const [ctaText, setCtaText] = useState('Request a Quote')
  const [ctaHref, setCtaHref] = useState('/contact/')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [expanded, setExpanded] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/site/settings').then(res => {
      if (res.data.navItems?.length) setItems(res.data.navItems)
      if (res.data.phone) setPhone(res.data.phone)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const addItem = () => {
    setItems(p => [...p, { label: 'New Item', href: '/', order: p.length, children: [] }])
  }

  const removeItem = (idx) => {
    setItems(p => p.filter((_, i) => i !== idx))
  }

  const updateItem = (idx, field, value) => {
    setItems(p => p.map((item, i) => i === idx ? { ...item, [field]: value } : item))
  }

  const addChild = (idx) => {
    setItems(p => p.map((item, i) => i === idx
      ? { ...item, children: [...(item.children || []), { label: 'New Link', href: '/', order: (item.children || []).length }] }
      : item
    ))
  }

  const removeChild = (parentIdx, childIdx) => {
    setItems(p => p.map((item, i) => i === parentIdx
      ? { ...item, children: item.children.filter((_, ci) => ci !== childIdx) }
      : item
    ))
  }

  const updateChild = (parentIdx, childIdx, field, value) => {
    setItems(p => p.map((item, i) => i === parentIdx
      ? { ...item, children: item.children.map((child, ci) => ci === childIdx ? { ...child, [field]: value } : child) }
      : item
    ))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.put('/site/settings', { navItems: items, phone })
      setMessage('Navbar saved!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) { setMessage(err.message) }
    finally { setSaving(false) }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full" /></div>

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Navbar Editor</h1>
          <p className="text-gray-400 mt-1">Edit navigation menu items and links</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-60 text-sm">
          <Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {message && <div className="p-4 bg-green-400/10 border border-green-400/20 rounded-xl text-green-400 text-sm">{message}</div>}

      {/* CTA & Phone */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-white font-semibold">Header Info</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">Phone Number</label>
            <input value={phone} onChange={e => setPhone(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400/50" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1.5">CTA Button Text</label>
            <input value={ctaText} onChange={e => setCtaText(e.target.value)}
              className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400/50" />
          </div>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1.5">CTA Button Link</label>
          <input value={ctaHref} onChange={e => setCtaHref(e.target.value)}
            className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400/50" />
        </div>
      </div>

      {/* Nav Items */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 className="text-white font-semibold">Navigation Items</h2>
          <button onClick={addItem} className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Item
          </button>
        </div>

        <div className="divide-y divide-gray-800">
          {items.map((item, idx) => (
            <div key={idx} className="p-4">
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <input value={item.label} onChange={e => updateItem(idx, 'label', e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-amber-400/50"
                  placeholder="Label" />
                <input value={item.href} onChange={e => updateItem(idx, 'href', e.target.value)}
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-amber-400/50"
                  placeholder="/link" />
                <button onClick={() => setExpanded(expanded === idx ? null : idx)}
                  className="p-2 text-gray-400 hover:text-white transition-colors">
                  <ChevronDown className={`w-4 h-4 transition-transform ${expanded === idx ? 'rotate-180' : ''}`} />
                </button>
                <button onClick={() => removeItem(idx)} className="p-2 text-gray-600 hover:text-red-400 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Dropdown children */}
              {expanded === idx && (
                <div className="mt-3 ml-7 space-y-2">
                  {(item.children || []).map((child, ci) => (
                    <div key={ci} className="flex items-center gap-2">
                      <span className="text-gray-600 text-xs">└</span>
                      <input value={child.label} onChange={e => updateChild(idx, ci, 'label', e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-amber-400/50" placeholder="Sub label" />
                      <input value={child.href} onChange={e => updateChild(idx, ci, 'href', e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-amber-400/50" placeholder="/sub-link" />
                      <button onClick={() => removeChild(idx, ci)} className="p-1.5 text-gray-600 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => addChild(idx)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-amber-400 transition-colors ml-4">
                    <Plus className="w-3 h-3" /> Add sub-item
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
