import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

const subServices = [
  { title: 'Social Media Packages', desc: 'Monthly social media management plans with content creation and scheduling.', href: '/social-media/social-media-packages/' },
  { title: 'LinkedIn B2B Packages', desc: 'Targeted LinkedIn marketing to reach decision-makers and generate B2B leads.', href: '/b2b-linkedin-marketing/' },
  { title: 'LinkedIn CVs', desc: 'Professional LinkedIn profile optimization for executives and job seekers.', href: '/linkedin-cvs/' },
  { title: 'Social Media Management', desc: 'We handle your social presence so you can focus on running your business.', href: '/social-media/social-media-management/' },
  { title: 'Social Media Advertising', desc: 'Paid social campaigns on Facebook, Instagram, LinkedIn, and more.', href: '/social-media/social-media-advertising/' },
  { title: 'Social Media Marketing Agency', desc: 'Full-service agency support for brands serious about social growth.', href: '/social-media/social-media-marketing-agency/' },
]

const features = [
  'Content creation & scheduling',
  'Facebook & Instagram Ads',
  'LinkedIn B2B outreach',
  'Community management',
  'Monthly analytics reports',
  'Hashtag & trend research',
]

export default function SocialMediaPage() {
  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Service</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Social <span className="gradient-text">Media</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Strategic social media marketing that builds your brand, grows your audience, and drives real results.
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
            Grow My Social Presence
          </Link>
        </div>
      </div>
    </div>
  )
}
