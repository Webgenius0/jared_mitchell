# OSI

A full-featured community platform built with **Next.js**, **TypeScript**, and **Tailwind CSS** that empowers artists, businesses, and community members through spotlights, events, e-commerce, sponsorships, and more.

---

## ✨ Features

### 🏠 Home
- Hero section with CTA
- Partner / sponsor logos carousel
- "Powered By OSI" feature highlights
- Core values & why-choose-us sections
- Boss Beginnings program showcase
- Success stories & community achievements
- Artist spotlight cards
- Event banners, countdown timers, featured/upcoming/past events
- OSI apparel shop integration
- Newsletter signup

### 👤 Authentication
- **Register** — new user signup with role selection
- **Login** — email/password sign in
- **Email verification** — OTP-based email verification
- **Forgot / Reset password** — full password recovery flow
- Token-based auth with persistent sessions (localStorage)

### 🎨 Spotlight
- **Artist Spotlight** — multi-step spotlight application form
- **Business Spotlight** — multi-step business spotlight form
- **Spotlight Ladder** — voting and ranking system
- Spotlight of the Week, Editors' Picks, Discover Artists

### 📅 Events
- Browse upcoming & past events
- Event detail pages with galleries, schedules, and vendor info
- **Ticket purchasing** with multiple tier options
- Guest checkout with account creation
- FullCalendar integration for calendar view

### 🛍️ Shop
- Product listings with featured & limited drops sections
- Product detail pages with image galleries
- **Shopping cart** with quantity management
- **Buy Now** functionality
- Auth-gated cart & purchase (unauthenticated users are prompted to sign in)

### 💼 Boss Beginnings
- Business competition with voting rounds
- Leaderboards and voting center
- Winner showcase and partner features

### 📊 Dashboard
Multi-role dashboards for:
- **Artist / Business** — analytics, events, spotlight management, billing, settings, Canva integration
- **Boss Beginning** — community hub, leaderboards, voting center, payments, activity log
- **Community Member** — saved content, voting center, support votes
- **Sponsor** — ad performance, campaign assets, placement schedule, impression estimates, billing

### 💳 Services & Pricing
- Service plans with comparison table
- Sponsorship levels and benefits
- FAQ accordion

### 📬 Contact
- Contact form
- Talent application
- Vendor opportunities

### 🔐 Auth Protection
- Unauthenticated users cannot add items to cart or use Buy Now
- Private routes redirect to login (via `PrivateLayout` component)
- Axios interceptors handle 401/403 responses

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Utility-first styling |
| **TanStack React Query** | Server state management & caching |
| **Axios** | HTTP client (public & secure instances) |
| **React Hook Form** | Form handling |
| **React Hot Toast** | Toast notifications |
| **React Icons** | Icon library (Feather Icons) |
| **Swiper** | Touch sliders & carousels |
| **Recharts** | Charts & analytics |
| **FullCalendar** | Calendar/event views |
| **AOS (Animate On Scroll)** | Scroll animations |
| **React OTP Input** | OTP verification UI |
| **React Fast Marquee** | Scrolling logos/text |
| **DOMPurify** | XSS sanitization |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (main)/          # Public pages (home, about, shop, events, etc.)
│   ├── auth/            # Authentication pages (login, register, OTP, reset)
│   ├── dashboard/       # Protected dashboards for each user role
│   ├── globals.css      # Global styles, Tailwind theme, custom utilities
│   ├── layout.tsx       # Root layout with providers
│   ├── loading.tsx      # Global loading state
│   └── not-found.tsx    # 404 page
├── Components/
│   ├── Common/          # Shared UI components (Button, Container, Modal, etc.)
│   ├── Data/            # Static data files
│   ├── Loader/          # Loading components
│   ├── Svg/             # SVG icon components
│   └── PageComponents/  # Page-specific components (organized by route group)
├── Hooks/
│   ├── api/             # API hooks (auth, CMS, dashboard)
│   ├── useAuth.tsx      # Authentication context hook
│   ├── useAxiosPublic.tsx   # Public Axios instance
│   ├── useAxiosSecure.tsx   # Authenticated Axios instance
│   ├── useClientApi.ts      # Generic React Query wrapper for client
│   └── useServerApi.ts      # Generic React Query wrapper for server
├── lib/
│   ├── localStorage.ts      # LocalStorage helpers
│   ├── Services/cms_service.ts  # CMS data fetching functions
│   └── utils.ts
├── Private/             # PrivateLayout component (auth guard)
├── Provider/
│   ├── AosProvider/     # AOS animation provider
│   ├── AuthProvider/    # Auth context provider
│   └── QueryProvider/   # React Query provider
├── Shared/              # Shared layout components (Navbar, Footer, Sidebar, etc.)
└── Types/               # TypeScript type definitions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd jared_mitchell

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SITE_URL=https://your-api-domain.com
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Base URL for the backend API |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build & Production

```bash
npm run build
npm start
```

---

## 📄 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🔐 Authentication Flow

1. **Register** → User creates an account and receives an OTP via email
2. **Verify Email** → User enters OTP to activate their account
3. **Login** → User receives a JWT token stored in localStorage
4. **Auth State** — The `AuthProvider` context manages the user session:
   - `token` — JWT stored in localStorage
   - `user` — User profile data fetched from API
   - `loading` — Loading state while fetching user data
5. **Protected Routes** → `PrivateLayout` redirects unauthenticated users to `/auth`
6. **Axios Secure Interceptor** — Automatically attaches Bearer token to requests and handles 401/403 responses

## 🛡️ Auth Protection on Shop

- **Add to Cart** — Requires authentication; redirects to `/auth/login` with a toast notification if not signed in
- **Buy Now** — Same auth gate as Add to Cart
- **Suggested Products** — Add-to-cart in the "You May Also Like" section is also auth-gated

---

## 🎨 Customization

### Tailwind Theme

The project uses a custom Tailwind theme defined in `globals.css`:

```css
@theme {
  --color-primary-blue: #306fdc;
  --color-secondary-blue: #155dfc;
  --color-tertiary-blue: #1977dd;
  --color-primary-black: #1d1d1f;
  --color-secondary-black: #364153;
  --color-primary-gray: #f5f5f5;
  --color-secondary-gray: #f5f5f7;
  --font-sf: "sf_pro", sans-serif;
}
```

### Fonts

Custom SF Pro fonts are located in `public/fonts/`:
- `sf_regular.OTF` (400)
- `sf_medium.OTF` (500)
- `sf_bold.OTF` (700)

---

## 🧩 Key Components

| Component | Description |
|---|---|
| `Navbar` | Main navigation with submenus and mobile sidebar |
| `Footer` | Site footer with links and social |
| `PrivateLayout` | Auth guard wrapper for protected routes |
| `DashboardHeader` / `DashboardSidebar` | Dashboard navigation |
| `ShippingBillingForm` | Checkout form for shipping & billing |
| `ShopCard` | Product card used in featured & limited drops |
| `TopProductSection` | Product detail hero with gallery & purchase buttons |
| `EventDetailsBanner` | Event detail page header |

---

## 🙏 Acknowledgements

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [React Icons / Feather](https://react-icons.github.io/react-icons/)
- Animations from [AOS](https://michalsnik.github.io/aos/)
