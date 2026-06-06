import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const posts = [
  {
    title: 'Why Your Rankings Improved but Leads Did Not: How to Diagnose SEO Traffic Quality',
    href: '/why-your-rankings-improved-but-leads-did-not-how-to-diagnose-seo-traffic-quality/',
    date: 'June 5, 2026',
    image: 'https://www.omnivisiondesign.com/wp-content/uploads/2026/06/Diagnose-SEO-Traffic-Quality-450x300.webp',
  },
  {
    title: 'How to Build AEO Authority With Content',
    href: '/how-to-build-aeo-authority-with-content/',
    date: 'May 26, 2026',
    image: 'https://www.omnivisiondesign.com/wp-content/uploads/2026/05/Build-AEO-Authority-450x300.webp',
  },
  {
    title: 'How to Design a Website That Converts Visitors Into Leads',
    href: '/how-to-design-a-website-that-converts-visitors-into-leads/',
    date: 'May 15, 2026',
    image: 'https://www.omnivisiondesign.com/wp-content/uploads/2026/05/Design-a-Website-450x300.webp',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Knowledge Base</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Exclusive <span className="gradient-text">Insights</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Stay ahead with the latest digital marketing strategies, SEO tips, and web design trends.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.href}>
              <a href={post.href} className="group block">
                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-brand-amber/40 transition-all duration-300">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <time className="text-brand-amber text-xs font-semibold uppercase tracking-wider mb-3 block">{post.date}</time>
                <h2 className="font-bold text-white text-xl leading-snug group-hover:text-brand-amber transition-colors duration-300 mb-4">{post.title}</h2>
                <span className="inline-flex items-center gap-1 text-brand-amber text-sm font-semibold group-hover:gap-2 transition-all duration-300">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
