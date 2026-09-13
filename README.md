# HaatBazaar (ग्रामीण बाज़ार)

> *"Your Village Market, In Your Pocket"*  
> 100% free-tier, multiplatform, edge-first hyper-local market discovery app built on Cloudflare Pages, Cloudflare D1 (SQLite), Hono, React, and Tailwind CSS.

---

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons, React Router
- **Backend / Edge Functions:** Cloudflare Pages Functions with [Hono](https://hono.dev)
- **Database:** [Cloudflare D1](https://developers.cloudflare.com/d1/) (Serverless SQLite)
- **Security:** Web Crypto API (SHA-256 + random 16-byte hex salt for PINs), `hono/jwt` for JWTs
- **Mobile Packaging (Upcoming):** Capacitor (Android APK)

---

## Getting Started Locally

### 1. Prerequisites
- Node.js 18+ or 20+ (Node 22+ recommended)
- npm 10+

### 2. Setup Local Database
Apply the SQLite schema to your local D1 emulator:
```bash
npm run db:migrate:local
```

Seed the local database with sample shops and items:
```bash
npm run db:seed:local
```

### 3. Run Development Server
Build the frontend and launch Cloudflare Pages locally:
```bash
npm run build
npm run pages:dev
```
Open **[http://localhost:8788](http://localhost:8788)** in your browser.

Alternatively, for hot-reloading React development:
- Terminal 1: `npm run pages:functions` (runs Hono API & D1 on port 8788)
- Terminal 2: `npm run dev` (runs Vite dev server on port 5173 with proxy to 8788)

### 4. Verify Backend Health
- Health Check: `http://localhost:8788/api/health`
- Database Health & Shop Count: `http://localhost:8788/api/health/db`

---

## Project Structure

```
HaatBazaar/
├── db/
│   ├── 0001_initial_schema.sql     # D1 SQLite schema (shops, items, subscriptions, sessions)
│   └── 0002_seed_data.sql          # Test seed data
├── functions/
│   └── api/
│       └── [[route]].ts            # Hono Pages Functions router (/api/*)
├── src/
│   ├── lib/
│   │   ├── api.js                  # Centralized fetch wrapper
│   │   └── constants.js            # Categories, status enums, units
│   ├── styles/
│   │   └── index.css               # Tailwind & brand theme
│   ├── App.jsx                     # Phase 1 verification dashboard
│   └── main.jsx                    # React entry
├── wrangler.toml                   # Cloudflare Pages & D1 binding configuration
├── vite.config.js                  # Vite configuration with /api proxy
└── tailwind.config.js              # HaatBazaar color palette
```
