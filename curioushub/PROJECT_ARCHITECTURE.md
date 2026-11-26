# PROJECT_ARCHITECTURE.md

> **Scope:** Documents the **actual** architecture of this repository as implemented in code.  
> **Project root (app code):** `curioushub/curioushub/`  
> **Last synchronized with:** current source in `curioushub/curioushub/Frontend/` and `curioushub/curioushub/Backend/`

---

## 1. Project purpose

This project is a **premium single-page marketing website for the IRONFORGE gym/fitness brand** with a lightweight backend for contact form persistence.

- **Frontend (`Frontend/`)**: React + Vite SPA (no client-side router) that renders one landing page composed of marketing sections (Hero, About, Features, Programs, Trainers, Membership, Why Choose Us, Testimonials, Gallery, CTA, Contact), global UI (loader, navbar, footer, back-to-top, cursor follower), glassy Tailwind styling, and GSAP/ScrollTrigger animations.
- **Backend (`Backend/`)**: Express + Mongoose API that validates and stores contact form submissions in MongoDB (when connected) and exposes a health check endpoint.
- **Integration**: In development, Vite proxies `/api` requests to the backend (`Frontend/vite.config.js` → `http://localhost:5001`). The frontend contact form submits to `POST /api/contact`.

**Not present:** authentication, multi-page routing, admin UI, CMS, payment processing, or server-side rendering.

---

## 2. Tech stack

### Frontend
- **Framework:** React 19 (`react`, `react-dom`) with JSX
- **Build/dev:** Vite 8 (`vite`), `@vitejs/plugin-react`
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`, global/theme/animation CSS in `Frontend/src/index.css` (`@import "tailwindcss"`, `@theme`, custom `.glass*`, keyframes, reduced-motion rules)
- **Animation:** GSAP 3 + `ScrollTrigger` (`Frontend/src/animations/gsap.js`, animated components/hooks)
- **Icons:** `lucide-react` + inline SVG social icons in `Frontend/src/components/Footer.jsx` and `Frontend/src/components/Trainers.jsx`
- **Linting:** ESLint 10 flat config (`Frontend/eslint.config.js`) with React Hooks/Refresh configs
- **Fonts/assets:** Google Fonts (`Inter`, `Teko`) in `Frontend/index.html`; external Unsplash image URLs used in components/data

### Backend
- **Runtime:** Node.js (ES modules, `"type": "module"` in `Backend/package.json`)
- **Framework:** Express 4 (`Backend/src/server.js`)
- **Database/ODM:** MongoDB + Mongoose 8 (`Backend/src/config/db.js`, `Backend/src/models/Contact.js`)
- **Middleware/utilities:** `cors`, `dotenv`

### APIs / protocols
- **Internal REST endpoints:**
  - `GET /api/health` (`Backend/src/server.js`)
  - `POST /api/contact` (`Backend/src/routes/contactRoutes.js` → `Backend/src/controllers/contactController.js`)
- **Frontend transport:** Browser `fetch` in `Frontend/src/components/Contact.jsx` (no Axios/service client abstraction)

### Environment/config
- **Backend env:** `Backend/.env`, `Backend/.env.example` (`PORT`, `MONGODB_URI`, `CLIENT_ORIGIN`)
- **Frontend env:** no `.env` / `VITE_*` API base config found; dev proxy target is hardcoded in `Frontend/vite.config.js`
- **Dev proxy:** `Frontend/vite.config.js` proxies `/api` to `http://localhost:5001`

---

## 3. Folder structure

