import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const posts = [
  { title: 'Why Your Rankings Improved but Leads Did Not: How to Diagnose SEO Traffic Quality', href: '/why-your-rankings-improved-but-leads-did-not-how-to-diagnose-seo-traffic-quality/', date: 'June 5, 2026', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2026/06/Diagnose-SEO-Traffic-Quality-450x300.webp' },
  { title: 'How to Build AEO Authority With Content', href: '/how-to-build-aeo-authority-with-content/', date: 'May 26, 2026', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2026/05/Build-AEO-Authority-450x300.webp' },
  { title: 'How to Design a Website That Converts Visitors Into Leads', href: '/how-to-design-a-website-that-converts-visitors-into-leads/', date: 'May 15, 2026', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2026/05/Design-a-Website-450x300.webp' },
]

export default function BlogSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-32 bg-brand-brown-dark overflow-hidden" aria-labelledby="blog-heading">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-4">
          <div>
            <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Latest Insights</p>
            <h2 id="blog-heading" className="font-display text-4xl md:text-5xl font-bold text-white">
              Exclusive <span className="gradient-text">Insights</span>
            </h2>
          </div>
          <Link to="/blog/" className="flex items-center gap-2 text-brand-amber font-semibold hover:gap-3 transition-all duration-300">
            View All Posts <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article key={post.href} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.12 }}>
              <a href={post.href} className="group block">
                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-brand-amber/40 transition-all duration-300">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-brand-brown/20 group-hover:bg-brand-brown/10 transition-colors duration-300" />
                </div>
                <time className="text-brand-amber text-xs font-semibold uppercase tracking-wider mb-3 block">{post.date}</time>
                <h3 className="font-bold text-white text-lg leading-snug group-hover:text-brand-amber transition-colors duration-300 mb-4">{post.title}</h3>
                <span className="inline-flex items-center gap-1 text-brand-amber text-sm font-semibold group-hover:gap-2 transition-all duration-300">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
