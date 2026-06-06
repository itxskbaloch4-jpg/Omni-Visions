import { Link } from 'react-router-dom'

const team = [
  {
    name: 'Andreas Voniatis',
    role: 'Founder & Lead Strategist',
    image: 'https://www.omnivisiondesign.com/wp-content/uploads/2018/05/Andreas-Voniatis-150x150.jpg',
    bio: 'Over 15 years of experience in digital marketing, SEO, and web design. Andreas leads strategy and client relationships for all major accounts.',
  },
  {
    name: 'Web Design Team',
    role: 'UX / UI & Development',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=300&fit=crop',
    bio: 'Our developers and designers craft fast, beautiful, conversion-optimized websites in HTML, WordPress, and modern JavaScript frameworks.',
  },
  {
    name: 'SEO & Content Team',
    role: 'Search & Content Strategy',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=300&fit=crop',
    bio: 'Specialists in on-page SEO, GEO optimization, link building, and content that ranks — and converts.',
  },
  {
    name: 'Paid Media Team',
    role: 'Google Ads & Social Ads',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=300&fit=crop',
    bio: 'Certified Google Ads professionals managing PPC, remarketing, and local search campaigns that maximize your ROI.',
  },
]

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Meet The Experts</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="gradient-text">Team</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            A dedicated group of digital marketing specialists committed to growing your business online.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {team.map((member) => (
            <div
              key={member.name}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-brand-amber/40 transition-all duration-300 group text-center"
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-amber/30 mx-auto mb-6 group-hover:border-brand-amber transition-all duration-300">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="font-bold text-white text-lg mb-1 group-hover:text-brand-amber transition-colors">{member.name}</h2>
              <p className="text-brand-amber text-xs uppercase tracking-wider font-semibold mb-4">{member.role}</p>
              <p className="text-white/60 text-sm leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/contact/"
            className="inline-flex items-center gap-2 px-10 py-5 bg-brand-amber text-brand-brown font-bold text-lg rounded-full hover:bg-brand-amber-light transition-all duration-300 hover:scale-105 amber-glow"
          >
            Work With Our Team
          </Link>
        </div>
      </div>
    </div>
  )
}
