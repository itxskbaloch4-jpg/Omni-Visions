import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

const perks = [
  'Hands-on experience with real client campaigns',
  'Mentorship from a 15+ year digital marketing veteran',
  'Exposure to SEO, Google Ads, web design & social media',
  'Flexible hours — remote-friendly',
  'Letter of recommendation upon completion',
  'Potential path to a full-time role',
]

const roles = [
  {
    title: 'SEO & Content Intern',
    type: 'Part-time / Remote',
    desc: 'Assist with keyword research, on-page optimization, blog writing, and link-building outreach for client websites.',
  },
  {
    title: 'Web Design Intern',
    type: 'Part-time / Hybrid',
    desc: 'Support the design team in creating wireframes, mockups, and HTML/CSS components for client websites.',
  },
  {
    title: 'Digital Marketing Intern',
    type: 'Part-time / Remote',
    desc: 'Help manage Google Ads campaigns, social media scheduling, email marketing, and performance reporting.',
  },
]

export default function InternshipPage() {
  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Join Our Team</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Internship <span className="gradient-text">Opportunities</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Kick-start your digital marketing career with Omnivision Design — Montreal's leading web marketing agency.
          </p>
        </div>

        {/* Perks */}
        <div className="p-10 bg-white/5 border border-brand-amber/20 rounded-3xl mb-16">
          <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">
            What You'll <span className="gradient-text">Gain</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {perks.map((perk) => (
              <div key={perk} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-amber flex-shrink-0 mt-0.5" />
                <p className="text-white/70 text-sm leading-relaxed">{perk}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Roles */}
        <h2 className="font-display text-3xl font-bold text-white mb-10 text-center">
          Open <span className="gradient-text">Positions</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {roles.map((role) => (
            <div
              key={role.title}
              className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-brand-amber/40 transition-all duration-300 group"
            >
              <h3 className="font-bold text-white text-xl mb-2 group-hover:text-brand-amber transition-colors">{role.title}</h3>
              <p className="text-brand-amber text-xs uppercase tracking-wider font-semibold mb-4">{role.type}</p>
              <p className="text-white/60 text-sm leading-relaxed">{role.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-white/60 mb-6 text-lg">Interested? Send your CV and a short cover letter to:</p>
          <a
            href="mailto:info@omnivisiondesign.com"
            className="inline-flex items-center gap-2 px-10 py-5 bg-brand-amber text-brand-brown font-bold text-lg rounded-full hover:bg-brand-amber-light transition-all duration-300 hover:scale-105 amber-glow"
          >
            Apply Now
          </a>
        </div>
      </div>
    </div>
  )
}