### Repository/app layout
```text
curioushub/curioushub/
├── .git/
├── PROJECT_ARCHITECTURE.md
├── Frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── .gitignore
│   ├── README.md                     # Vite template README (not project-specific)
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── dist/                         # generated build output
│   └── src/
│       ├── main.jsx                  # React bootstrap, mounts App, imports index.css
│       ├── App.jsx                   # app shell (loader state, global UI, Home)
│       ├── index.css                 # Tailwind/theme/global/glass/animations
│       ├── pages/
│       │   └── Home.jsx              # composes all landing sections
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Hero.jsx
│       │   ├── About.jsx
│       │   ├── Features.jsx
│       │   ├── Programs.jsx
│       │   ├── Trainers.jsx
│       │   ├── Membership.jsx
│       │   ├── WhyChooseUs.jsx
│       │   ├── Testimonials.jsx
│       │   ├── Gallery.jsx
│       │   ├── CTA.jsx
│       │   ├── Contact.jsx
│       │   ├── Footer.jsx
│       │   ├── Loader.jsx
│       │   ├── BackToTop.jsx
│       │   ├── Reveal.jsx
│       │   ├── SectionHeading.jsx
│       │   ├── ui/
│       │   │   ├── Button.jsx
│       │   │   ├── Container.jsx      # present, currently unused
│       │   │   ├── GlassPanel.jsx     # present, currently unused
│       │   │   └── CursorFollower.jsx
│       │   ├── layout/               # empty
│       │   └── sections/             # empty
│       ├── data/
│       │   ├── programs.js
│       │   ├── trainers.js
│       │   └── testimonials.js
│       ├── hooks/
│       │   ├── useInView.js          # present, currently unused by components
│       │   └── useGsapReveal.js
│       ├── animations/
│       │   └── gsap.js
│       └── assets/
│           ├── hero-image.png        # present, not used by current UI
│           ├── hero.png              # present, not used by current UI
│           ├── react.svg
│           ├── vite.svg
│           └── images/               # empty
└── Backend/
    ├── .env
    ├── .env.example
    ├── package.json
    └── src/
        ├── server.js                 # Express bootstrap, middleware, routes, DB connect, listen
        ├── config/
        │   └── db.js                 # Mongoose connection helper
        ├── routes/
        │   └── contactRoutes.js      # POST / -> createContact (mounted at /api/contact)
        ├── controllers/
        │   └── contactController.js  # validation, DB-readiness check, persistence, responses
        ├── models/
        │   └── Contact.js            # Contact schema/model
        ├── middleware/
        │   └── errorHandler.js       # 404 + error handlers
        └── utils/                    # empty
```

### Key file responsibilities (important files)
- `Frontend/index.html`: HTML shell, SEO/OG/meta, fonts, `#root`, module script entry (`/src/main.jsx`).
- `Frontend/vite.config.js`: React/Tailwind plugins and dev `/api` proxy.
- `Frontend/src/main.jsx`: mounts React app in `StrictMode`.
- `Frontend/src/App.jsx`: top-level shell and loader visibility state/timer.
- `Frontend/src/pages/Home.jsx`: single-page section composition/order.
- `Frontend/src/components/Contact.jsx`: contact UI, client-side validation, `POST /api/contact` call, API response/UI state handling.
- `Frontend/src/components/Navbar.jsx`: in-page navigation, active-section detection, scroll hide/show, mobile menu.
- `Frontend/src/animations/gsap.js`, `Frontend/src/hooks/useGsapReveal.js`: shared GSAP/ScrollTrigger setup and reveal behavior.
- `Backend/src/server.js`: API bootstrap, CORS/JSON middleware, route mounting, DB connect, server listen.
- `Backend/src/controllers/contactController.js`: request validation and persistence logic.
- `Backend/src/models/Contact.js`: MongoDB document schema for submissions.

---

## 4. Application startup flow

### Frontend dev (`cd Frontend && npm run dev`)
```text
npm run dev (Frontend/package.json: vite)
  -> Vite loads Frontend/vite.config.js (React + Tailwind plugins, /api proxy)
  -> Browser loads Frontend/index.html (#root + /src/main.jsx)
  -> Frontend/src/main.jsx imports index.css and renders <StrictMode><App /></StrictMode>
  -> Frontend/src/App.jsx renders Loader/CursorFollower/Navbar/Home/Footer/BackToTop
  -> Frontend/src/pages/Home.jsx renders all section components
  -> Component effects/layout effects run (listeners, observers, GSAP/ScrollTrigger)
  -> No initial data-fetch API call; page content is static/local until contact submit
```

### Backend dev (`cd Backend && npm run dev`)
```text
npm run dev (Backend/package.json: node --watch src/server.js)
  -> dotenv/config loads env
  -> Express app created (cors, express.json)
  -> Routes registered: GET /api/health, /api/contact
  -> 404/error middleware registered
  -> connectDB(MONGODB_URI) attempted
  -> app.listen(PORT || 5001)
```

**Behavior note:** `Backend/src/config/db.js` logs and continues if `MONGODB_URI` is missing or connection fails; the server can still run, but `POST /api/contact` returns `503` when MongoDB is not connected (`mongoose.connection.readyState !== 1` in controller).

---

## 5. Component hierarchy

