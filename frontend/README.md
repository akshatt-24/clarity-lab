# Clarity Lab — Frontend

A health report analysis UI built with Next.js 15, Tailwind CSS v4, and a glassmorphic design system. This README covers running the frontend independently for UI testing — no backend required.

---

## What's in the zip

```
clarity-lab-frontend/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout (fonts, metadata)
│   ├── globals.css               # Design system (glass tokens, glows, animations)
│   ├── auth/
│   │   └── page.tsx              # Auth page (Clerk-ready, sign in / sign up)
│   └── dashboard/
│       ├── page.tsx              # Dashboard home with stat cards
│       ├── reports/page.tsx      # Report list + upload flow
│       ├── analytics/page.tsx    # Health score trend chart
│       ├── ask/page.tsx          # Ask Clarity chat UI
│       └── settings/page.tsx     # Settings panels
├── components/
│   ├── layout/
│   │   ├── Sidebar.tsx           # Glassmorphic sidebar with nav
│   │   ├── DashboardLayout.tsx   # Wraps all dashboard pages
│   │   └── Topbar.tsx            # Mobile top bar
│   ├── report/
│   │   ├── UploadCard.tsx        # Drag-and-drop file uploader
│   │   ├── ReportViewer.tsx      # AI summary + biomarker results
│   │   ├── AttentionCard.tsx     # Flagged biomarker detail card
│   │   ├── NormalBiomarkersCard.tsx
│   │   └── SummaryCard.tsx       # Overview counts card
│   └── ui/
│       └── Logo.tsx              # Brand logo component
├── lib/
│   └── api/
│       └── reports.ts            # Axios calls to FastAPI backend
├── package.json
└── next.config.js
```

---

## Prerequisites

- **Node.js** v18 or higher — [nodejs.org](https://nodejs.org)
- **npm** v9+ (comes with Node) or **yarn** / **pnpm**

Check your versions:
```bash
node -v
npm -v
```

---

## Installation

```bash
# 1. Unzip and enter the project
unzip clarity_lab_ui_updated.zip
cd clarity-lab-frontend

# 2. Install dependencies
npm install
```

Key packages pulled in automatically:

| Package | Purpose |
|---|---|
| `next` | App framework (v15, App Router) |
| `react` + `react-dom` | UI runtime (v19) |
| `tailwindcss` v4 | Utility-first CSS |
| `lucide-react` | Icon set |
| `recharts` | Analytics line chart |
| `framer-motion` | (available) Animations |
| `@clerk/nextjs` | Auth — not wired yet, ready to connect |
| `axios` | HTTP client for backend calls |
| `@tanstack/react-query` | Server state management |

---

## Running for UI testing (no backend)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

All pages are fully navigable without a backend. The upload button will show an error message if clicked (expected — FastAPI isn't running), but every other UI element, animation, and layout works independently.

Pages to explore:

| Route | What to check |
|---|---|
| `/` | Landing page, feature cards, how-it-works steps |
| `/auth` | Sign in / sign up toggle, OAuth placeholders |
| `/dashboard` | Stat cards with hover glows |
| `/dashboard/reports` | Report list, search bar |
| `/dashboard/analytics` | Recharts line chart |
| `/dashboard/ask` | Chat UI with starter messages |
| `/dashboard/settings` | Settings panel cards |

---

## Connecting the backend later

The API layer lives entirely in `lib/api/reports.ts`. When your FastAPI server is running on `localhost:8000`, uploads and report parsing will work automatically — no other changes needed.

To connect Clerk authentication, add your keys to a `.env.local` file:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
```

Then replace the form in `app/auth/page.tsx` with Clerk's `<SignIn />` and `<SignUp />` components. The page layout and styling are already structured to accept them as drop-in replacements.

---

## Build for production

```bash
npm run build
npm start
```
