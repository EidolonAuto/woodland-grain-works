# Woodland Grain Works

Woodland Grain Works V1 is a custom static web experience built with semantic HTML, modular CSS, modern vanilla JavaScript, SVG, and a small optional Canvas enhancement. It has no CMS, database, framework, runtime backend, or production dependency bundle.

The homepage acts as an animated workshop hub. Dedicated Services, Work, About, and Contact pages provide quieter, focused destinations.

## Preview locally

Any static HTTP server works. From the repository root:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`. Do not rely on opening `index.html` directly because browsers can restrict ES modules under `file://` URLs.

## Quality checks

Use Node.js 22 or newer:

```powershell
npm install
npm run check
```

The checks validate every HTML page, lint JavaScript and CSS, and run source-level regression tests. The public site itself does not require Node or a build step.

## Deploy

- **GitHub Pages:** set Pages source to **GitHub Actions**. The included workflow publishes the repository root on pushes to `main`.
- **Cloudflare Pages, Netlify, or Vercel:** choose a static project, leave the build command empty, and set the publish directory to `.`.

All public paths are relative, so the site works from a project subpath. Production metadata currently targets `https://eidolonauto.github.io/woodland-grain-works/`. Update canonical, Open Graph, sitemap, and robots URLs together if a custom domain is introduced.

## Deferred launch work

The inquiry form is intentionally disabled. Connect a secure form or serverless endpoint, add abuse protection and privacy handling, then enable it. Real business email, phone, address, hours, and service-area details are pending; the site does not invent them.

Project artwork is explicitly labeled as concept studies. Replace or supplement it with licensed, optimized AVIF/WebP photography as genuine project documentation becomes available. See [docs/DESIGN.md](docs/DESIGN.md) for art direction.

## Project map

- `index.html` — animated workshop hub and progressive-enhancement baseline
- `services.html`, `portfolio.html`, `about.html`, `contact.html` — dedicated destinations
- `css/` — reset, tokens, components, shared animation, hub, and interior page composition
- `js/` — navigation, centralized motion, ambient particles, and data-driven portfolio
- `assets/` — original editable SVG branding and illustrations
- `docs/` — architecture, design rationale, deployment, and roadmap