```text
index.html
└── #root
    └── main.jsx (StrictMode)
        └── App.jsx
            ├── Loader.jsx
            ├── ui/CursorFollower.jsx
            ├── Navbar.jsx
            ├── <main>
            │   └── pages/Home.jsx
            │       ├── Hero.jsx
            │       │   └── ui/Button.jsx (x2 CTAs)
            │       ├── About.jsx
            │       ├── Features.jsx
            │       ├── Programs.jsx
            │       ├── Trainers.jsx
            │       ├── Membership.jsx
            │       ├── WhyChooseUs.jsx
            │       ├── Testimonials.jsx
            │       ├── Gallery.jsx
            │       ├── CTA.jsx
            │       └── Contact.jsx
            │           ├── SectionHeading.jsx
            │           │   └── Reveal.jsx
            │           ├── Reveal.jsx (info panel wrapper)
            │           └── Reveal.jsx (form wrapper)
            ├── Footer.jsx
            └── BackToTop.jsx
```

**Notes**
- `Home.jsx` is the only page component and is always rendered by `App.jsx`.
- `SectionHeading.jsx` and `Contact.jsx` use `Reveal.jsx`/`useGsapReveal.js`; most other sections implement GSAP animations directly.
- `ui/Container.jsx` and `ui/GlassPanel.jsx` are defined but not currently used by rendered components.

---

## 6. Data flow

### Content/data sources
- **Static imported data:** `Frontend/src/data/programs.js`, `trainers.js`, `testimonials.js` consumed by `Programs.jsx`, `Trainers.jsx`, `Testimonials.jsx`.
- **In-component static data/config:** feature/reason/plan/gallery/stat arrays and copy in components (e.g. `Hero.jsx`, `Features.jsx`, `Membership.jsx`, `WhyChooseUs.jsx`, `Gallery.jsx`, `Contact.jsx`).
- **No initial remote data fetch** for page rendering.

### Runtime UI state (local `useState`)
- `App.jsx`: `loading`
- `Navbar.jsx`: `scrolled`, `open`, `active`, `hidden`
- `Membership.jsx`: `selected`
- `Gallery.jsx`: `active` (lightbox image)
- `Contact.jsx`: `form`, `errors`, `status`, `submitting`
- `BackToTop.jsx`: `visible`

### Contact submission flow (primary dynamic data path)
```text
User input -> Contact.jsx (form state)
  -> client validate() / onBlur
  -> fetch POST /api/contact {name,email,phone,message}
  -> Vite proxy (dev) -> Backend Express
  -> routes/contactRoutes.js -> controllers/contactController.js
  -> models/Contact.js -> MongoDB (if connected)
  -> JSON response
  -> Contact.jsx updates status/errors/form/submitting state -> UI feedback
```

**No global state store (Redux/Zustand/Context provider for app state) is used.**

---

## 7. API flow

### Frontend -> Backend (actual)
| URL | Method | Called from | Request payload | Response handling | UI consumer |
|---|---|---|---|---|---|
| `/api/contact` (relative; dev-proxied by `Frontend/vite.config.js`) | `POST` | `Frontend/src/components/Contact.jsx` (`onSubmit`) | JSON `{ name, email, phone, message }` | Handles success/error JSON, merges server `errors` (if any), updates `status/errors/form/submitting`; network failure shows connection error message | `Contact.jsx` |

### Backend endpoints (actual)
| URL | Method | Implementation | Request | Responses (actual behavior) |
|---|---|---|---|---|
| `/api/health` | `GET` | `Backend/src/server.js` | none | `200 { success, status: "ok", service: "ironforge-backend" }` |
| `/api/contact` | `POST` | `server.js` -> `routes/contactRoutes.js` -> `controllers/contactController.js` -> `models/Contact.js` | JSON body: `name,email,phone,message` | `400` validation errors; `503` DB not connected; `201` success + created id; `500` server error |
| unknown route | any | `middleware/errorHandler.js` (`notFound`) | n/a | `404 { success:false, message:"Route not found: ..." }` |

**Note:** `GET /api/health` exists but is not called by frontend code.

---

## 8. Routing

### Client-side routing
- **No router library/config** (no `react-router` dependency, no `<Routes>/<Route>` usage).
- **Single page render:** `App.jsx` always renders `pages/Home.jsx`.

