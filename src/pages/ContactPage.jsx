import { Phone, MapPin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-brown-dark pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-brand-amber font-semibold text-sm uppercase tracking-[0.3em] mb-4">Get In Touch</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mb-6">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Ready to grow your business online? Contact us for a free quote or consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="p-8 bg-white/5 border border-brand-amber/20 rounded-3xl">
              <h2 className="font-display text-2xl font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-amber/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-amber" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Office 1</p>
                    <address className="not-italic text-white/60 text-sm">
                      106-7470 Sherbrooke St W.<br />Montreal, Quebec Canada H4B 1S5
                    </address>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-amber/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-amber" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Office 2</p>
                    <address className="not-italic text-white/60 text-sm">
                      6860 Chester Ave<br />Montreal, Quebec Canada H4V 1K6
                    </address>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-amber/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-brand-amber" />
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Phone</p>
                    <a href="tel:514-655-6276" className="text-brand-amber hover:text-brand-amber-light transition-colors font-bold text-lg">(514) 655-6276</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-white/5 border border-brand-amber/20 rounded-3xl">
            <h2 className="font-display text-2xl font-bold text-white mb-6">Request a Free Quote</h2>
            <div className="space-y-5" aria-label="Contact Form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-white/70 mb-2">First Name</label>
                  <input type="text" id="firstName" name="firstName" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand-amber transition-colors" placeholder="John" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-white/70 mb-2">Last Name</label>
                  <input type="text" id="lastName" name="lastName" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand-amber transition-colors" placeholder="Smith" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand-amber transition-colors" placeholder="john@example.com" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/70 mb-2">Phone Number</label>
                <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand-amber transition-colors" placeholder="(514) 000-0000" />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-white/70 mb-2">Service Interested In</label>
                <select id="service" name="service" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-brand-amber transition-colors appearance-none">
                  <option value="" className="bg-[#432c1c]">Select a service</option>
                  <option value="web-design" className="bg-[#432c1c]">Web Design</option>
                  <option value="seo" className="bg-[#432c1c]">SEO / GEO</option>
                  <option value="google-ads" className="bg-[#432c1c]">Google Ads</option>
                  <option value="social-media" className="bg-[#432c1c]">Social Media</option>
                  <option value="digital-marketing" className="bg-[#432c1c]">Digital Marketing</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/70 mb-2">Message</label>
                <textarea id="message" name="message" rows={5} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-brand-amber transition-colors resize-none" placeholder="Tell us about your project..." />
              </div>
              <button
                type="button"
                onClick={() => {
                  /* connect to /api/contact when backend is ready */
                  alert('Thank you! We will be in touch shortly.')
                }}
                className="w-full py-4 bg-brand-amber text-brand-brown font-bold text-base rounded-xl hover:bg-brand-amber-light transition-all duration-300 hover:scale-[1.02] amber-glow"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
