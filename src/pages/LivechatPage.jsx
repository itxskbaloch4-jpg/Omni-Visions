import { Link } from 'react-router-dom'
import { CheckCircle, MessageCircle } from 'lucide-react'

const packages = [
  {
    name: 'Basic',
    price: '$220/mo',
    features: ['Live chat widget setup', 'Business hours coverage', 'Lead capture & routing', 'Monthly report'],
  },
  {
    name: 'Professional',
    price: '$395/mo',
    features: ['24/7 chat coverage', 'Bilingual agents (EN/FR)', 'CRM integration', 'Proactive chat triggers', 'Weekly report'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: ['Dedicated chat team', 'Full CRM workflow', 'Custom scripts', 'API integrations', 'Real-time dashboard'],
  },
]

const benefits = [
  'Convert more website visitors into leads',
  'Respond to customers in real time',
  'Bilingual support (English & French)',
  'Seamless handoff to your sales team',
  'Reduce bounce rate & cart abandonment',
  'Full setup included — no tech skills needed',
]

export default function LivechatPage() {
  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Service</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Livechat <span className="gradient-text">Packages</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Turn your website visitors into customers with real-time bilingual live chat support.
          </p>
        </div>

        <div className="p-10 bg-white/5 border border-brand-amber/20 rounded-3xl mb-16">
          <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">Key Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div key={b} className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-brand-amber flex-shrink-0" />
                <p className="text-white/70 text-sm">{b}</p>
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
      </div>
    </div>
  )
}
