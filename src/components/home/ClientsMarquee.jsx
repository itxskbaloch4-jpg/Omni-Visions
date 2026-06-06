import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const clients = [
  { name: 'Syneos Health', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2021/07/syneos-health-logo.png' },
  { name: 'Mobi724', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2021/07/mobi724_logo.png' },
  { name: 'Alarme Signal', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2021/07/alarme-signal_logo.png' },
  { name: 'Kyocera', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2021/07/kyocera_logo.png' },
  { name: 'Aeroplan', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2021/07/aeroplan_logo-1.png' },
  { name: 'Airbnb', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2021/07/airbnb_logo.png' },
  { name: 'Luxury Retreats', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/graphic-design-luxury-retreats.jpg' },
  { name: 'Air Canada', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/graphics-air-canada.png' },
  { name: 'Telus', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/telus-logo.png' },
  { name: 'Terrasses Bonsecours', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/livechat-service-terrasses-bonsecours.png' },
  { name: 'hGregoire', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/seo-marketing-hgregoire.jpg' },
  { name: 'Sphinx Resources', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/web-design-seo-sphinx-resources-1.png' },
  { name: 'Multi Prets', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/web-design-multi-prets.png' },
  { name: 'Rosdev', logo: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/web-design-rosdev.png' },
]

export default function ClientsMarquee() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 bg-brand-brown overflow-hidden" aria-label="Our Clients">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Trusted By</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Our <span className="gradient-text">Clients</span>
          </h2>
        </motion.div>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-brown to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-brown to-transparent z-10 pointer-events-none" />
        <div className="flex gap-12 animate-marquee" style={{ width: 'max-content' }}>
          {[...clients, ...clients].map((client, i) => (
            <div key={i} className="flex-shrink-0 flex items-center justify-center w-40 h-20 px-4 bg-white/5 border border-white/10 rounded-xl hover:border-brand-amber/30 transition-all duration-300 group">
              <img src={client.logo} alt={client.name} className="object-contain max-h-12 w-full filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
