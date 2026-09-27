# ROLO PRODUCT — Website

Single-page marketing website for ROLO PRODUCT d.o.o., a company that manufactures and installs custom PVC and ALU joinery in Montenegro. Built with React 19, TypeScript, and Vite; deployed to GitHub Pages under the custom domain `roloproduct.com`.

Live: https://roloproduct.com/

---

## Architecture / Flow Diagram

![Architecture and flow diagram](diagram.png)

---

## Screenshots

| Screen | Description |
|---|---|
| `img-1.png` | Google Analytics — traffic overview (production) |
| `img-2.png` | Google Analytics — visitor statistics (production) |
| Hero | Video background with glassmorphism testimonial card |
| Services | Embla carousel with liquid glass cards |
| About | GSAP ScrollTrigger 3D flip animation |
| Gallery | Masonry grid with lightbox preview |
| Testimonials | Dual marquee with noise overlay |
| FAQ | Accordion with WebGL grainient background |
| Door Panels | Drag-scroll slider with lightbox preview |
| Contact | Split view with Google Maps embed |
| Footer | Legal modals (privacy, cookies, terms) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Language | TypeScript 5 |
| Build Tool | Vite 8 |
| Animation | GSAP + ScrollTrigger, Motion |
| Carousel | Embla Carousel |
| WebGL | OGL (custom shader for background effect) |
| Icons | Lucide React |
| Utilities | clsx, tailwind-merge |
| Image Optimization | Sharp (build-time script) |
| Fonts | Google Fonts (Inter, Bebas Neue, DM Sans, Playfair Display) |
| Deployment | GitHub Pages (gh-pages) |
| Authentication | N/A (static site, no backend) |
| Database | N/A (static site, no backend) |

---

## Features

- Single-page layout with anchored section navigation
- WebGL grainient background rendered with OGL custom shader
- GSAP ScrollTrigger pinned section with 3D card flip animation
- Embla Carousel with autoplay, drag, keyboard navigation, and dot indicators
- Masonry gallery with IntersectionObserver lazy-reveal and full-screen lightbox
- Dual-row infinite marquee for testimonials with noise overlay
- Drag-scroll door panel slider (mouse and touch) with lightbox
- Contact section with Google Maps embed and in-page detail view
- Legal documents (privacy policy, cookie policy, terms) served in accessible modals
- Structured data: `HomeAndConstructionBusiness`, `Organization`, `FAQPage`
- Full meta tag coverage: Open Graph, Twitter Card, geo targeting, robots directives
- Accessible keyboard navigation, ARIA attributes, skip link, `prefers-reduced-motion` support
- Responsive layout targeting mobile, tablet, and desktop breakpoints

---

## Project Structure

```text
roloproduct-website/
├── public/
│   ├── favicon/                      Favicon set (SVG, PNG, webmanifest)
│   ├── galerija/                     Gallery images and optimized variants
│   ├── karusel/                      Services carousel images
│   ├── paneli/                       Door panel images (16 total)
│   ├── recenzije/                    Testimonial avatars
│   ├── servisi/                      About section images
│   ├── kontakt/                      Contact section images
│   ├── CNAME                         Custom domain (roloproduct.com)
│   ├── robots.txt                    Search engine crawl directives
│   └── sitemap.xml                   Sitemap for search engines
├── scripts/
│   └── optimize-gallery-images.mjs   Sharp-based build-time image optimizer
├── src/
│   ├── components/
│   │   ├── Footer.tsx                Footer with legal document modals
│   │   ├── Grainient.tsx             WebGL noise/gradient background
│   │   ├── Marquee.tsx               Infinite scroll marquee primitive
│   │   ├── ShinyText.tsx             Gradient shine text effect
│   │   └── ui/
│   │       ├── carousel.tsx          Carousel primitives
│   │       └── liquid-glass.tsx      Glassmorphism card and button components
│   ├── hooks/
│   │   ├── useInView.ts              IntersectionObserver wrapper
│   │   └── useMediaQuery.ts          Media query hook
│   ├── sections/
│   │   ├── Hero.tsx                  Hero section (video background)
│   │   ├── Services.tsx              Services carousel section
│   │   ├── About.tsx                 About section with GSAP animation
│   │   ├── Gallery.tsx               Gallery section with lightbox
│   │   ├── Testimonials.tsx          Testimonials marquee section
│   │   ├── FAQ.tsx                   FAQ accordion section
│   │   ├── DoorPanels.tsx            Door panels slider section
│   │   └── Contact.tsx               Contact section with map
│   ├── types/
│   │   ├── index.ts                  Shared TypeScript types
│   │   └── data.ts                   Static data (services, testimonials, FAQ)
│   ├── generated/
│   │   └── gallery-images.ts         Auto-generated gallery metadata
│   ├── site.ts                       Site config (contact, nav, legal docs)
│   ├── App.tsx                       Root component
│   ├── main.tsx                      Application entry point
│   └── index.css                     Global styles and CSS variables
├── index.html                        HTML shell with SEO metadata
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## Setup and Installation

### Prerequisites

- Node.js 20 or newer
- npm 10 or newer

### Install

```bash
git clone https://github.com/USERNAME/roloproduct-website.git
cd roloproduct-website
npm install
```

### Development server

```bash
npm run dev
```

Application runs at `http://localhost:3000`.

