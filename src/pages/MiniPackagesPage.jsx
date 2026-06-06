import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

const packages = [
  {
    name: 'Mini SEO',
    price: '$220/mo',
    features: ['5 keyword optimizations', 'Monthly on-page update', 'Google Business Profile update', 'Monthly report'],
  },
  {
    name: 'Mini Web + SEO',
    price: '$395/mo',
    features: ['Mini SEO included', '1 website content update/mo', 'Speed & security check', 'Quarterly redesign consult'],
    highlight: true,
  },
  {
    name: 'Mini Google Ads',
    price: '$295/mo',
    features: ['Campaign setup & management', 'Up to $500 ad spend managed', 'Keyword & bid optimization', 'Monthly report'],
  },
]

const goodFor = [
  'Small local businesses',
  'Startups on a tight budget',
  'Service professionals (lawyers, dentists, etc.)',
  'Seasonal or part-time businesses',
  'Businesses new to digital marketing',
  'Anyone wanting to test before scaling',
]

export default function MiniPackagesPage() {
  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Affordable Plans</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Mini <span className="gradient-text">Packages</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Enterprise-level digital marketing expertise at a price that works for small businesses — starting at just $220/month.
          </p>
        </div>

        <div className="p-10 bg-white/5 border border-brand-amber/20 rounded-3xl mb-16">
          <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">Who It's For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {goodFor.map((g) => (
              <div key={g} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand-amber flex-shrink-0" />
                <p className="text-white/70 text-sm">{g}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`p-8 rounded-3xl border transition-all duration-300 flex flex-col ${
                pkg.highlight
                  ? 'bg-gradient-to-br from-brand-amber/20 to-brand-amber/5 border-brand-amber shadow-2xl scale-105'
                  : 'bg-white/5 border-white/10 hover:border-brand-amber/40'
              }`}
            >
              {pkg.highlight && (
                <span className="inline-block px-3 py-1 bg-brand-amber text-brand-brown text-xs font-bold uppercase tracking-wider rounded-full mb-4 self-start">
                  Best Value
                </span>
              )}
              <h3 className="font-display text-2xl font-bold text-white mb-4">{pkg.name}</h3>
              <p className="font-display text-3xl font-bold text-brand-amber mb-6">{pkg.price}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-white/70 text-sm">
                    <CheckCircle className="w-4 h-4 text-brand-amber flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact/"
                className={`w-full py-3 rounded-xl font-bold text-center transition-all duration-300 block ${
                  pkg.highlight
                    ? 'bg-brand-amber text-brand-brown hover:bg-brand-amber-light amber-glow'
                    : 'bg-white/10 text-white hover:bg-brand-amber hover:text-brand-brown'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-white/50 text-sm">
          Need something bigger?{' '}
          <Link to="/services/" className="text-brand-amber hover:underline">
            View all service packages
          </Link>
        </p>
      </div>
    </div>
  )
}
