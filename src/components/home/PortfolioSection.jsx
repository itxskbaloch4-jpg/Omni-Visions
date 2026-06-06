import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { X, ZoomIn } from 'lucide-react'

const staticProjects = [
  { title: 'Copicom Responsive Web Design', category: 'Web Design', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/copicom-responsive-web-design-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/copicom-responsive-web-design.jpg' },
  { title: 'Copicom Web Development', category: 'Web Design', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Copicom-web-development-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Copicom-web-development.jpg' },
  { title: 'Darlene Wong Graphic Design', category: 'Graphic Design', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/darleenwong-graphic-design-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/darleenwong-graphic-design.jpg' },
  { title: 'Hypotheque Web Site Creation', category: 'Web Design', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Hypotheque-web-site-creation-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Hypotheque-web-site-creation.jpg' },
  { title: 'Omnivision Design Montreal', category: 'Web Design', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/omnivision-design-montreal-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/omnivision-design-montreal.jpg' },
  { title: 'Omnivision Web Portfolio', category: 'Web Design', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/omnivision-design-web-portfolio-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/omnivision-design-web-portfolio.jpg' },
  { title: 'Responsive Website Montreal', category: 'Web Design', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/responsive-website-montreal-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/responsive-website-montreal.jpg' },
  { title: 'Uni-Signal Web Development', category: 'Web Development', thumb: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Uni-signal-web-development-thumb.jpg', full: 'https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/portfolio/Uni-signal-web-development.jpg' },
]

export default function PortfolioSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [projects, setProjects] = useState(staticProjects)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch('/api/portfolio', { signal: AbortSignal.timeout(3000) })
        if (!res.ok) throw new Error('not ok')
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) setProjects(data)
      } catch { /* use static */ }
    }
    fetchPortfolio()
  }, [])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selected])

  return (
    <section ref={ref} className="relative py-32 bg-brand-brown overflow-hidden" aria-labelledby="portfolio-heading">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-6">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Our Work</p>
          <h2 id="portfolio-heading" className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            Some Creative <span className="gradient-text">Work</span>
          </h2>
          <p className="text-white/60 text-base max-w-2xl mx-auto">
            Omnivision offers Montreal internet marketing services to small, medium &amp; large businesses, primarily located in Montreal.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
          {projects.map((project, i) => (
            <motion.div key={project.title} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.07 }} className="group relative aspect-[3/2] rounded-xl overflow-hidden border border-white/10 hover:border-brand-amber/50 cursor-pointer transition-all duration-300" onClick={() => setSelected(project)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setSelected(project)} aria-label={`Preview ${project.title}`}>
              <img src={project.thumb} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-brand-brown-dark/0 group-hover:bg-brand-brown-dark/70 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2 text-center px-3">
                  <ZoomIn className="w-8 h-8 text-brand-amber" />
                  <span className="text-white text-xs font-semibold leading-tight">{project.title}</span>
                  <span className="text-brand-amber text-[10px] uppercase tracking-wider">{project.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.7 }} className="text-center mt-12">
          <Link to="/our-work/" className="inline-flex items-center gap-2 px-8 py-4 border border-brand-amber text-brand-amber font-semibold rounded-xl hover:bg-brand-amber hover:text-brand-brown transition-all duration-300">
            View Full Portfolio
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm" onClick={() => setSelected(null)} aria-modal="true" role="dialog" aria-label={selected.title}>
            <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }} className="relative max-w-4xl w-full bg-brand-brown rounded-2xl overflow-hidden border border-brand-amber/30 shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelected(null)} className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-brand-brown-dark/80 border border-white/20 flex items-center justify-center text-white hover:text-brand-amber hover:border-brand-amber transition-all duration-200" aria-label="Close preview">
                <X className="w-4 h-4" />
              </button>
              <div className="relative w-full aspect-[4/3] bg-brand-brown-dark">
                <img src={selected.full} alt={selected.title} className="w-full h-full object-contain" />
              </div>
              <div className="px-6 py-4 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-base">{selected.title}</p>
                  <p className="text-brand-amber text-xs uppercase tracking-wider mt-0.5">{selected.category}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
