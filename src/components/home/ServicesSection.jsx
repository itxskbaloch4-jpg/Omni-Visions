import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const services = [
  { title: 'Web Design', href: '/web-design/', icon: '🖥️', description: 'Professional web design and development including WordPress, WooCommerce, Shopify, and custom HTML websites. Each site is developed for maximum search engine exposure and load speed.' },
  { title: 'SEO / GEO', href: '/seo/', icon: '🚀', description: 'Rank higher in organic search results on Google.ca and Google.com. We target the most profitable keywords using advanced on-page and off-page SEO techniques.' },
  { title: 'Google Ads', href: '/google-ads/', icon: '🎯', description: 'Unleash success with pay-per-click advertising, remarketing, retargeting, and local search marketing campaigns tailored to your business goals.' },
  { title: 'Social Media', href: '/social-media/', icon: '💬', description: 'Social media management, advertising, and marketing across all major platforms. Build relationships and exercise brand control with your target audience.' },
  { title: 'Digital Marketing', href: '/internet-marketing/', icon: '📧', description: 'Email marketing, call management, reviews cards, video production, HTML email signature design, and comprehensive digital marketing strategies.' },
  { title: 'AI Services', href: '/ai-photo-packages/', icon: '🤖', description: 'Cutting-edge AI-powered photo and video packages that take your visual content to the next level.' },
  { title: 'Livechat', href: '/livechat-packages/', icon: '💬', description: 'Real-time customer engagement with professional livechat packages that convert website visitors into leads.' },
  { title: 'Mini Packages', href: '/mini-packages/', icon: '📦', description: 'Maximize impact and minimize cost with our affordable mini packages designed for businesses of all sizes.' },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-32 bg-brand-brown-dark overflow-hidden" aria-labelledby="services-heading">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-brand-amber rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-brand-amber rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-brand-amber rounded-full" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">What We Offer</p>
          <h2 id="services-heading" className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            ROI-Driven{' '}<span className="gradient-text">Digital Marketing</span><br />Services
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">Website Design, SEO and Social Media solutions for businesses across Canada and the USA.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.08 }}>
              <Link to={service.href}>
                <div className="group relative h-full p-6 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-2xl hover:border-brand-amber/50 transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-amber/0 to-brand-amber/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand-amber opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_rgba(255,166,2,0.8)]" />
                  <div className="relative z-10">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
                    <h3 className="font-bold text-white text-xl mb-3 group-hover:text-brand-amber transition-colors duration-300">{service.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
