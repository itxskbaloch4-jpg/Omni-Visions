import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

const packages = [
  {
    name: 'Starter',
    price: '$299',
    images: '10 AI Photos',
    features: ['Professional headshots', '2 style variations', 'Commercial license', '5-day delivery'],
  },
  {
    name: 'Professional',
    price: '$599',
    images: '30 AI Photos',
    features: ['Headshots + lifestyle', '5 style variations', 'Commercial license', 'Brand kit integration', '3-day delivery'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '$1,199',
    images: '75 AI Photos',
    features: ['Full team shoots', 'Unlimited styles', 'Commercial license', 'Brand kit integration', 'Rush 48h delivery'],
  },
]

const features = [
  'Photorealistic AI-generated images',
  'No studio or photographer needed',
  'Consistent brand aesthetics',
  'Commercial usage rights included',
  'Fast turnaround — 48–72 hours',
  'Bilingual support (EN/FR)',
]

export default function AIPhotoPage() {
  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">AI-Powered</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            AI Photo <span className="gradient-text">Packages</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Professional-quality AI-generated photos for your team, brand, and marketing — without a studio.
          </p>
        </div>

        <div className="p-10 bg-white/5 border border-brand-amber/20 rounded-3xl mb-16">
          <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">Why AI Photos?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand-amber flex-shrink-0" />
                <p className="text-white/70 text-sm">{f}</p>
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
              <p className="text-brand-amber text-sm mb-4">{pkg.images}</p>
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