### In-page navigation (anchor/scroll behavior)
| Target section ID | Component | Navigated from |
|---|---|---|
| `#home` | `Hero.jsx` | `Navbar.jsx`, `Footer.jsx`, brand/home actions |
| `#about` | `About.jsx` | `Navbar.jsx`, `Hero.jsx`, `Footer.jsx` |
| `#programs` | `Programs.jsx` | `Navbar.jsx`, `Hero.jsx`, `About.jsx`, `Footer.jsx` |
| `#trainers` | `Trainers.jsx` | `Navbar.jsx`, `Footer.jsx` |
| `#membership` | `Membership.jsx` | `Navbar.jsx`, `Hero.jsx`, `CTA.jsx`, `Programs.jsx` CTA links |
| `#gallery` | `Gallery.jsx` | `Navbar.jsx` |
| `#contact` | `Contact.jsx` | `Navbar.jsx`, `Membership.jsx` (plan button), `Footer.jsx` |

**Characteristics**
- Smooth scrolling via `scrollIntoView` / `window.scrollTo` and CSS `scroll-behavior` (where applicable)
- Active nav state tracked in `Navbar.jsx` with `IntersectionObserver`
- **No dynamic routes, protected routes, redirects, or URL path-based pages**

---

## 9. State management

### Approach
- **Local component state + refs + browser APIs** only.
- **No global store**, no React Context state provider for app data.

### Patterns used
- **`useState`** for UI/form/selection/visibility state (see section 6)
- **`useEffect`** for timers, listeners, observers, and cleanup (`App.jsx`, `Navbar.jsx`, `BackToTop.jsx`, `Gallery.jsx`, `CursorFollower.jsx`, `hooks/useInView.js`)
- **`useLayoutEffect`** for GSAP/DOM animation setup and cleanup in animated components and `hooks/useGsapReveal.js`
- **`useRef`** for DOM targets and animation element references
- **Custom hooks:** `useGsapReveal` (active), `useInView` (available but currently unused)
- **Props/callbacks:** parent-to-child props and local event handlers; no lifted global app state

---

## 10. Backend/database flow

```text
Frontend Contact.jsx
  -> POST /api/contact (JSON)
  -> (dev) Vite proxy Frontend/vite.config.js
  -> Backend/src/server.js (Express: cors, json parser)
  -> Backend/src/routes/contactRoutes.js
  -> Backend/src/controllers/contactController.js
       - trim/normalize + validate fields
       - ensure MongoDB connected (readyState === 1)
       - Contact.create(payload)
  -> Backend/src/models/Contact.js (Mongoose schema/model)
  -> MongoDB collection (contacts)
  -> JSON response to frontend
     (404/error responses handled by Backend/src/middleware/errorHandler.js when applicable)
```

### Persistence model (`Backend/src/models/Contact.js`)
- Fields: `name`, `email` (lowercased), `phone`, `message`, `status` (`new|contacted|closed`, default `new`)
- Options: `timestamps: true` (created/updated timestamps)

### DB connection behavior (`Backend/src/config/db.js`)
- Connects with `mongoose.connect(uri)` when `MONGODB_URI` is set
- Missing URI or connection failure logs warnings and returns without crashing the server (degraded mode for persistence)

---

## 11. Important functions

| File | Function / component | Purpose |
|---|---|---|
| `Frontend/src/main.jsx` | app bootstrap | Mounts React app into `#root` with `StrictMode`; imports global CSS |
| `Frontend/src/App.jsx` | `App` | App shell; manages loader visibility timeout and composes global UI + `Home` |
| `Frontend/src/pages/Home.jsx` | `Home` | Renders landing page section sequence |
| `Frontend/src/animations/gsap.js` | `setupGsap` | Registers GSAP `ScrollTrigger` once and returns configured `gsap` |
| `Frontend/src/hooks/useGsapReveal.js` | `useGsapReveal` | Ref-based scroll reveal animation with reduced-motion fallback and cleanup |
| `Frontend/src/hooks/useInView.js` | `useInView` | IntersectionObserver visibility hook (currently not used by components) |
| `Frontend/src/components/Navbar.jsx` | `Navbar`, `handleNavClick` | Scroll/active-section tracking, hide/show nav, mobile menu behavior, smooth in-page navigation |
| `Frontend/src/components/Hero.jsx` | `Hero` | Hero intro timeline, parallax, CTA scroll, GSAP counter animations |
| `Frontend/src/components/Gallery.jsx` | `Gallery` | Gallery reveal animations and lightbox state/keyboard/body-scroll handling |
| `Frontend/src/components/Membership.jsx` | `Membership` | Plan rendering/selection state and membership card animations (PRO emphasized) |
| `Frontend/src/components/Contact.jsx` | `validate`, `onChange`, `onBlur`, `onSubmit` | Form state/validation, API submission to `/api/contact`, server/network response handling |
| `Frontend/src/components/BackToTop.jsx` | `BackToTop`, `scrollTop` | Scroll threshold visibility and smooth scroll-to-top action |
| `Frontend/src/components/ui/CursorFollower.jsx` | `CursorFollower` | Desktop cursor follower/interaction animation (GSAP quickTo, pointer listeners) |
| `Backend/src/server.js` | bootstrap (module top-level) | Express setup, middleware/routes/middleware chain, DB connect, HTTP listen |
| `Backend/src/config/db.js` | `connectDB` | Mongoose connection with graceful fallback logging |
| `Backend/src/controllers/contactController.js` | `createContact` | Sanitizes/validates request, checks DB readiness, saves contact, returns API response |
| `Backend/src/middleware/errorHandler.js` | `notFound`, `errorHandler` | Standard JSON 404 and error responses |

