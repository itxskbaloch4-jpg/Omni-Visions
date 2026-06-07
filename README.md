# Omni-Visions
# Omni-Visions — Hybrid Website + CMS

A production-grade hybrid website for **Omnivision Design** (Montreal Web Marketing Agency).  
The frontend works **with or without** the backend. If the API is unavailable, the site gracefully falls back to static content — zero downtime, zero broken pages.

---

## 🏗️ Architecture
omni-visions/
├── frontend/           React + Vite + Tailwind (existing + hybrid layer)
│   └── src/
│       ├── admin/      Full admin panel (React, no separate app)
│       ├── hooks/      useSiteSettings, usePageData (hybrid logic)
│       └── services/   api.js (all API calls)
├── backend/            Node.js + Express + MongoDB
│   ├── models/         Mongoose schemas
│   ├── controllers/    Business logic
│   ├── routes/         REST API routes
│   ├── middleware/     Auth, error handling, rate limiting
│   └── config/         DB, Cloudinary
└── README.md
---

## ✅ Features

### Website (Frontend)
- **Hybrid mode** — API-first, static fallback
- Dynamic color palette via CSS variables (live preview)
- All settings loaded from API on boot; falls back to hardcoded values if unreachable
- Admin panel at `/ov-admin` (completely separate layout)

### Admin Panel
| Section | What you can do |
|---|---|
| **Dashboard** | Stats overview, pending appointments quick view |
| **Appointments** | View all, filter by status/date/search, confirm / cancel / complete, admin notes, email notifications |
| **Blog** | Create, edit, publish/draft/archive posts, featured image, categories, tags, SEO fields |
| **Media Library** | Upload images (Cloudinary), copy URLs, delete, alt text |
| **Site Settings** | Sitename, logo, phone, email, address, fonts, navbar style, SEO, maintenance mode |
| **Color Palette** | Live color picker + presets (like WordPress customizer) |
| **Navbar Editor** | Add/edit/remove nav items + dropdown children |
| **Footer Editor** | About text, copyright, social links |
| **Pages** | SEO meta + publish toggle per page |
| **Profile** | Name, email, change password |

### Backend API
| Route | Description |
|---|---|
| `POST /api/auth/setup` | First-time admin creation |
| `POST /api/auth/login` | JWT login |
| `GET /api/site/settings` | Public site settings (colors, fonts, etc.) |
| `PUT /api/site/settings` | Update settings (admin) |
| `GET /api/appointments` | List appointments (admin) |
| `POST /api/appointments` | Book appointment (public) |
| `PUT /api/appointments/:id/status` | Update status (admin) |
| `GET /api/blog` | List posts (public: published only) |
| `POST /api/blog` | Create post (admin) |
| `POST /api/media/upload` | Upload to Cloudinary (admin) |
| `GET /api/pages/:slug` | Page SEO data (public) |

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in .env values (MongoDB URI, Cloudinary, SMTP)
npm run dev
```

First run — create your admin account:
```bash
curl -X POST http://localhost:5000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"name":"Your Name","email":"you@email.com","password":"yourpassword"}'
```

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Set VITE_API_URL=http://localhost:5000/api
npm run dev
```

### 3. Access Admin Panel

Go to: `http://localhost:5173/ov-admin`  
Login with the credentials you created in step 1.

---

## 🌐 Deployment

### Frontend (Vercel / Netlify)
```bash
cd frontend
npm run build
# Deploy /dist folder
# Set env: VITE_API_URL=https://your-backend-domain.com/api
```

### Backend (Railway / Render / VPS)
```bash
cd backend
npm start
# Set all env variables in your host dashboard
```

### MongoDB
Use MongoDB Atlas (free tier works) — update `MONGODB_URI` in backend `.env`.

### Cloudinary
Free tier supports ~25GB storage. Create account at cloudinary.com, get credentials.

---

## 🔄 Hybrid Fallback Behavior

| API Status | Website Behavior |
|---|---|
| ✅ Online | Fetches dynamic settings, page data, blog posts from DB |
| ❌ Offline / Slow | Falls back to static defaults hardcoded in `useSiteSettings.js` |
| 🔄 Comes back online | Next page load auto-reconnects, no manual action needed |

The fallback is **silent** — users see no errors, no loading spinners, no broken UI.

---

## 📋 Roadmap

### Phase 1 — Core (Current) ✅
- [x] Hybrid frontend layer
- [x] Backend REST API
- [x] Admin authentication (JWT)
- [x] Site settings (global)
- [x] Color palette with live preview
- [x] Navbar editor
- [x] Footer editor
- [x] Appointment booking + management
- [x] Blog CRUD
- [x] Media library (Cloudinary)
- [x] Pages SEO editor
- [x] Email notifications

### Phase 2 — Enhancements
- [ ] Rich text editor (TipTap or Quill) for blog
- [ ] Drag-and-drop section reordering
- [ ] Google Analytics integration in admin
- [ ] Calendar view for appointments
- [ ] Multiple admin users management
- [ ] Image optimization pipeline
- [ ] Dark/light mode toggle for public site

### Phase 3 — Advanced
- [ ] Full page builder (drag sections, edit content inline)
- [ ] Client portal (clients log in to see their project status)
- [ ] Invoice / quote generation
- [ ] Integration with CRMs (HubSpot, Pipedrive)
- [ ] Automated follow-up emails for appointments
- [ ] A/B testing for hero section

---

## 🛡️ Security
- JWT tokens with 7-day expiry
- bcrypt password hashing (12 rounds)
- Rate limiting on all API endpoints (100 req/15min; 5 on auth)
- Helmet.js security headers
- CORS restricted to frontend URL
- Admin routes protected by middleware
- First-admin setup route disabled after first admin exists

---

## 🧑‍💻 Tech Stack

**Frontend:** React 18, Vite, Tailwind CSS, Framer Motion, GSAP, Lenis, React Router v6  
**Admin UI:** React (embedded), Lucide icons, custom components  
**Backend:** Node.js, Express, MongoDB, Mongoose  
**Auth:** JWT + bcrypt  
**Storage:** Cloudinary (images)  
**Email:** Nodemailer (SMTP)  
**Deployment:** Vercel (frontend) + Railway/Render (backend) + MongoDB Atlas

---

## 📞 Support

For questions contact the dev team. Admin panel URL: `/ov-admin` — keep this confidential.
