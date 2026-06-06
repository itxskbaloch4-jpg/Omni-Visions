import { useState, useEffect } from 'react'

const staticItems = [
  { title: 'Copicom Responsive Web Design', category: 'Web Design', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/copicom-responsive-web-design-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/copicom-responsive-web-design.jpg' },
  { title: 'Copicom Web Development', category: 'Web Design', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Copicom-web-development-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Copicom-web-development.jpg' },
  { title: 'Darlene Wong Graphic Design', category: 'Graphic Design', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/darleenwong-graphic-design-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/darleenwong-graphic-design.jpg' },
  { title: 'Hypotheque Web Site Creation', category: 'Web Design', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Hypotheque-web-site-creation-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Hypotheque-web-site-creation.jpg' },
  { title: 'Omnivision Design Montreal', category: 'Web Design', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/omnivision-design-montreal-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/omnivision-design-montreal.jpg' },
  { title: 'Omnivision Web Portfolio', category: 'Web Design', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/omnivision-design-web-portfolio-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/omnivision-design-web-portfolio.jpg' },
  { title: 'Responsive Website Montreal', category: 'Web Design', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/responsive-website-montreal-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/responsive-website-montreal.jpg' },
  { title: 'Uni-Signal Web Development', category: 'Web Development', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Uni-signal-web-development-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Uni-signal-web-development.jpg' },
]

export default function OurWorkPage() {
  const [items, setItems] = useState(staticItems)

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch('/api/portfolio', { signal: AbortSignal.timeout(3000) })
        if (!res.ok) throw new Error('not ok')
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) setItems(data)
      } catch { /* use static */ }
    }
    fetchPortfolio()
  }, [])

  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Portfolio</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Some Creative <span className="gradient-text">Work</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Omnivision offers Montreal internet marketing services to small, medium &amp; large businesses, primarily located in Montreal.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <a key={item.title} href={item.full} target="_blank" rel="noopener noreferrer" className="group relative aspect-[3/2] rounded-xl overflow-hidden border border-white/10 hover:border-brand-amber/50 transition-all duration-300 block" aria-label={`View ${item.title}`}>
              <img src={item.thumb} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-brand-brown-dark/0 group-hover:bg-brand-brown-dark/70 transition-all duration-300 flex items-end">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-3">
                  <p className="text-white text-xs font-semibold leading-tight">{item.title}</p>
                  <p className="text-brand-amber text-[10px] uppercase tracking-wider mt-0.5">{item.category}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
