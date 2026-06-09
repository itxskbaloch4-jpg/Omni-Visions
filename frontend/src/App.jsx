import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import ClientsPage from './pages/ClientsPage'
import ContactPage from './pages/ContactPage'
import FAQPage from './pages/FAQPage'
import OurWorkPage from './pages/OurWorkPage'
import ServicesPage from './pages/ServicesPage'
import TestimonialsPage from './pages/TestimonialsPage'
import TeamPage from './pages/TeamPage'
import InternshipPage from './pages/InternshipPage'
import WebDesignPage from './pages/WebDesignPage'
import SEOPage from './pages/SEOPage'
import GoogleAdsPage from './pages/GoogleAdsPage'
import SocialMediaPage from './pages/SocialMediaPage'
import DigitalMarketingPage from './pages/DigitalMarketingPage'
import AIPhotoPage from './pages/AIPhotoPage'
import AIVideoPage from './pages/AIVideoPage'
import LivechatPage from './pages/LivechatPage'
import MiniPackagesPage from './pages/MiniPackagesPage'
import AdminApp from './admin/AdminApp'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-brand-brown-dark flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-8xl font-bold text-brand-amber mb-4">404</h1>
        <p className="text-white/60 text-xl mb-8">Page not found</p>
        <a href="/" className="inline-block px-8 py-3 bg-brand-amber text-brand-brown font-bold rounded-xl hover:bg-brand-amber-light transition-colors">
          Back to Home
        </a>
      </div>
    </div>
  )
}

// Lenis lives at the root level — one instance, never recreated on route change
function LenisProvider() {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (lenisRef.current) return
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return null
}

function AppInner() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/web-marketing-agency/*" element={<AboutPage />} />
          <Route path="/blog/*" element={<BlogPage />} />
          <Route path="/clients/*" element={<ClientsPage />} />
          <Route path="/contact/*" element={<ContactPage />} />
          <Route path="/faq/*" element={<FAQPage />} />
          <Route path="/our-work/*" element={<OurWorkPage />} />
          <Route path="/services/*" element={<ServicesPage />} />
          <Route path="/testimonials/*" element={<TestimonialsPage />} />
          <Route path="/team/*" element={<TeamPage />} />
          <Route path="/internship/*" element={<InternshipPage />} />
          <Route path="/web-design/*" element={<WebDesignPage />} />
          <Route path="/seo/*" element={<SEOPage />} />
          <Route path="/google-ads/*" element={<GoogleAdsPage />} />
          <Route path="/social-media/*" element={<SocialMediaPage />} />
          <Route path="/internet-marketing/*" element={<DigitalMarketingPage />} />
          <Route path="/ai-photo-packages/*" element={<AIPhotoPage />} />
          <Route path="/ai-video-packages/*" element={<AIVideoPage />} />
          <Route path="/livechat-packages/*" element={<LivechatPage />} />
          <Route path="/mini-packages/*" element={<MiniPackagesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LenisProvider />
      <Routes>
        {/* Admin panel — completely separate layout, no Lenis/Navbar/Footer */}
        <Route path="/ov-admin/*" element={<AdminApp />} />
        {/* Main website */}
        <Route path="/*" element={<AppInner />} />
      </Routes>
    </BrowserRouter>
  )
  }
