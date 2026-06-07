import { useState, useEffect, createContext, useContext } from 'react'
import api from '../services/api'

// ── Static fallback (matches existing design) ──────────────────────────
const STATIC_SETTINGS = {
  siteName: 'Omnivision Design',
  tagline: 'Everything You Need to Succeed Online',
  logo: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/omnivision-logo-white.svg',
  phone: '(514)-655-6276',
  email: 'info@omnivisiondesign.com',
  address: '106-7470 Sherbrooke St W., Montreal, Quebec Canada H4B 1S5',
  colorPalette: {
    brandBrown: '#432c1c',
    brandAmber: '#ffa602',
    brandAmberLight: '#ffb733',
    brandBrownDark: '#1a0f08',
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255,255,255,0.7)',
  },
  fontDisplay: 'Playfair Display',
  fontBody: 'Inter',
  navbarStyle: 'transparent',
  footerStyle: 'dark',
  socialLinks: [
    { platform: 'Facebook', url: 'https://www.facebook.com/omnivision.design', icon: 'facebook' },
    { platform: 'Twitter', url: 'https://twitter.com/omnivisiondes', icon: 'twitter' },
    { platform: 'LinkedIn', url: 'http://ca.linkedin.com/in/omnivisiondesign', icon: 'linkedin' },
    { platform: 'Instagram', url: 'https://www.instagram.com/omnivisiondesign/', icon: 'instagram' },
  ],
  footerAboutText: 'Omnivision Design is a Montreal Web Marketing Company, offering internet marketing services to small, medium and large businesses.',
  footerCopyright: '© {year} Omnivision Design. All rights reserved.',
  metaTitle: 'Omnivision Design | Web Marketing Agency Montreal',
  maintenanceMode: false,
}

// ── Apply CSS variables from settings ──────────────────────────────────
export const applySiteSettings = (settings) => {
  const p = settings.colorPalette || STATIC_SETTINGS.colorPalette
  const root = document.documentElement.style
  root.setProperty('--brand-brown', p.brandBrown)
  root.setProperty('--brand-amber', p.brandAmber)
  root.setProperty('--brand-amber-light', p.brandAmberLight)
  root.setProperty('--brand-brown-dark', p.brandBrownDark)
  root.setProperty('--text-primary', p.textPrimary)
  root.setProperty('--text-secondary', p.textSecondary)
  root.setProperty('--font-display', settings.fontDisplay || 'Playfair Display')
  root.setProperty('--font-body', settings.fontBody || 'Inter')
}

// ── Context ────────────────────────────────────────────────────────────
const SiteSettingsContext = createContext({ settings: STATIC_SETTINGS, isLive: false, loading: true })

export const SiteSettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(STATIC_SETTINGS)
  const [isLive, setIsLive] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/site/settings')
        if (res.success && res.data) {
          setSettings({ ...STATIC_SETTINGS, ...res.data })
          applySiteSettings(res.data)
          setIsLive(true)
        }
      } catch {
        // Silent fallback — use static settings, site still works
        applySiteSettings(STATIC_SETTINGS)
        setIsLive(false)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  return (
    <SiteSettingsContext.Provider value={{ settings, setSettings, isLive, loading }}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export const useSiteSettings = () => useContext(SiteSettingsContext)
