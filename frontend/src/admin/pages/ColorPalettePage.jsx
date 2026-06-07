import { useState, useEffect } from 'react'
import api from '../../services/api'
import { applySiteSettings } from '../../hooks/useSiteSettings'
import { Save, RotateCcw, Eye } from 'lucide-react'

const DEFAULT_PALETTE = {
  brandBrown: '#432c1c',
  brandAmber: '#ffa602',
  brandAmberLight: '#ffb733',
  brandBrownDark: '#1a0f08',
  textPrimary: '#ffffff',
  textSecondary: 'rgba(255,255,255,0.7)',
}

const COLOR_FIELDS = [
  { key: 'brandBrown', label: 'Brand Brown', desc: 'Main brand color (navbar bg when scrolled)' },
  { key: 'brandAmber', label: 'Brand Amber', desc: 'Primary accent color (buttons, links)' },
  { key: 'brandAmberLight', label: 'Brand Amber Light', desc: 'Hover state of accent color' },
  { key: 'brandBrownDark', label: 'Background Dark', desc: 'Main page background' },
  { key: 'textPrimary', label: 'Text Primary', desc: 'Main text color' },
]

const PRESETS = [
  { name: 'Omnivision (Default)', palette: DEFAULT_PALETTE },
  {
    name: 'Ocean Blue', palette: {
      brandBrown: '#0f2a44', brandAmber: '#0ea5e9', brandAmberLight: '#38bdf8',
      brandBrownDark: '#020f1f', textPrimary: '#ffffff', textSecondary: 'rgba(255,255,255,0.7)',
    }
  },
  {
    name: 'Forest Green', palette: {
      brandBrown: '#14352a', brandAmber: '#22c55e', brandAmberLight: '#4ade80',
      brandBrownDark: '#071a12', textPrimary: '#ffffff', textSecondary: 'rgba(255,255,255,0.7)',
    }
  },
  {
    name: 'Purple Night', palette: {
      brandBrown: '#1e1040', brandAmber: '#a855f7', brandAmberLight: '#c084fc',
      brandBrownDark: '#0d0520', textPrimary: '#ffffff', textSecondary: 'rgba(255,255,255,0.7)',
    }
  },
]

export default function ColorPalettePage() {
  const [palette, setPalette] = useState(DEFAULT_PALETTE)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/site/settings')
      .then(res => setPalette({ ...DEFAULT_PALETTE, ...res.data.colorPalette }))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Live preview
  useEffect(() => {
    applySiteSettings({ colorPalette: palette })
  }, [palette])

  const updateColor = (key, value) => setPalette(p => ({ ...p, [key]: value }))

  const applyPreset = (preset) => {
    setPalette(preset.palette)
    applySiteSettings({ colorPalette: preset.palette })
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await api.put('/site/settings', { colorPalette: palette })
      setMessage('Color palette saved!')
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full" /></div>

  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Color Palette</h1>
          <p className="text-gray-400 mt-1">Changes are previewed live on the website</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-60 text-sm">
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Palette'}
        </button>
      </div>

      {message && (
        <div className="p-4 bg-green-400/10 border border-green-400/20 rounded-xl text-green-400 text-sm">{message}</div>
      )}

      {/* Presets */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-semibold mb-4">Color Presets</h2>
        <div className="grid grid-cols-2 gap-3">
          {PRESETS.map(preset => (
            <button key={preset.name} onClick={() => applyPreset(preset)}
              className="flex items-center gap-3 p-3 rounded-xl border border-gray-700 hover:border-amber-400/30 transition-colors text-left">
              <div className="flex gap-1">
                {[preset.palette.brandBrownDark, preset.palette.brandBrown, preset.palette.brandAmber].map((c, i) => (
                  <div key={i} className="w-4 h-4 rounded-full border border-white/10" style={{ backgroundColor: c }} />
                ))}
              </div>
              <span className="text-white text-xs font-medium">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Controls */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5">
        <h2 className="text-white font-semibold">Custom Colors</h2>
        {COLOR_FIELDS.map(({ key, label, desc }) => (
          <div key={key} className="flex items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              <label className="relative w-10 h-10 rounded-lg overflow-hidden border-2 border-gray-600 cursor-pointer hover:border-amber-400 transition-colors flex-shrink-0">
                <input type="color" value={palette[key]} onChange={e => updateColor(key, e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="w-full h-full rounded-md" style={{ backgroundColor: palette[key] }} />
              </label>
              <div>
                <p className="text-white text-sm font-medium">{label}</p>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
            </div>
            <input
              type="text"
              value={palette[key]}
              onChange={e => updateColor(key, e.target.value)}
              className="w-32 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm font-mono focus:outline-none focus:border-amber-400/50"
              placeholder="#000000"
            />
          </div>
        ))}
      </div>

      {/* Preview swatch */}
      <div className="rounded-2xl overflow-hidden border border-gray-800">
        <div className="p-6" style={{ backgroundColor: palette.brandBrownDark }}>
          <div className="p-4 rounded-xl mb-3" style={{ backgroundColor: palette.brandBrown }}>
            <p style={{ color: palette.textPrimary }} className="font-bold text-lg">Sample Heading</p>
            <p style={{ color: palette.textSecondary }} className="text-sm">Sample body text for preview.</p>
          </div>
          <div className="flex gap-3">
            <div className="px-5 py-2 rounded-full font-bold text-sm" style={{ backgroundColor: palette.brandAmber, color: palette.brandBrown }}>
              Primary Button
            </div>
            <div className="px-5 py-2 rounded-full font-bold text-sm border" style={{ borderColor: palette.brandAmber, color: palette.brandAmber }}>
              Secondary
            </div>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs py-2 bg-gray-900">Live Preview</p>
      </div>

      <div className="flex justify-between pb-8">
        <button onClick={() => applyPreset(PRESETS[0])} className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors">
          <RotateCcw className="w-4 h-4" /> Reset to Default
        </button>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-8 py-3 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-300 transition-colors disabled:opacity-60">
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Palette'}
        </button>
      </div>
    </div>
  )
}
