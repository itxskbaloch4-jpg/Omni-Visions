import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const technologies = [
  { name: 'WordPress', icon: '🌐', category: 'CMS' },
  { name: 'WooCommerce', icon: '🛒', category: 'E-Commerce' },
  { name: 'Shopify', icon: '🏪', category: 'E-Commerce' },
  { name: 'Next.js', icon: '⚡', category: 'Framework' },
  { name: 'React', icon: '⚛️', category: 'Framework' },
  { name: 'Google Ads', icon: '🎯', category: 'Advertising' },
  { name: 'Meta Ads', icon: '📢', category: 'Advertising' },
  { name: 'Google Analytics', icon: '📊', category: 'Analytics' },
  { name: 'Semrush', icon: '🔍', category: 'SEO' },
  { name: 'Ahrefs', icon: '🔗', category: 'SEO' },
  { name: 'Mailchimp', icon: '📧', category: 'Email' },
  { name: 'Figma', icon: '🎨', category: 'Design' },
]

export default function TechStack() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 bg-brand-brown-dark overflow-hidden" aria-labelledby="techstack-heading">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-14">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Our Tools</p>
          <h2 id="techstack-heading" className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Built With the <span className="gradient-text">Best</span>
          </h2>
          <p className="text-white/60 text-base max-w-xl mx-auto">We use industry-leading platforms and tools to deliver exceptional digital experiences.</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {technologies.map((tech, i) => (
            <motion.div key={tech.name} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: i * 0.06 }} className="group flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-brand-amber/50 hover:bg-white/10 transition-all duration-300">
              <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{tech.icon}</span>
              <span className="text-white text-xs font-semibold text-center leading-tight">{tech.name}</span>
              <span className="text-brand-amber/60 text-[10px] uppercase tracking-wider">{tech.category}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
