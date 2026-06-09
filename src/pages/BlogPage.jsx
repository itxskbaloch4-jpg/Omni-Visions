import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_URL || '/api'
    fetch(`${API_BASE}/blog?status=published&limit=10`)
      .then((r) => {
        if (!r.ok) throw new Error('Failed to fetch posts')
        return r.json()
      })
      .then((data) => {
        setPosts(data.data || [])
      })
      .catch((err) => {
        console.error(err)
        setError('Could not load posts. Please try again later.')
      })
      .finally(() => setLoading(false))
  }, [])

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

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse">
                <div className="aspect-[3/2] rounded-2xl bg-white/10 mb-6" />
                <div className="h-3 bg-white/10 rounded mb-3 w-1/3" />
                <div className="h-5 bg-white/10 rounded mb-2" />
                <div className="h-5 bg-white/10 rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-center text-red-400">{error}</p>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="text-center text-white/50">No posts published yet.</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post._id || post.slug}>
                <a href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-6 border border-white/10 group-hover:border-brand-amber/40 transition-all duration-300">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span className="text-white/20 text-sm">No image</span>
                      </div>
                    )}
                  </div>
                  <time className="text-brand-amber text-xs font-semibold uppercase tracking-wider mb-3 block">
                    {post.publishedAt
                      ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                      : ''}
                  </time>
                  <h2 className="font-bold text-white text-xl leading-snug group-hover:text-brand-amber transition-colors duration-300 mb-4">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-white/50 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-brand-amber text-sm font-semibold group-hover:gap-2 transition-all duration-300">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
          }
