import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

const packages = [
  {
    name: 'Starter',
    price: '$499',
    deliverable: '1 AI Video (up to 30s)',
    features: ['Script writing', '1 revision round', 'HD 1080p export', '7-day delivery'],
  },
  {
    name: 'Professional',
    price: '$999',
    deliverable: '3 AI Videos (up to 60s ea.)',
    features: ['Script writing', '3 revision rounds', '4K export', 'Brand voice & colours', '5-day delivery'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '$1,999',
    deliverable: '8 AI Videos (custom length)',
    features: ['Full script production', 'Unlimited revisions', '4K + vertical formats', 'Multi-platform delivery', 'Rush 72h delivery'],
  },
]

const useCases = [
  'Website hero & explainer videos',
  'Google & YouTube Ads',
  'Social media reels & shorts',
  'Product demos & testimonials',
  'Real estate walkthroughs',
  'Corporate presentations',
]

export default function AIVideoPage() {
  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">AI-Powered</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            AI Video <span className="gradient-text">Packages</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Cinematic AI-generated videos for your brand, ads, and social channels — at a fraction of traditional production costs.
          </p>
        </div>

        <div className="p-10 bg-white/5 border border-brand-amber/20 rounded-3xl mb-16">
          <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {useCases.map((u) => (
              <div key={u} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand-amber flex-shrink-0" />
                <p className="text-white/70 text-sm">{u}</p>
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
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-2xl font-bold text-white mb-1">{pkg.name}</h3>
              <p className="text-brand-amber text-sm mb-4">{pkg.deliverable}</p>
              <p className="font-display text-4xl font-bold text-white mb-6">{pkg.price}</p>
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
      </div>
    </div>
  )
}
