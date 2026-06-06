import { useState, useEffect } from 'react'

const staticTestimonials = [
  { name: 'Steven Berke', company: 'Steven Berke Clothes', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/steven-berke-150x150.jpg', text: 'Andreas did an excellent job on getting my website organically well rated on Google. His ideas and knowledge of SEO is top notch. I would recommend Andreas and his team to any company looking to get their site well placed on Google.' },
  { name: 'Normand Champigny', company: 'President, CEO and Director, Sphinx Resources Ltd.', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/normand-champigny-150x150.jpg', text: 'Andreas has provided an excellent and timely service for the design and maintenance of a web site in the natural resources sector. His input with regards to use of social media has also been invaluable.' },
  { name: 'John Glasspoole', company: 'INterFace MEdia Studios', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/John-Glasspoole-150x150.jpg', text: "Omnivision has been doing our SEO and website design for a few years now. I have nothing but great things to say about this company, and Andreas in particular. They're very professional and really know how to treat a client. Our online presence has improved dramatically." },
  { name: 'Elizabeth Urbanowicz', company: 'Urban Photography MTL', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/Elizabeth-Urbanowicz-150x150.jpg', text: 'Andreas has been an absolute pleasure to work with! In just 4 months he got my website ranking very well and I went from zero web inquiries to almost one every day. I highly recommend his services!' },
  { name: 'Centre du Sommeil de Montréal', company: '', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/Centre-du-Sommeil-150x150.jpg', text: 'Terrific and friendly service. We needed an update on our website. Sent the request after 4 PM and all the work was done before 9 AM the next day. Thanks Omnivision!' },
  { name: 'Alexandre Desjardins', company: 'Senior Associate at Borden Ladner Gervais', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/Alexandre-Desjardins-150x150.jpg', text: 'Andreas did a great job in redesigning our website with a very tight budget and deadline. He was professional and very available, during and after the mandate.' },
  { name: 'Francis Ventura', company: 'Policy and Engagement Coordinator at The McKell Institute', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/Laurie-Gordon-150x150.jpg', text: 'The McKell Institute recently commissioned Omnivision Design to redevelop our website. The transformation has been cost-effective, timely, efficient and the results are absolutely remarkable. I would happily recommend Omnivision to any prospective clients.' },
  { name: 'Carmine Maurizio', company: 'Manager, Mobility Collection Strategy at Telus', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/carmine-maurizio-150x150.jpg', text: 'Omnivision Design produced a fantastic new website for our soccer club and evolved our digital footprint to the top of our industry. Andreas is a professional single point of contact, who constantly works with our organizational constraints to find the solutions best suited for our needs.' },
  { name: 'John Marrett', company: 'Maximizer CRM Certified Expert', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/testimonial-1a-150x150.jpg', text: 'A couple of years ago, I needed a quick website for an event. Andreas and the team at OmniVision got a bilingual website up and running in a couple of weeks, several days before the show!' },
  { name: 'Elie Grinberger', company: 'HairstyleCITY.com', image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/testimonial-2a-150x150.jpg', text: 'Omnivision is an internet marketing company that brings a lot of experience to the table, and sound advice that precipitously translates to improvements in the bottom line!' },
]

export default function TestimonialsPage() {
  const [items, setItems] = useState(staticTestimonials)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch('/api/testimonials', { signal: AbortSignal.timeout(3000) })
        if (!res.ok) throw new Error('not ok')
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) setItems(data)
      } catch { /* use static */ }
    }
    fetchTestimonials()
  }, [])

  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Client Stories</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            What Our <span className="gradient-text">Clients Say</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Read what businesses across Montreal and Canada say about working with Omnivision Design.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <div key={i} className="p-8 bg-gradient-to-br from-[#432c1c]/80 to-[#1a0f08]/80 border border-brand-amber/20 rounded-3xl hover:border-brand-amber/50 transition-all duration-300 group flex flex-col">
              <div className="text-brand-amber text-5xl font-display leading-none mb-4 opacity-60">&ldquo;</div>
              <p className="text-white/80 text-sm leading-relaxed mb-8 italic flex-1">{t.text}</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-brand-amber/30 flex-shrink-0">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{t.name}</p>
                  {t.company && <p className="text-brand-amber text-xs">{t.company}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
