# Venturis Realtors — Luxury Real Estate Platform

## 1. Project Overview

**Project Name:** Venturis Realtors
**Project Type:** Full-Stack Luxury Real Estate Platform
**Core Functionality:** Premium property listings, virtual tours, agent management, investment tools, and a full-featured admin dashboard for content management.
**Target Users:** High-net-worth individuals, investors, property buyers/renters seeking luxury real estate.

---

## 2. Visual & Rendering Specification

### Design Philosophy
- **Aesthetic:** Cinematic, ultra-modern, luxury editorial — inspired by high-end fashion houses (Gucci, Versace) and premium automotive brands (Rolls-Royce, Bentley).
- **Mood:** Trustworthy, elegant, aspirational, exclusive.

### Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Primary Background | Rich Black | `#0A0A0A` |
| Secondary Background | Dark Charcoal | `#141414` |
| Surface | Soft Black | `#1A1A1A` |
| Accent Primary | Champagne Gold | `#C9A962` |
| Accent Secondary | Rose Gold | `#B76E79` |
| Text Primary | Pearl White | `#F5F5F5` |
| Text Secondary | Silver | `#9CA3AF` |
| Border/Divider | Platinum | `#2A2A2A` |
| Success | Emerald | `#10B981` |
| Error | Ruby | `#EF4444` |

### Typography
- **Headings:** `Playfair Display` — elegant serif for luxury feel
- **Body:** `Inter` — clean, modern, highly readable
- **Accent:** `Cormorant Garamond` — for quotes, testimonials, special callouts
- **Monospace:** `JetBrains Mono` — for numbers, prices, stats

### Visual Effects
- **Glassmorphism:** Frosted glass panels with `backdrop-blur: 20px`, `background: rgba(255,255,255,0.03)`
- **Gradients:** Subtle gold-to-champagne linear gradients on key elements
- **Shadows:** Layered shadows using `0 4px 6px -1px rgba(0,0,0,0.3), 0 2px 4px -1px rgba(0,0,0,0.2)`
- **Borders:** 1px platinum borders with subtle glow effects on hover
- **Animations:** Smooth 400-600ms transitions, parallax scrolling, staggered reveals

---

## 3. Architecture

### Tech Stack
- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS v3 with custom configuration
- **Animations:** Framer Motion
- **Backend:** Next.js API Routes (Route Handlers)
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** NextAuth.js with JWT
- **State Management:** Zustand
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod validation

### Project Structure
```
venturis-realtors/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx                 # Homepage
│   │   │   ├── properties/
│   │   │   │   ├── page.tsx             # Properties listing
│   │   │   │   └── [id]/page.tsx        # Property detail
│   │   │   ├── about/page.tsx
│   │   │   ├── services/page.tsx
│   │   │   ├── agents/page.tsx
│   │   │   ├── blog/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   └── login/page.tsx
│   │   ├── (admin)/
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── properties/page.tsx
│   │   │   ├── agents/page.tsx
│   │   │   ├── testimonials/page.tsx
│   │   │   ├── blog/page.tsx
│   │   │   ├── inquiries/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── properties/route.ts
│   │   │   ├── agents/route.ts
│   │   │   ├── testimonials/route.ts
│   │   │   └── inquiries/route.ts
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                          # Reusable UI components
│   │   ├── layout/                      # Header, Footer, Navigation
│   │   ├── sections/                    # Page sections (Hero, Properties, etc.)
│   │   └── admin/                       # Admin-specific components
│   ├── lib/
│   │   ├── db.ts                        # MongoDB connection
│   │   ├── auth.ts                      # Auth configuration
│   │   └── utils.ts
│   ├── models/                          # Mongoose schemas
│   └── types/                           # TypeScript types
├── public/
│   ├── images/
│   └── data/
├── tailwind.config.ts
├── next.config.js
└── package.json
```

---

## 4. Page Specifications

### Homepage Sections

#### 4.1 Hero Section
- **Layout:** Full-viewport height with layered parallax background
- **Background:** AI-generated luxury villa/rendering with subtle Ken Burns effect
- **Content:**
  - Tagline: "Where Luxury Meets Legacy" (animated text reveal)
  - Main headline: "Discover Extraordinary Properties"
  - Subtext: "Exclusive access to the world's most prestigious residences"
- **CTA Buttons:** "Explore Properties" (primary gold), "Schedule Viewing" (secondary outline)
- **Search Overlay:** Expandable property search bar with glassmorphism styling