### Production build

```bash
npm run build
```

Build output is written to `dist/`.

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Optimize gallery images

```bash
npm run optimize:gallery
```

Reads originals from `public/galerija/`, generates 480px, 900px, and 1400px variants in WebP and JPEG formats, writes them to `public/galerija/optimized/`, and regenerates `src/generated/gallery-images.ts`.

### Deploy to GitHub Pages

```bash
npm run deploy
```

The `predeploy` script runs `npm run build` before publishing `dist/` via `gh-pages`.

---

## API Reference

This is a static frontend project and exposes no HTTP API. Navigation is handled client-side through anchored section IDs. The table below lists the section routes and their target anchors.

| Section | Anchor | Rendered By |
|---|---|---|
| Hero | `#hero` | `src/sections/Hero.tsx` |
| Services | `#usluge` | `src/sections/Services.tsx` |
| About | `#o-nama` | `src/sections/About.tsx` |
| Gallery | `#galerija` | `src/sections/Gallery.tsx` |
| Testimonials | `#utisci` | `src/sections/Testimonials.tsx` |
| FAQ | `#faq` | `src/sections/FAQ.tsx` |
| Door Panels | `#vrata-paneli` | `src/sections/DoorPanels.tsx` |
| Contact | `#kontakt` | `src/sections/Contact.tsx` |

External integrations (read-only, no authentication):

| Integration | Purpose | Reference |
|---|---|---|
| Google Maps Embed | Display company location in contact section | `SITE_INFO.mapsEmbedUrl` in `src/site.ts` |
| Google Fonts | Typography (Inter, Bebas Neue, DM Sans, Playfair Display) | `index.html` |
| Google Analytics | Traffic measurement | Injected script in deployment |

---

## Security & Architecture Considerations

- Static site: no server-side runtime, no database, no user accounts, no session storage.
- All data (services, testimonials, FAQ, legal documents) is defined in TypeScript modules and bundled at build time.
- External embed (Google Maps) is loaded in a sandboxed `iframe` with `loading="lazy"` and `referrerPolicy="no-referrer-when-downgrade"`.
- All outbound links use `rel="noreferrer"` when opened in a new tab.
- Content Security is managed at the host level (GitHub Pages). No inline event handlers are used; interactions are bound through React.
- Images are pre-optimized (WebP/JPEG, responsive `srcset`) to reduce bandwidth and avoid runtime image processing.
- Semantic HTML and ARIA attributes are used throughout to support assistive technologies.
- `prefers-reduced-motion` is respected to disable non-essential animation.
- No analytics cookies are set by the site itself; any tracking is delegated to the deployed Google Analytics snippet and governed by the cookie policy published in the site footer.

---

## License

Proprietary. Copyright (c) ROLO PRODUCT d.o.o. All rights reserved. The source code is the property of the client. Copying, redistribution, or commercial use without prior written permission is prohibited.
