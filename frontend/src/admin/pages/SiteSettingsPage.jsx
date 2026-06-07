import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { useSiteSettings } from '../../hooks/useSiteSettings'
import { Palette, Navigation, Globe, Save, RotateCcw, ExternalLink } from 'lucide-react'

export default function SiteSettingsPage() {
  const { settings: ctxSettings, setSettings: setCtxSettings } = useSiteSettings()
  const [form, setForm] = useState({})
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/site/settings')
      .then(res => { setForm(res.data) })
      .catch(() => setForm(ctxSettings))
      .finally(() => setLoading(false))
  }, [])

  const update = (field, value) => setForm(p => ({ ...p, [field]: value }))

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await api.put('/site/settings', form)
      setCtxSettings(res.data)
      setMessage('Settings saved successfully!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full" /></div>

  const Field = ({ label, name, type = 'text', placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <input
        type={type}
        value={form[name] || ''}
        onChange={e => update(name, e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 text-sm"
      />
    </div>
  )

  const TextArea = ({ label, name, rows = 3, placeholder }) => (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <textarea
        value={form[name] || ''}
        onChange={e => update(name, e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-amber-400/50 text-sm resize-none"
      />
    </div>
  )

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Site Settings</h1>
          <p className="text-gray-400 mt-1">Control your website's global configuration</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-60 text-sm">
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save All'}
        </button>
      </div>

      {message && (
        <div className="p-4 bg-green-400/10 border border-green-400/20 rounded-xl text-green-400 text-sm">{message}</div>
      )}

      {/* Quick nav to sub-pages */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Color Palette', href: '/ov-admin/site-settings/colors', icon: Palette, desc: 'Brand colors & theme' },
          { label: 'Navbar Editor', href: '/ov-admin/site-settings/navbar', icon: Navigation, desc: 'Menu items & links' },
          { label: 'Footer Editor', href: '/ov-admin/site-settings/footer', icon: Globe, desc: 'Footer content' },
        ].map(item => (
          <Link key={item.href} to={item.href} className="flex items-center gap-3 p-4 bg-gray-900 border border-gray-800 hover:border-amber-400/30 rounded-xl transition-all group">
            <item.icon className="w-5 h-5 text-amber-400" />
            <div>
              <p className="text-white text-sm font-medium group-hover:text-amber-400 transition-colors">{item.label}</p>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-gray-600 ml-auto" />
          </Link>
        ))}
      </div>

      {/* General */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-white font-semibold">General Information</h2>
        <Field label="Site Name" name="siteName" placeholder="Omnivision Design" />
        <Field label="Tagline" name="tagline" placeholder="Everything You Need to Succeed Online" />
        <Field label="Logo URL" name="logo" placeholder="https://..." />
        <Field label="Favicon URL" name="favicon" placeholder="https://..." />
      </div>

      {/* Contact */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-white font-semibold">Contact Information</h2>
        <Field label="Phone" name="phone" placeholder="(514)-655-6276" />
        <Field label="Email" name="email" type="email" placeholder="info@omnivisiondesign.com" />
        <TextArea label="Address" name="address" rows={2} />
      </div>

      {/* Typography */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-white font-semibold">Typography</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Display Font</label>
            <select value={form.fontDisplay || 'Playfair Display'} onChange={e => update('fontDisplay', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-400/50 text-sm">
              {['Playfair Display', 'Merriweather', 'Lora', 'Cormorant Garamond', 'Libre Baskerville'].map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Body Font</label>
            <select value={form.fontBody || 'Inter'} onChange={e => update('fontBody', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-400/50 text-sm">
              {['Inter', 'Roboto', 'Open Sans', 'Lato', 'Nunito', 'DM Sans'].map(f => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-white font-semibold">Layout & Style</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Navbar Style</label>
            <select value={form.navbarStyle || 'transparent'} onChange={e => update('navbarStyle', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-400/50 text-sm">
              <option value="transparent">Transparent</option>
              <option value="solid">Solid</option>
              <option value="blur">Blur Glass</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Border Radius</label>
            <select value={form.borderRadius || 'large'} onChange={e => update('borderRadius', e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-400/50 text-sm">
              {['none', 'small', 'medium', 'large', 'full'].map(v => (
                <option key={v} value={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-white font-semibold">SEO</h2>
        <Field label="Meta Title" name="metaTitle" />
        <TextArea label="Meta Description" name="metaDescription" rows={2} />
      </div>

      {/* Maintenance */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-white font-semibold">Maintenance Mode</h2>
        <div className="flex items-center justify-between p-4 bg-gray-800 rounded-xl">
          <div>
            <p className="text-white text-sm font-medium">Maintenance Mode</p>
            <p className="text-gray-500 text-xs">Show maintenance page to all visitors</p>
          </div>
          <button
            onClick={() => update('maintenanceMode', !form.maintenanceMode)}
            className={`relative w-12 h-6 rounded-full transition-colors ${form.maintenanceMode ? 'bg-amber-400' : 'bg-gray-600'}`}
          >
            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.maintenanceMode ? 'translate-x-7' : 'translate-x-1'}`} />
          </button>
        </div>
        {form.maintenanceMode && (
          <TextArea label="Maintenance Message" name="maintenanceMessage" rows={2} placeholder="We are updating the website..." />
        )}
      </div>

      <div className="flex justify-end pb-8">
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-60">
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save All Settings'}
        </button>
      </div>
    </div>
  )
}