#### 4.2 Property Search Bar
- **Location:** Autocomplete with map-based suggestions
- **Property Type:** Dropdown (Villa, Penthouse, Apartment, Commercial, Estate)
- **Status:** Buy / Rent toggle with animated slider
- **Budget:** Dual-handle range slider ($100K - $50M+)
- **Bedrooms:** 1-10+ selector
- **Bathrooms:** 1-10+ selector
- **Size:** Square footage range
- **Advanced Filters:** Expandable panel with amenities checkboxes

#### 4.3 Featured Properties
- **Layout:** Horizontal scroll on mobile, 3-column grid on desktop
- **Card Design:**
  - Aspect ratio 4:3 image container with lazy loading
  - Gradient overlay at bottom for price/address
  - Badge: "FEATURED", "NEW", "EXCLUSIVE"
  - Heart icon for favorites (animated fill on click)
  - Price: Large, gold accent
  - Address: Truncated with ellipsis
  - Bed/Bath/SqFt stats row
  - Hover: Scale 1.02, shadow increase, "View Details" overlay appears

#### 4.4 Statistics Section
- **Background:** Parallax image with dark overlay
- **Stats:**
  - $2.5B+ Total Sales
  - 500+ Luxury Properties
  - 15+ Years Experience
  - 98% Client Satisfaction
- **Animation:** Count-up on scroll-into-view

#### 4.5 Services Section
- **Grid:** 2x4 on desktop, 1-column on mobile
- **Service Cards:**
  - Icon (Lucide)
  - Title
  - Description
  - Hover: Gold border glow, icon color change

**Services:**
1. Property Buying — "Expert guidance through acquisition"
2. Property Selling — "Strategic marketing for premium properties"
3. Investment Advisory — "ROI-focused real estate investments"
4. Luxury Villas — "Exclusive villa selection"
5. Commercial Spaces — "Premium commercial properties"
6. Property Management — "Full-service management"
7. Rental Services — "Luxury rental placements"
8. Market Analysis — "Data-driven insights"

#### 4.6 About Section
- **Layout:** Two-column (image left, text right)
- **Content:**
  - Company story (founded 2008)
  - Mission statement
  - Vision statement
  - Trust indicators (awards, certifications)
- **Animation:** Fade-in from sides on scroll

#### 4.7 Team/Agents Section
- **Layout:** 4-column grid on desktop
- **Agent Cards:**
  - Circular photo with gold ring border
  - Name, title, specialization
  - Social links (LinkedIn, Instagram)
  - Contact button
  - Hover: Lift effect, contact icons appear

#### 4.8 Testimonials
- **Layout:** Carousel/slider
- **Card Design:**
  - Large quote marks
  - Client testimonial text
  - 5-star rating display
  - Client photo (small circle)
  - Client name, property purchased

#### 4.9 Investment Opportunities
- **Background:** Subtle chart/pattern overlay
- **Content:**
  - ROI calculator widget
  - Featured investment projects
  - Market growth statistics
  - Call-to-action: "Start Investing"

#### 4.10 Gallery
- **Layout:** Masonry grid
- **Images:** High-quality property photos
- **Effect:** Hover zoom with overlay "View Property"

#### 4.11 Blog/News
- **Layout:** 3-column card grid
- **Cards:**
  - Featured image
  - Category tag
  - Title
  - Excerpt
  - Read time
  - Date

#### 4.12 FAQ Section
- **Style:** Accordion with smooth expand/collapse
- **Content:** 8-10 common questions
- **Animation:** Height transition 300ms

#### 4.13 Contact Section
- **Layout:** Split (form left, info right)
- **Form Fields:** Name, Email, Phone, Subject, Message
- **Info:** Address, phone, email, WhatsApp link
- **Map:** Embedded Google Maps

#### 4.14 Footer
- **Columns:**
  1. Logo + tagline + social icons
  2. Quick links
  3. Services
  4. Contact info
  5. Newsletter subscription
- **Bottom:** Copyright, privacy policy, terms

---

## 5. Database Schema

