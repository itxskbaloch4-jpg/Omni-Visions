import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const testimonials = [
  { name: 'Steven Berke', company: 'Steven Berke Clothes', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/steven-berke-150x150.jpg', text: 'Andreas did an excellent job on getting my website organically well rated on Google. His ideas and knowledge of SEO is top notch. I would recommend Andreas and his team to any company looking to get their site well placed on Google.' },
  { name: 'Normand Champigny', company: 'President, CEO and Director, Sphinx Resources Ltd.', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/normand-champigny-150x150.jpg', text: 'Andreas has provided an excellent and timely service for the design and maintenance of a web site in the natural resources sector. His input with regards to use of social media has also been invaluable.' },
  { name: 'John Glasspoole', company: 'INterFace MEdia Studios', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/John-Glasspoole-150x150.jpg', text: "Omnivision has been doing our SEO and website design for a few years now. I have nothing but great things to say about this company, and Andreas in particular. They're very professional and really know how to treat a client. Our online presence has improved dramatically." },
  { name: 'Elizabeth Urbanowicz', company: 'Urban Photography MTL', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/Elizabeth-Urbanowicz-150x150.jpg', text: 'Andreas has been an absolute pleasure to work with! In just 4 months he got my website ranking very well and I went from zero web inquiries to almost one every day. I highly recommend his services!' },
  { name: 'Centre du Sommeil de Montréal', company: '', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/Centre-du-Sommeil-150x150.jpg', text: 'Terrific and friendly service. We needed an update on our website. Sent the request after 4 PM and all the work was done before 9 AM the next day. Thanks Omnivision!' },
  { name: 'Alexandre Desjardins', company: 'Senior Associate at Borden Ladner Gervais', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/Alexandre-Desjardins-150x150.jpg', text: 'Andreas did a great job in redesigning our website with a very tight budget and deadline. He was professional and very available, during and after the mandate.' },
  { name: 'Francis Ventura', company: 'Policy and Engagement Coordinator at The McKell Institute', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/Laurie-Gordon-150x150.jpg', text: 'The McKell Institute recently commissioned Omnivision Design to redevelop our website. The transformation has been cost-effective, timely, efficient and the results are absolutely remarkable.' },
  { name: 'Carmine Maurizio', company: 'Manager, Mobility Collection Strategy at Telus', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/carmine-maurizio-150x150.jpg', text: 'Omnivision Design produced a fantastic new website for our soccer club and evolved our digital footprint to the top of our industry. Andreas is a professional single point of contact, who constantly works with our organizational constraints to find the solutions best suited for our needs.' },
  { name: 'John Marrett', company: 'Maximizer CRM Certified Expert', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/testimonial-1a-150x150.jpg', text: 'A couple of years ago, I needed a quick website for an event. Andreas and the team at OmniVision got a bilingual website up and running in a couple of weeks, several days before the show!' },
  { name: 'Elie Grinberger', company: 'HairstyleCITY.com', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/testimonial-2a-150x150.jpg', text: 'Omnivision is an internet marketing company that brings a lot of experience to the table, and sound advice that precipitously translates to improvements in the bottom line!' },
]

export default function TestimonialsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-32 bg-brand-brown-dark overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-brand-amber rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-brand-amber rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Client Stories</p>
          <h2 id="testimonials-heading" className="font-display text-4xl md:text-5xl font-bold text-white">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            className="pb-14"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="h-full p-8 bg-gradient-to-br from-[#432c1c]/80 to-[#1a0f08]/80 border border-brand-amber/20 rounded-3xl backdrop-blur-sm hover:border-brand-amber/50 transition-all duration-300 group">
                  <div className="text-brand-amber text-6xl font-display leading-none mb-4 opacity-60">&ldquo;</div>
                  <p className="text-white/80 text-sm leading-relaxed mb-8 italic">{t.text}</p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-amber/30 flex-shrink-0">
                      <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-white text-sm">{t.name}</p>
                      {t.company && <p className="text-brand-amber text-xs">{t.company}</p>}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}
