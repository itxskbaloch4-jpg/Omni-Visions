import { useEffect } from 'react'
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

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AppInner() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

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
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
