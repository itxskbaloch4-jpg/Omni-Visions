import mongoose from 'mongoose'

const colorPaletteSchema = new mongoose.Schema({
  brandBrown: { type: String, default: '#432c1c' },
  brandAmber: { type: String, default: '#ffa602' },
  brandAmberLight: { type: String, default: '#ffb733' },
  brandBrownDark: { type: String, default: '#1a0f08' },
  textPrimary: { type: String, default: '#ffffff' },
  textSecondary: { type: String, default: 'rgba(255,255,255,0.7)' },
}, { _id: false })

const navItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  href: { type: String, required: true },
  order: { type: Number, default: 0 },
  children: [{
    label: String,
    href: String,
    order: { type: Number, default: 0 },
  }],
}, { _id: false })

const socialLinkSchema = new mongoose.Schema({
  platform: String,
  url: String,
  icon: String,
}, { _id: false })

const siteSettingsSchema = new mongoose.Schema({
  // General
  siteName: { type: String, default: 'Omnivision Design' },
  tagline: { type: String, default: 'Everything You Need to Succeed Online' },
  logo: { type: String, default: '' },
  favicon: { type: String, default: '' },
  phone: { type: String, default: '(514)-655-6276' },
  email: { type: String, default: 'info@omnivisiondesign.com' },
  address: { type: String, default: '106-7470 Sherbrooke St W., Montreal, Quebec Canada H4B 1S5' },

  // Design
  colorPalette: { type: colorPaletteSchema, default: () => ({}) },
  fontDisplay: { type: String, default: 'Playfair Display' },
  fontBody: { type: String, default: 'Inter' },
  borderRadius: { type: String, enum: ['none', 'small', 'medium', 'large', 'full'], default: 'large' },

  // Layout
  navbarStyle: { type: String, enum: ['transparent', 'solid', 'blur'], default: 'transparent' },
  footerStyle: { type: String, enum: ['dark', 'light', 'brand'], default: 'dark' },
  navItems: { type: [navItemSchema], default: [] },

  // Social
  socialLinks: { type: [socialLinkSchema], default: [] },

  // Footer
  footerAboutText: { type: String, default: 'Omnivision Design is a Montreal Web Marketing Company...' },
  footerCopyright: { type: String, default: '© {year} Omnivision Design. All rights reserved.' },

  // SEO
  metaTitle: { type: String, default: 'Omnivision Design | Web Marketing Agency Montreal' },
  metaDescription: { type: String, default: '' },

  // Maintenance
  maintenanceMode: { type: Boolean, default: false },
  maintenanceMessage: { type: String, default: 'We are updating the website. Please check back soon.' },
}, { timestamps: true })

export default mongoose.model('SiteSettings', siteSettingsSchema)
