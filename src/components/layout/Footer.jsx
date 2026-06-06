import { Link } from 'react-router-dom'
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const footerLinks = [
  { label: 'About', href: '/web-marketing-agency/' },
  { label: 'Clients', href: '/clients/' },
  { label: 'Services', href: '/services/' },
  { label: 'Testimonials', href: '/testimonials/' },
  { label: 'FAQ', href: '/faq/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Sitemap', href: '/sitemap/' },
  { label: 'Privacy Policy', href: '/privacy-policy/' },
]

const latestPosts = [
  { title: 'Why Your Rankings Improved but Leads Did Not: How to Diagnose SEO Traffic Quality', href: '/why-your-rankings-improved-but-leads-did-not-how-to-diagnose-seo-traffic-quality/', date: 'June 5, 2026' },
  { title: 'How to Build AEO Authority With Content', href: '/how-to-build-aeo-authority-with-content/', date: 'May 26, 2026' },
  { title: 'How to Design a Website That Converts Visitors Into Leads', href: '/how-to-design-a-website-that-converts-visitors-into-leads/', date: 'May 15, 2026' },
]

export default function Footer() {
  return (
    <footer className="relative bg-brand-brown-dark border-t border-brand-amber/20 overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-amber rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-amber rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <h3 className="text-brand-amber font-bold text-lg mb-4 font-display">About Us</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Omnivision Design is a Montreal Web Marketing Company, offering internet marketing services to small, medium and large businesses including public companies, and has the best quality web marketing strategy for companies in any industry.
            </p>
          </div>
          <div>
            <h3 className="text-brand-amber font-bold text-lg mb-4 font-display">Contact Us</h3>
            <address className="not-italic text-sm text-white/70 space-y-2">
              <p>106-7470 Sherbrooke St W.</p>
              <p>Montreal, Quebec Canada H4B 1S5</p>
              <p className="mt-2">6860 Chester Ave</p>
              <p>Montreal, Quebec</p>
              <p>Canada H4V 1K6</p>
              <p className="mt-3">
                <a href="tel:514-655-6276" className="text-brand-amber font-semibold hover:text-brand-amber-light transition-colors">(514) 655-6276</a>
              </p>
            </address>
          </div>
          <div>
            <h3 className="text-brand-amber font-bold text-lg mb-4 font-display">Latest Posts</h3>
            <ul className="space-y-3">
              {latestPosts.map((post) => (
                <li key={post.href}>
                  <Link to={post.href} className="text-sm text-white/70 hover:text-brand-amber transition-colors leading-snug block">{post.title}</Link>
                  <span className="text-xs text-white/40 mt-1 block">{post.date}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-brand-amber font-bold text-lg mb-4 font-display">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-white/70 hover:text-brand-amber transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/">
            <img src="https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/omnivision-logo-white.svg" alt="Omnivision Design" className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity" />
          </Link>
          <div className="flex items-center gap-4">
            {[
              { icon: Facebook, href: 'https://www.facebook.com/omnivision.design', label: 'Facebook' },
              { icon: Twitter, href: 'https://twitter.com/omnivisiondes', label: 'Twitter' },
              { icon: Linkedin, href: 'http://ca.linkedin.com/in/omnivisiondesign', label: 'LinkedIn' },
              { icon: Instagram, href: 'https://www.instagram.com/omnivisiondesign/', label: 'Instagram' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/70 hover:text-brand-amber hover:border-brand-amber hover:bg-brand-amber/10 transition-all duration-300">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
          <p className="text-sm text-white/40">© {new Date().getFullYear()} Omnivision Design. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
