import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="call-to-action" className="relative py-32 bg-brand-amber overflow-hidden" aria-label="Call to Action">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-brown/20 rounded-full blur-3xl" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} className="absolute top-1/2 right-10 w-64 h-64 rounded-full border border-brand-brown/20" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-brand-brown mb-6 leading-tight">Get Started Today</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-8 text-brand-brown/80 font-medium text-lg">
            <span className="flex items-center gap-2">✓ Get more visitors</span>
            <span className="hidden md:block">·</span>
            <span className="flex items-center gap-2">✓ Turn visitors into customers</span>
            <span className="hidden md:block">·</span>
            <span className="flex items-center gap-2">✓ Monitor website performance</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <motion.a href="tel:+15146556276" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-3 px-8 py-4 bg-brand-brown text-white font-bold text-base rounded-full hover:opacity-90 transition-all duration-300 shadow-xl">
              <Phone className="w-5 h-5" />(514)-655-6276
            </motion.a>
            <motion.a href="/contact/" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-3 px-8 py-4 bg-white text-brand-brown font-bold text-base rounded-full hover:bg-white/90 transition-all duration-300 shadow-xl">
              <Mail className="w-5 h-5" />Free Quote
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