### Users
```typescript
{
  _id: ObjectId,
  name: string,
  email: string (unique),
  password: string (hashed),
  phone: string,
  role: 'user' | 'agent' | 'admin',
  avatar: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Properties
```typescript
{
  _id: ObjectId,
  title: string,
  slug: string (unique),
  description: string,
  price: number,
  priceType: 'sale' | 'rent',
  propertyType: 'villa' | 'penthouse' | 'apartment' | 'commercial' | 'estate',
  status: 'available' | 'pending' | 'sold',
  featured: boolean,
  bedrooms: number,
  bathrooms: number,
  area: number (sq ft),
  yearBuilt: number,
  address: {
    street: string,
    city: string,
    state: string,
    country: string,
    zipCode: string
  },
  coordinates: {
    lat: number,
    lng: number
  },
  images: string[],
  features: string[],
  amenities: string[],
  agent: ObjectId (ref: Users),
  views: number,
  createdAt: Date,
  updatedAt: Date
}
```

### Testimonials
```typescript
{
  _id: ObjectId,
  clientName: string,
  clientPhoto: string,
  propertyType: string,
  rating: number (1-5),
  message: string,
  isActive: boolean,
  createdAt: Date
}
```

### Blog Posts
```typescript
{
  _id: ObjectId,
  title: string,
  slug: string (unique),
  excerpt: string,
  content: string,
  featuredImage: string,
  category: string,
  tags: string[],
  author: ObjectId (ref: Users),
  isPublished: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Inquiries
```typescript
{
  _id: ObjectId,
  name: string,
  email: string,
  phone: string,
  subject: string,
  message: string,
  propertyId: ObjectId (optional),
  status: 'new' | 'read' | 'replied',
  createdAt: Date
}
```

### Saved Properties
```typescript
{
  _id: ObjectId,
  user: ObjectId (ref: Users),
  property: ObjectId (ref: Properties),
  createdAt: Date
}
```

---

## 6. Authentication & Authorization

### NextAuth.js Configuration
- **Provider:** Credentials (email + password)
- **Session Strategy:** JWT
- **Protected Routes:**
  - `/admin/*` — Admin role only
  - `/dashboard` — Authenticated users

### Role-Based Access
| Role | Access |
|------|--------|
| user | Browse properties, save favorites, make inquiries |
| agent | Above + manage own listings |
| admin | Full system access |

---

## 7. Admin Dashboard

### Features
- Dashboard with analytics overview (properties count, inquiries, views)
- Property CRUD with image upload
- Agent management
- Testimonial management
- Blog post editor
- Inquiry management
- Settings (SEO, site config)

### Design
- Dark theme matching public site
- Sidebar navigation
- Top bar with admin info + logout
- Data tables with search/filter
- Modal forms for add/edit

---

## 8. API Endpoints

### Properties
- `GET /api/properties` — List (with filters, pagination)
- `GET /api/properties/[id]` — Single property
- `POST /api/properties` — Create (admin)
- `PUT /api/properties/[id]` — Update (admin)
- `DELETE /api/properties/[id]` — Delete (admin)

### Auth
- `POST /api/auth/[...nextauth]` — NextAuth handlers

### Inquiries
- `POST /api/inquiries` — Submit inquiry
- `GET /api/inquiries` — List (admin)
- `PUT /api/inquiries/[id]` — Update status (admin)

### Testimonials
- `GET /api/testimonials` — List
- `POST /api/testimonials` — Create (admin)
- `PUT /api/testimonials/[id]` — Update (admin)
- `DELETE /api/testimonials/[id]` — Delete (admin)

---

## 9. Performance & SEO

### Optimizations
- Next.js Image optimization
- Lazy loading for images
- Code splitting per route
- Static generation where possible
- API response caching

### SEO
- Meta tags per page
- Open Graph images
- Structured data (JSON-LD)
- Sitemap generation
- robots.txt

### Accessibility
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Screen reader support

---

## 10. Responsive Breakpoints

| Device | Width |
|--------|-------|
| Mobile | < 640px |
| Tablet | 640px - 1024px |
| Laptop | 1024px - 1280px |
| Desktop | 1280px - 1536px |
| Ultra-wide | > 1536px |

---

## 11. Image Sources

Using Unsplash/Pexels for luxury property imagery:
- Hero backgrounds: Modern luxury villas, penthouses
- Property cards: Interior/exterior shots
- Agent photos: Professional headshots
- Gallery: Diverse property types

---

## 12. Acceptance Criteria

1. ✅ Homepage loads with all sections visible and properly animated
2. ✅ Property search filters work correctly
3. ✅ Property detail pages load with full content
4. ✅ Authentication flow works (login/logout)
5. ✅ Admin dashboard accessible only to admin role
6. ✅ CRUD operations work for all entities
7. ✅ Mobile responsive across all breakpoints
8. ✅ No console errors on any page
9. ✅ All animations smooth (60fps)
10. ✅ Database operations functional with MongoDB