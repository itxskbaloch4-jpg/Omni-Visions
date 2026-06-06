import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Play, X } from 'lucide-react'

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [videoOpen, setVideoOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = videoOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [videoOpen])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setVideoOpen(false) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <section id="about" ref={ref} className="relative py-32 bg-brand-brown overflow-hidden" aria-labelledby="about-heading">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-amber/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-amber/5 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, ease: 'easeOut' }}>
            <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Who We Are</p>
            <h2 id="about-heading" className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Your Montreal Digital Marketing, SEO &amp;{' '}
              <span className="gradient-text">Web Design Agency</span>
            </h2>
            <p className="text-white/70 leading-relaxed mb-6 text-base">
              Omnivision Design is a digital marketing agency in Montreal that offers a unique combination of highly specialized digital marketing services (primarily SEO-related) to small and medium-sized businesses. In addition to professional web design and development, Omnivision Design has the best quality web marketing strategy in-store, guaranteed to take your company's marketing plan to the next level.
            </p>
            <p className="text-white/70 leading-relaxed mb-8 text-base">
              Let the top digital marketing company in Montreal help you achieve your financial objectives, boost your bottom line, and improve your position in the search engine results pages (SERPs) of Google and other search engines.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/web-marketing-agency/" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-amber text-brand-brown font-bold rounded-full hover:bg-brand-amber-light transition-all duration-300 hover:scale-105 amber-glow">
                Learn More About Us
              </Link>
              <button onClick={() => setVideoOpen(true)} className="group inline-flex items-center gap-3 px-6 py-4 border border-brand-amber/40 text-brand-amber font-semibold rounded-full hover:bg-brand-amber/10 transition-all duration-300" aria-label="Watch video">
                <span className="w-8 h-8 rounded-full bg-brand-amber flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-3 h-3 text-brand-brown fill-brand-brown ml-0.5" />
                </span>
                Watch Video
              </button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 60 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }} className="grid grid-cols-2 gap-4">
            {[
              { title: 'Web Design', desc: 'Creation and development of a website, including programming and content integration.', icon: '🎨' },
              { title: 'SEM', desc: 'Pay-per-click advertising — pay-as-you-go system that lets you pay per lead visiting your website.', icon: '📈' },
              { title: 'SEO', desc: 'Rank higher in organic search results and attract more visitors to your site.', icon: '🔍' },
              { title: 'Social Media', desc: 'Connect with prospective customers and build relationships while exercising brand control.', icon: '📱' },
            ].map((service, i) => (
              <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }} whileHover={{ y: -5, scale: 1.02 }} className="relative p-6 bg-white/5 border border-brand-amber/20 rounded-2xl backdrop-blur-sm hover:border-brand-amber/50 transition-all duration-300 group">
                <div className="text-3xl mb-3">{service.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-brand-amber transition-colors">{service.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{service.desc}</p>
                <div className="absolute inset-0 rounded-2xl bg-brand-amber/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {videoOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" onClick={() => setVideoOpen(false)} aria-modal="true" role="dialog" aria-label="Video">
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }} className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border border-brand-amber/30 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setVideoOpen(false)} className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:text-brand-amber hover:border-brand-amber transition-all duration-200" aria-label="Close video">
                <X className="w-4 h-4" />
              </button>
              <iframe src="https://www.youtube.com/embed/SmbW8yaxUQg?autoplay=1&color=white" title="Omnivision Design" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
