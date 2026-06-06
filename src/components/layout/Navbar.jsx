import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ChevronDown, Phone, Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/' },
  {
    label: 'About', href: '/web-marketing-agency/',
    children: [
      { label: 'Why Choose Us', href: '/web-marketing-agency/#why-choose-us' },
      { label: 'Team', href: '/team/' },
      { label: 'Clients', href: '/clients/' },
      { label: 'Testimonials', href: '/testimonials/' },
      { label: 'FAQ', href: '/faq/' },
      { label: 'Internship', href: '/internship/' },
    ],
  },
  {
    label: 'Services', href: '/services/',
    children: [
      { label: 'Web Design', href: '/web-design/' },
      { label: 'SEO / GEO', href: '/seo/' },
      { label: 'Google Ads', href: '/google-ads/' },
      { label: 'Social Media', href: '/social-media/' },
      { label: 'Digital Marketing', href: '/internet-marketing/' },
      { label: 'AI Photo Packages', href: '/ai-photo-packages/' },
      { label: 'AI Video Packages', href: '/ai-video-packages/' },
      { label: 'Livechat', href: '/livechat-packages/' },
      { label: 'Mini Packages', href: '/mini-packages/' },
    ],
  },
  { label: 'Our Work', href: '/our-work/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 })
    }
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-brand-brown/95 backdrop-blur-xl shadow-2xl border-b border-brand-amber/20' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0">
            <motion.div whileHover={{ scale: 1.05 }}>
              <img src="https://www.omnivisiondesign.com/wp-content/themes/omnivision/img/omnivision-logo-white.svg" alt="Omnivision Design Logo" className="h-10 w-auto" />
            </motion.div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group" onMouseEnter={() => setActiveDropdown(item.label)} onMouseLeave={() => setActiveDropdown(null)}>
                <Link to={item.href} className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white/90 hover:text-brand-amber transition-colors duration-200 rounded-lg hover:bg-white/5">
                  {item.label}
                  {item.children && <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />}
                </Link>
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-56 bg-brand-brown/98 backdrop-blur-xl border border-brand-amber/20 rounded-2xl shadow-2xl overflow-hidden"
                    >
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.href} className="block px-4 py-3 text-sm text-white/80 hover:text-brand-amber hover:bg-brand-amber/10 transition-all duration-200 border-b border-white/5 last:border-0">
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:514-655-6276" className="flex items-center gap-2 text-brand-amber font-semibold text-sm hover:text-brand-amber-light transition-colors">
              <Phone className="w-4 h-4" />(514)-655-6276
            </a>
            <motion.a href="/contact/" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-2.5 bg-brand-amber text-brand-brown font-bold text-sm rounded-full hover:bg-brand-amber-light transition-all duration-300 amber-glow">
              Request a Quote
            </motion.a>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-white hover:text-brand-amber transition-colors">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-brand-brown/98 backdrop-blur-xl border-t border-brand-amber/20 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link to={item.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-white hover:text-brand-amber hover:bg-white/5 rounded-lg transition-colors font-medium">
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 space-y-1">
                      {item.children.map((child) => (
                        <Link key={child.label} to={child.href} onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm text-white/70 hover:text-brand-amber transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/10">
                <a href="tel:514-655-6276" className="flex items-center gap-2 px-4 py-3 text-brand-amber font-semibold">
                  <Phone className="w-4 h-4" />(514)-655-6276
                </a>
                <a href="/contact/" className="block mt-2 px-6 py-3 bg-brand-amber text-brand-brown font-bold text-center rounded-full hover:bg-brand-amber-light transition-colors">
                  Request a Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
