import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  { q: 'What services does Omnivision Design offer?', a: 'Omnivision Design offers a full suite of digital marketing services including web design, SEO/GEO, Google Ads, social media marketing, email marketing, AI photo/video packages, livechat, and mini packages.' },
  { q: 'How long does it take to build a website?', a: 'Typical website projects range from 2 to 6 weeks depending on complexity, number of pages, and client feedback cycles. E-commerce projects may take longer.' },
  { q: 'Do you offer bilingual (English/French) websites?', a: 'Yes. Our online marketing services are available in both English and French. We can create a fully bilingual or multilingual website and serve clients in the language of their choice.' },
  { q: 'What areas do you serve?', a: 'We primarily serve businesses in Montreal, but we also work with clients across Canada including Toronto and Vancouver, as well as businesses in the USA.' },
  { q: 'How much does SEO cost?', a: 'Our SEO packages start at $595/month. Pricing depends on the scope of work, competition level, and specific goals. Contact us for a custom quote.' },
  { q: 'How long before I see SEO results?', a: 'SEO is a long-term investment. Most clients begin to see measurable improvements in rankings and organic traffic within 3 to 6 months of consistent optimization.' },
  { q: 'Do you offer website maintenance?', a: 'Yes. We offer website maintenance services including content updates, security patches, backups, performance monitoring, and CDN management.' },
  { q: 'What makes Omnivision Design different from other agencies?', a: 'We offer over 15 years of experience, a client-centric approach, bilingual service, and a unique combination of web design with specialized SEO — all under one roof with a single point of contact.' },
  { q: 'Can I get a free quote?', a: 'Absolutely. Contact us at (514) 655-6276 or use our online contact form to request a free quote or consultation.' },
  { q: 'Do you work with small businesses?', a: 'Yes. We work with small, medium, and large businesses, including public companies. Our Mini Packages starting at $220/month are specifically designed for smaller budgets.' },
]

export default function FAQPage() {
  const [open, setOpen] = useState(null)

  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Common Questions</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">FAQ</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Answers to the most frequently asked questions about our digital marketing services.
          </p>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? 'border-brand-amber/50 bg-white/5' : 'border-white/10 hover:border-brand-amber/30'}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between px-6 py-5 text-left group" aria-expanded={open === i}>
                <span className="font-semibold text-white text-base group-hover:text-brand-amber transition-colors pr-4">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-brand-amber flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${open === i ? 'max-h-96' : 'max-h-0'}`}>
                <p className="px-6 pb-5 text-white/70 text-sm leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