---

## 12. User flow

### Visitor browsing flow
```text
Open site
  -> index.html loads + React mounts
  -> Loader shown briefly, landing page sections render
  -> User scrolls/clicks nav or CTA anchors
  -> Navbar highlights active section; animations/parallax/counters trigger on scroll
  -> User views programs/trainers/pricing/gallery/testimonials
  -> User opens gallery image (lightbox) and/or selects pricing plan
  -> User submits contact form
       -> client validation
       -> POST /api/contact
       -> success/error feedback shown
  -> User may use back-to-top button
```

### Contact form outcome flow
```text
Valid input + backend reachable + MongoDB connected
  -> 201 success -> success message + form reset

Valid input + backend reachable + MongoDB not connected
  -> 503 -> error message shown

Invalid input
  -> client-side or server-side 400 -> field errors/status shown

Backend unreachable/network error
  -> fetch catch -> connection error message shown
```

---

## 13. Development guide

### Run/build
- **Frontend:** `cd curioushub/curioushub/Frontend`
  - `npm run dev` (Vite dev server; proxies `/api` to `http://localhost:5001`)
  - `npm run build` (production build to `Frontend/dist/`)
  - `npm run preview` (preview production build)
  - `npm run lint`
- **Backend:** `cd curioushub/curioushub/Backend`
  - `npm run dev` (`node --watch src/server.js`)
  - `npm start` (`node src/server.js`)
  - Requires MongoDB reachable via `MONGODB_URI` for contact persistence; API may still start without DB connection

### Add a new page
- **Current state:** no router; `App.jsx` always renders `Home.jsx`.
- **New true page:** add `Frontend/src/pages/<Page>.jsx`, introduce a router (not currently present), and update `Frontend/src/App.jsx` / `Frontend/src/main.jsx` to render routes.
- **New landing section (current pattern):** add component in `Frontend/src/components/` and include it in `Frontend/src/pages/Home.jsx`; update anchor links/IDs in `Navbar.jsx`, `Footer.jsx`, and CTAs as needed.

### Add a new UI component
- **Section/feature component:** `Frontend/src/components/<Name>.jsx`
- **Reusable primitive:** `Frontend/src/components/ui/<Name>.jsx` (existing examples: `Button.jsx`, `Container.jsx`, `GlassPanel.jsx`, `CursorFollower.jsx`)
- **Optional existing empty folders:** `Frontend/src/components/layout/`, `Frontend/src/components/sections/`

### Add/modify an API
- **Frontend:** currently direct `fetch` in components (e.g. `Contact.jsx`). No `src/services/` layer exists; create one if you want to centralize API calls.
- **Backend:** add/modify
  - `Backend/src/routes/<feature>Routes.js`
  - `Backend/src/controllers/<feature>Controller.js`
  - `Backend/src/models/<Feature>.js` (if persisted)
  - mount route in `Backend/src/server.js`
  - shared middleware/utils in `Backend/src/middleware/`, `Backend/src/utils/`

### Modify styling
- **Global theme/tokens/glass/animations/reduced-motion:** `Frontend/src/index.css`
- **Component styles:** Tailwind utility classes in `Frontend/src/components/**`, `Frontend/src/pages/Home.jsx`
- **Head/meta/fonts/favicon:** `Frontend/index.html`, `Frontend/public/`
- **Styling/build config:** `Frontend/vite.config.js` (`@tailwindcss/vite`)

