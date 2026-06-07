import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

const subServices = [
  { title: 'SEO Packages', desc: 'Monthly SEO plans tailored to your industry, market, and competition level.', href: '/seo/seo-packages/' },
  { title: 'GEO Optimization', desc: 'Generative Engine Optimization to rank in AI-powered search results.', href: '/geo-optimization-packages/' },
  { title: 'Link Building', desc: 'High-authority backlink acquisition to boost your domain authority.', href: '/seo/link-building/' },
  { title: 'Local SEO', desc: 'Dominate local Google search results for your city or neighbourhood.', href: '/seo/local-seo/' },
  { title: 'Advanced Conversion Tracking', desc: 'GA4, GTM, and heatmap setup to measure exactly what is working.', href: '/seo/advanced-conversion-tracking-services/' },
  { title: 'Heat Mapping Services', desc: 'Visualize user behaviour to eliminate friction and lift conversions.', href: '/seo/heat-mapping-services/' },
]

const features = [
  'Technical SEO audits',
  'On-page & off-page optimization',
  'GEO / AEO for AI search engines',
  'Google Business Profile management',
  'Competitor gap analysis',
  'Monthly performance reports',
]

export default function SEOPage() {
  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Service</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            SEO / <span className="gradient-text">GEO</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Long-lasting organic search results on Google and next-generation AI search engines.
          </p>
        </div>

        <div className="p-10 bg-white/5 border border-brand-amber/20 rounded-3xl mb-16">
          <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">What's Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand-amber flex-shrink-0" />
                <p className="text-white/70 text-sm">{f}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {subServices.map((s) => (
            <a
              key={s.title}
              href={s.href}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-brand-amber/40 transition-all duration-300 group block"
            >
              <h3 className="font-bold text-white text-xl mb-3 group-hover:text-brand-amber transition-colors">{s.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
            </a>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/contact/"
            className="inline-flex items-center gap-2 px-10 py-5 bg-brand-amber text-brand-brown font-bold text-lg rounded-full hover:bg-brand-amber-light transition-all duration-300 hover:scale-105 amber-glow"
          >
            Start Ranking Today
          </Link>
        </div>
      </div>
    </div>
  )
}
