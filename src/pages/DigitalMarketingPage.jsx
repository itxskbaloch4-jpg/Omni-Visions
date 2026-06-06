import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

const subServices = [
  { title: 'Email Marketing Packages', desc: 'Automated email campaigns that nurture leads and drive repeat sales.', href: '/internet-marketing/email-marketing/' },
  { title: 'Call Management', desc: 'Track, record, and route inbound calls to optimize your sales process.', href: '/call-management-services/' },
  { title: 'Reviews Cards', desc: 'Physical and digital tools to collect 5-star Google reviews effortlessly.', href: '/internet-marketing/reviews-cards/' },
  { title: 'Negative Review Removal', desc: 'Professional strategies to remove or suppress damaging Google reviews.', href: '/negative-google-review-removal/' },
  { title: 'Video Production', desc: 'Professional video content for your website, ads, and social channels.', href: '/web-design/video/' },
  { title: 'Affiliate Marketing', desc: 'Build a performance-based affiliate program to grow revenue with partners.', href: '/internet-marketing/affiliate-marketing/' },
  { title: 'HTML Email Signature Design', desc: 'Branded, clickable email signatures for your entire team.', href: '/internet-marketing/html-email-signature-design-service/' },
  { title: 'Digital Marketing Consultant', desc: 'One-on-one consulting to audit and elevate your entire digital strategy.', href: '/internet-marketing/digital-marketing-consultant/' },
]

const features = [
  'Email automation & drip campaigns',
  'Call tracking & recording',
  'Online reputation management',
  'Affiliate program setup',
  'Video content strategy',
  'Full-funnel marketing strategy',
]

export default function DigitalMarketingPage() {
  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Service</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Digital <span className="gradient-text">Marketing</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Full-funnel digital marketing services to attract, convert, and retain customers online.
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
            Get a Free Consultation
          </Link>
        </div>
      </div>
    </div>
  )
}
