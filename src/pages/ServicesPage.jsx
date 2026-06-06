import { Link } from 'react-router-dom'

const allServices = [
  {
    category: 'Web Design', href: '/web-design/', icon: '🖥️',
    items: [
      { label: 'Web Design Packages', href: '/web-design/web-design-packages/' },
      { label: 'Website Maintenance', href: '/web-design/website-maintenance-services/' },
      { label: 'Website Security & CDN', href: '/web-design/website-security-cdn/' },
      { label: 'Montreal Web Hosting', href: '/web-design/web-hosting/' },
      { label: 'Graphic Design', href: '/web-design/graphic-design/' },
      { label: 'Logo Design', href: '/web-design/logo-design/' },
      { label: 'Web Designer', href: '/web-design/web-designer/' },
    ],
  },
  {
    category: 'SEO / GEO', href: '/seo/', icon: '🔍',
    items: [
      { label: 'SEO Packages', href: '/seo/seo-packages/' },
      { label: 'GEO Optimization Package', href: '/geo-optimization-packages/' },
      { label: 'Link Building', href: '/seo/link-building/' },
      { label: 'Local SEO', href: '/seo/local-seo/' },
      { label: 'Advanced Conversion Tracking', href: '/seo/advanced-conversion-tracking-services/' },
      { label: 'Heat Mapping Services', href: '/seo/heat-mapping-services/' },
    ],
  },
  {
    category: 'Google Ads', href: '/google-ads/', icon: '🎯',
    items: [
      { label: 'Google Ads Packages', href: '/google-ads/google-ads-packages/' },
      { label: 'Pay Per Click', href: '/google-ads/pay-per-click/' },
      { label: 'Remarketing / Retargeting', href: '/google-ads/remarketing-retargeting/' },
      { label: 'SEM Services', href: '/google-ads/sem-services/' },
      { label: 'SEM Consultant', href: '/google-ads/sem-consultant/' },
      { label: 'Local Search Marketing', href: '/google-ads/local-search-marketing/' },
    ],
  },
  {
    category: 'Social Media', href: '/social-media/', icon: '📱',
    items: [
      { label: 'Social Media Packages', href: '/social-media/social-media-packages/' },
      { label: 'LinkedIn B2B Packages', href: '/b2b-linkedin-marketing/' },
      { label: 'LinkedIn CVs', href: '/linkedin-cvs/' },
      { label: 'Social Media Management', href: '/social-media/social-media-management/' },
      { label: 'Social Media Advertising', href: '/social-media/social-media-advertising/' },
      { label: 'Social Media Marketing Agency', href: '/social-media/social-media-marketing-agency/' },
    ],
  },
  {
    category: 'Digital Marketing', href: '/internet-marketing/', icon: '📧',
    items: [
      { label: 'Email Marketing Packages', href: '/internet-marketing/email-marketing/' },
      { label: 'Call Management', href: '/call-management-services/' },
      { label: 'Reviews Cards', href: '/internet-marketing/reviews-cards/' },
      { label: 'Negative Google Review Removal', href: '/negative-google-review-removal/' },
      { label: 'Video', href: '/web-design/video/' },
      { label: 'Digital Marketing Services', href: '/internet-marketing/services-for-online-business/' },
      { label: 'Digital Marketing Consultant', href: '/internet-marketing/digital-marketing-consultant/' },
      { label: 'Affiliate Marketing', href: '/internet-marketing/affiliate-marketing/' },
      { label: 'HTML Email Signature Design', href: '/internet-marketing/html-email-signature-design-service/' },
    ],
  },
  {
    category: 'AI', href: '/ai-photo-packages/', icon: '🤖',
    items: [
      { label: 'AI-Photo Packages', href: '/ai-photo-packages/' },
      { label: 'AI-Video Packages', href: '/ai-video-packages/' },
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">What We Offer</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Comprehensive digital marketing solutions for businesses across Canada and the USA.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((s) => (
            <div key={s.category} className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-brand-amber/40 transition-all duration-300 group">
              <div className="text-4xl mb-4">{s.icon}</div>
              <a href={s.href}>
                <h2 className="font-display text-2xl font-bold text-white mb-6 group-hover:text-brand-amber transition-colors">{s.category}</h2>
              </a>
              <ul className="space-y-3">
                {s.items.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-sm text-white/60 hover:text-brand-amber transition-colors flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-brand-amber/50 flex-shrink-0" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
