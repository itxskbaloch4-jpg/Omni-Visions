import { Link } from 'react-router-dom'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">About Us</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Your Montreal{' '}
            <span className="gradient-text">Digital Marketing Agency</span>
          </h1>
          <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
            Omnivision Design is a digital marketing agency in Montreal that offers a unique
            combination of highly specialized digital marketing services (primarily SEO-related) to
            small and medium-sized businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-6 text-white/70 leading-relaxed">
            <p>
              In addition to professional web design and development, Omnivision Design has the best
              quality web marketing strategy in-store, guaranteed to take your company's
              marketing plan to the next level. Let the top digital marketing company in Montreal
              help you achieve your financial objectives, boost your bottom line, and improve your
              position in the search engine results pages (SERPs) of Google and other search
              engines.
            </p>
            <p>
              If you run a local business, you need SEO, digital marketing, and web consulting
              services. We offer such services to businesses located in major cities in Canada,
              including Montreal, Toronto, and Vancouver, and the USA. We can provide you with
              increased exposure on Google and a variety of other search engines.
            </p>
            <p>
              Our online marketing services are available in both English and French. We can create
              a fully bilingual or other multilingual web site, and we pride ourselves on our
              ability to serve our clients in the language of their choice.
            </p>
          </div>
          <div className="space-y-6 text-white/70 leading-relaxed">
            <p>
              Our objective is to offer clients a significant return on investment via effective,
              long-lasting SEO results. There are many benefits to hiring our Montreal web design
              company, such as affordable web hosting and efficient HTML and WordPress website
              maintenance services.
            </p>
            <p>
              Our process starts with understanding how your brand is perceived by your target
              market (brand positioning). Once we reach the website design phase, our focus shifts
              to optimizing the user experience, ensuring sufficient calls to action on your
              website.
            </p>
            <p>
              Our lead web designer has over ten years of experience optimizing usability and
              conversion rate, resulting in more inbound phone calls and emails. Our web developers
              have the capacity to develop dynamic content-driven websites and intricate databases.
            </p>
          </div>
        </div>

        <div id="why-choose-us" className="py-16 border-t border-white/10">
          <h2 className="font-display text-4xl font-bold text-white mb-12 text-center">
            Why Choose <span className="gradient-text">Us</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: ' 15+ Years Experience', desc: 'Over a decade of proven results helping businesses grow online.', icon: '🏆' },
              { title: 'ROI-Focused', desc: 'Every strategy is designed to deliver measurable return on investment.', icon: '📊' },
              { title: 'Bilingual Service', desc: 'Full service in English and French for Quebec and Canadian businesses.', icon: '🌐' },
              { title: 'Specialized SEO', desc: 'Industry-leading SEO techniques that deliver long-lasting organic results.', icon: '🔍' },
              { title: 'Full-Stack Agency', desc: 'From web design to social media — everything under one roof.', icon: '🚀' },
              { title: 'Client-Centric', desc: 'Your success is our success. We work as an extension of your team.', icon: '🤝' },
            ].map((item) => (
              <div key={item.title} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-brand-amber/40 transition-all duration-300">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/contact/"
            className="inline-flex items-center gap-2 px-10 py-5 bg-brand-amber text-brand-brown font-bold text-lg rounded-full hover:bg-brand-amber-light transition-all duration-300 hover:scale-105 amber-glow"
          >
            Work With Us
          </Link>
        </div>
      </div>
    </div>
  )
}
