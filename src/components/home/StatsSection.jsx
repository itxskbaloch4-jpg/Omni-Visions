import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: 15, suffix: '+', label: 'Years of Experience' },
  { value: 500, suffix: '+', label: 'Happy Clients' },
  { value: 50, suffix: '+', label: 'Industries Served' },
  { value: 100, suffix: 'M+', label: 'Client Revenue' },
]

function CountUp({ to, duration = 2000, start }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * to))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [start, to, duration])
  return <>{count}</>
}

export default function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 bg-brand-amber overflow-hidden" aria-label="Statistics">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-white" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6, delay: i * 0.1, type: 'spring', stiffness: 200 }} className="text-center">
              <div className="font-display text-5xl md:text-6xl font-black text-brand-brown mb-2">
                <CountUp to={stat.value} start={inView} />{stat.suffix}
              </div>
              <p className="text-brand-brown/80 font-semibold text-sm uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
