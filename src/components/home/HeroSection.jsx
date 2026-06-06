import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { ArrowDown, ChevronRight } from 'lucide-react'

export default function HeroSection() {
  const containerRef = useRef(null)
  const orbRef1 = useRef(null)
  const orbRef2 = useRef(null)
  const orbRef3 = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orbRef1.current, { y: -40, x: 20, duration: 6, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.to(orbRef2.current, { y: 30, x: -20, duration: 8, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1 })
      gsap.to(orbRef3.current, { y: -20, x: 30, duration: 7, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 2 })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const textVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] } }),
  }

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-brown-dark" aria-label="Hero Section">
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(rgba(255,166,2,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,166,2,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
      <div ref={orbRef1} className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-amber/20 rounded-full blur-3xl pointer-events-none" />
      <div ref={orbRef2} className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand-brown/40 rounded-full blur-3xl pointer-events-none" />
      <div ref={orbRef3} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-amber/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} className="w-[700px] h-[700px] rounded-full border border-brand-amber/10 opacity-50" style={{ transform: 'perspective(1000px) rotateX(70deg)' }} />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="absolute w-[500px] h-[500px] rounded-full border border-brand-amber/20" style={{ transform: 'perspective(1000px) rotateX(70deg)' }} />
      </div>
      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 pt-24">
        <motion.p custom={0} variants={textVariants} initial="hidden" animate="visible" className="text-brand-amber font-semibold text-sm md:text-base uppercase tracking-[0.3em] mb-6">
          Meet Your New
        </motion.p>
        <motion.h1 custom={1} variants={textVariants} initial="hidden" animate="visible" className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          <span className="gradient-text amber-glow-text">Digital Marketing</span><br />
          <span className="text-white">Team</span>
        </motion.h1>
        <motion.p custom={2} variants={textVariants} initial="hidden" animate="visible" className="text-white/60 text-lg md:text-xl mb-4 font-light tracking-wide">
          Everything You Need to Succeed Online
        </motion.p>
        <motion.div custom={3} variants={textVariants} initial="hidden" animate="visible" className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link to="/contact/" className="group flex items-center gap-2 px-8 py-4 bg-brand-amber text-brand-brown font-bold text-base rounded-full hover:bg-brand-amber-light transition-all duration-300 amber-glow hover:scale-105">
            Success is a Click Away
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="#about" className="flex items-center gap-2 px-8 py-4 border border-brand-amber/40 text-brand-amber font-semibold text-base rounded-full hover:bg-brand-amber/10 transition-all duration-300">
            Learn More
          </a>
        </motion.div>
        <motion.div custom={5} variants={textVariants} initial="hidden" animate="visible" className="mt-20 flex flex-col items-center gap-2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowDown className="w-6 h-6 text-brand-amber/60" />
          </motion.div>
          <span className="text-xs text-white/30 uppercase tracking-widest">Scroll</span>
        </motion.div>
      </div>
    </section>
  )
}
