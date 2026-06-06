import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

const subServices = [
  { title: 'Web Design Packages', desc: 'Beautiful, fast, SEO-ready websites tailored to your brand and budget.', href: '/web-design/web-design-packages/' },
  { title: 'Website Maintenance', desc: 'Keep your site secure, updated, and performing at its best.', href: '/web-design/website-maintenance-services/' },
  { title: 'Website Security & CDN', desc: 'SSL, firewall, DDoS protection, and global content delivery.', href: '/web-design/website-security-cdn/' },
  { title: 'Montreal Web Hosting', desc: 'Reliable, fast Canadian hosting with 99.9% uptime guarantee.', href: '/web-design/web-hosting/' },
  { title: 'Graphic Design', desc: 'Brochures, banners, social assets, and full brand identity design.', href: '/web-design/graphic-design/' },
  { title: 'Logo Design', desc: 'Professional logo design that captures your brand essence.', href: '/web-design/logo-design/' },
]

const features = [
  'Mobile-first responsive design',
  'SEO-optimized code structure',
  'Fast load times & Core Web Vitals',
  'Bilingual (EN/FR) websites',
  'WordPress & custom HTML/CSS',
  'Conversion rate optimization',
]

export default function WebDesignPage() {
  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Service</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Web <span className="gradient-text">Design</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Professional web design and development for businesses across Montreal, Canada, and the USA.
          </p>
        </div>

        {/* Feature list */}
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

        {/* Sub-services */}
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
            Get a Free Quote
          </Link>
        </div>
      </div>
    </div>
  )
}
