import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const steps = [
  { number: '01', title: 'Get In Touch', description: 'Contact us and let us know about your goals, current challenges, and vision.', href: '/contact/', cta: 'Learn more' },
  { number: '02', title: 'Develop Website', description: 'Our team designs and develops a high-performance, SEO-optimized website tailored for you.', href: '/web-design/', cta: 'Learn more' },
  { number: '03', title: 'Market Website', description: 'We execute a comprehensive digital marketing strategy to drive traffic and conversions.', href: '/internet-marketing/', cta: 'Learn more' },
]

export default function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-32 bg-brand-brown overflow-hidden" aria-labelledby="how-it-works-heading">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-amber to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-amber to-transparent" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-20">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Our Process</p>
          <h2 id="how-it-works-heading" className="font-display text-4xl md:text-5xl font-bold text-white">
            How It <span className="gradient-text">Works</span>
          </h2>
        </motion.div>
        <div className="relative">
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-amber/40 to-transparent" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <motion.div key={step.number} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: i * 0.15 }} className="relative text-center group">
                <div className="relative inline-flex items-center justify-center mb-8">
                  <motion.div whileHover={{ scale: 1.1 }} className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-amber to-brand-amber flex items-center justify-center shadow-2xl amber-glow">
                    <span className="font-display text-4xl font-bold text-brand-brown">{step.number}</span>
                  </motion.div>
                  <div className="absolute inset-0 rounded-full border-2 border-brand-amber/30 animate-ping" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4 group-hover:text-brand-amber transition-colors">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6 max-w-xs mx-auto">{step.description}</p>
                <Link to={step.href} className="inline-flex items-center gap-1 text-brand-amber font-semibold text-sm hover:underline">{step.cta}</Link>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }} className="mt-20 relative p-10 bg-gradient-to-br from-brand-amber/10 to-brand-brown-dark/50 border border-brand-amber/30 rounded-3xl text-center overflow-hidden">
          <div className="absolute inset-0 rounded-3xl bg-brand-amber/5 pointer-events-none" />
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">Get Your Price Estimate!</h3>
          <p className="text-white/60 mb-6 text-base">Calculate the price of your dream website. We're excited to bring your vision to life!</p>
          <Link to="/website-calculator/" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-amber text-brand-brown font-bold rounded-full hover:bg-brand-amber-light transition-all duration-300 hover:scale-105 amber-glow">
            Calculate My Price
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
