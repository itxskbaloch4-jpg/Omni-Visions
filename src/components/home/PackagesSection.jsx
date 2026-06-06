import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const packages = [
  { title: 'Web Design', price: '$3,300', period: '', tagline: 'Elevate your online presence with our Web Design Packages', href: '/web-design/web-design-packages/', featured: false },
  { title: 'SEO', price: '$595', period: '/mo', tagline: 'Unlock visibility and dominate searches with our SEO Packages', href: '/seo/seo-packages/', featured: true },
  { title: 'Google Ads', price: '$385', period: '/mo', tagline: 'Unleash success with our Google Ads Packages', href: '/google-ads/google-ads-packages/', featured: false },
  { title: 'Social', price: '$385', period: '/mo', tagline: "Ignite your brand's social buzz with our Social Media Packages", href: '/social-media/social-media-packages/', featured: false },
  { title: 'Email', price: '$385', period: '/mo', tagline: 'Elevate your outreach with our Email Marketing Packages', href: '/internet-marketing/email-marketing/', featured: false },
  { title: 'Mini', price: '$220', period: '/mo', tagline: 'Maximize impact and minimize cost with our Mini Packages', href: '/mini-packages/', featured: false },
]

export default function PackagesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-32 bg-brand-brown overflow-hidden" aria-labelledby="packages-heading">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-amber/5 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Pricing</p>
          <h2 id="packages-heading" className="font-display text-4xl md:text-5xl font-bold text-white">
            Our <span className="gradient-text">Packages</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => (
            <motion.div key={pkg.title} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.08 }} className={`relative group ${pkg.featured ? 'lg:-mt-4 lg:mb-4' : ''}`}>
              {pkg.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1 bg-brand-amber text-brand-brown text-xs font-bold rounded-full">Most Popular</div>}
              <div className={`h-full p-8 rounded-3xl border transition-all duration-500 hover:-translate-y-2 ${pkg.featured ? 'bg-gradient-to-br from-brand-amber/20 to-brand-amber/5 border-brand-amber/50 shadow-2xl amber-glow' : 'bg-gradient-to-br from-white/5 to-transparent border-white/10 hover:border-brand-amber/40'}`}>
                <h3 className="font-display text-2xl font-bold text-white mb-6">{pkg.title}</h3>
                <div className="mb-6">
                  <span className="text-xs text-white/50 uppercase tracking-wider">Starting at</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-display text-5xl font-bold text-brand-amber">{pkg.price}</span>
                    {pkg.period && <span className="text-white/60 text-base">{pkg.period}</span>}
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-8">{pkg.tagline}</p>
                <Link to={pkg.href} className={`block w-full text-center py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${pkg.featured ? 'bg-brand-amber text-brand-brown hover:bg-brand-amber-light' : 'border border-brand-amber/40 text-brand-amber hover:bg-brand-amber/10'}`}>
                  Learn More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
