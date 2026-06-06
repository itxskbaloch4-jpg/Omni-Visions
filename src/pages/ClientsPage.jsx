import { useState, useEffect } from 'react'

const staticClients = [
  { name: 'Syneos Health', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2021/07/syneos-health-logo.png' },
  { name: 'Mobi724', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2021/07/mobi724_logo.png' },
  { name: 'Alarme Signal', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2021/07/alarme-signal_logo.png' },
  { name: 'Kyocera', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2021/07/kyocera_logo.png' },
  { name: 'Aeroplan', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2021/07/aeroplan_logo-1.png' },
  { name: 'Airbnb', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2021/07/airbnb_logo.png' },
  { name: 'Luxury Retreats', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/graphic-design-luxury-retreats.jpg' },
  { name: 'Air Canada', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/graphics-air-canada.png' },
  { name: 'Telus', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/telus-logo.png' },
  { name: 'Terrasses Bonsecours', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/livechat-service-terrasses-bonsecours.png' },
  { name: 'hGregoire', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/seo-marketing-hgregoire.jpg' },
  { name: 'Sphinx Resources', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/web-design-seo-sphinx-resources-1.png' },
  { name: 'Multi Prets', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/web-design-multi-prets.png' },
  { name: 'Rosdev', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/web-design-rosdev.png' },
]

export default function ClientsPage() {
  const [items, setItems] = useState(staticClients)

  useEffect(() => {
    async function fetchClients() {
      try {
        const res = await fetch('/api/clients', { signal: AbortSignal.timeout(3000) })
        if (!res.ok) throw new Error('not ok')
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) setItems(data)
      } catch { /* use static */ }
    }
    fetchClients()
  }, [])

  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Trusted By</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="gradient-text">Clients</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            From startups to public companies — businesses across Canada and the USA trust Omnivision Design to grow their online presence.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {items.map((client) => (
            <div key={client.name} className="flex items-center justify-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-brand-amber/40 hover:bg-white/10 transition-all duration-300 group aspect-[3/2]">
              <img src={client.logo} alt={client.name} className="object-contain max-h-14 w-full filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