### Add environment variables
- **Backend:** define in `Backend/.env` and document in `Backend/.env.example`; read via `process.env.*` (`dotenv/config` loaded in `Backend/src/server.js`)
- **Frontend:** no current `VITE_*` usage; add `Frontend/.env*` and consume via `import.meta.env.VITE_*` if introducing frontend env config (and update proxy/fetch logic as needed)

---

## 14. Common places to make changes

| Change type | Primary files/locations |
|---|---|
| Landing page section order/content composition | `Frontend/src/pages/Home.jsx`, `Frontend/src/components/*.jsx` |
| Navigation links, active section behavior, mobile menu | `Frontend/src/components/Navbar.jsx`, `Frontend/src/components/Footer.jsx`, section `id` attributes in components |
| Hero messaging/stats/CTAs | `Frontend/src/components/Hero.jsx` |
| Pricing plans/selection behavior | `Frontend/src/components/Membership.jsx` |
| Programs/trainers/testimonials content data | `Frontend/src/data/programs.js`, `Frontend/src/data/trainers.js`, `Frontend/src/data/testimonials.js` (+ consuming components) |
| Gallery images/lightbox behavior | `Frontend/src/components/Gallery.jsx` |
| Contact form UI/validation/submission behavior | `Frontend/src/components/Contact.jsx` |
| Global visual theme (glass, colors, typography, motion defaults) | `Frontend/src/index.css`, `Frontend/index.html` |
| Animation setup/shared reveal behavior | `Frontend/src/animations/gsap.js`, `Frontend/src/hooks/useGsapReveal.js`, animated component files |
| Dev API proxy/build config | `Frontend/vite.config.js` |
| Backend API routes/controllers | `Backend/src/routes/contactRoutes.js`, `Backend/src/controllers/contactController.js`, `Backend/src/server.js` |
| Database schema/connection | `Backend/src/models/Contact.js`, `Backend/src/config/db.js`, `Backend/.env*` |
| Backend error responses/404 handling | `Backend/src/middleware/errorHandler.js` |

---

## 15. Known technical debt (observed in current codebase)

- **No frontend routing abstraction:** single-page anchor navigation only (`App.jsx`/`Home.jsx`, no `react-router`), so URL-based pages/deep links beyond anchors are not implemented.
- **No frontend API/service layer:** `Contact.jsx` performs validation and `fetch` directly; API concerns are coupled to UI.
- **Validation duplication:** contact field/regex validation logic is duplicated in `Frontend/src/components/Contact.jsx` and `Backend/src/controllers/contactController.js`.
- **Inconsistent reuse of abstractions:** `SectionHeading.jsx` is not used by most sections; `ui/Container.jsx` and `ui/GlassPanel.jsx` exist but are currently unused.
- **Dead/unused code/assets/dirs:** `hooks/useInView.js`, some `src/assets/*` files (e.g. `hero-image.png`, `hero.png`), empty dirs (`components/layout`, `components/sections`, `assets/images`, `Backend/src/utils`).
- **Generated/artifact directories present in repo tree:** `Frontend/dist/`, `Frontend/node_modules/`, `Backend/node_modules/` are present (can bloat repo and cause drift/confusion).
- **Backend resilience/security hardening gaps:** DB connection failures are logged but server continues (writes return `503`), no rate limiting/captcha/spam protection on contact endpoint, CORS/origins/env setup is dev-oriented.
- **Configuration hygiene:** `Backend/.env` exists in the project folder (risk if sensitive values are committed/shared); frontend has no `VITE_*` env-based API config and proxy target is hardcoded.
- **Documentation drift:** `Frontend/README.md` is still the default Vite template and does not describe IRONFORGE architecture/setup.
- **DOM-coupled navigation/observation:** section IDs and `document.getElementById`/observer assumptions are spread across components, making structural changes easy to miss.
- **Performance considerations:** animation-heavy UI (GSAP + multiple listeners/ScrollTriggers) and externally hosted images can impact load/runtime performance on low-end devices/networks.

---

## Synchronization notes

- This document reflects the **current implementation**, including intentional/actual behaviors such as: single-page composition (`Home.jsx`), anchor-based navigation, local state only, direct `fetch` in `Contact.jsx`, Vite `/api` proxy, backend health/contact endpoints, and MongoDB degraded-mode behavior.
- When architecture changes (routing, state management, API/service layers, data sources, backend modules, build/env setup), update this file in the same change to keep it accurate.
