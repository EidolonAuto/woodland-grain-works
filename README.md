# Woodland Grain Works

Woodland Grain Works V1 is a custom static web experience built with semantic HTML, modular CSS, modern vanilla JavaScript, SVG, and Canvas. It has no CMS, database, framework, runtime backend, runtime dependency, or build step.

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

The contact page builds a project note locally and copies it to the visitor's clipboard. It does not submit or store data. Connect a secure form or serverless endpoint, add abuse protection and privacy handling, then add an actual send action. Real business email, phone, address, hours, and service-area details are pending; the site does not invent them.

Project artwork is explicitly labeled as concept studies. Replace or supplement it with licensed, optimized AVIF/WebP photography as genuine project documentation becomes available. See [docs/DESIGN.md](docs/DESIGN.md) for art direction.

## Project map

- `index.html` — animated workshop hub and progressive-enhancement baseline
- `services.html`, `portfolio.html`, `about.html`, `contact.html` — dedicated destinations
- `css/` — reset, tokens, components, shared animation, hub, and interior page composition
- `js/` — navigation, layered parallax, cross-page camera transitions, local project-note tooling, ambient particles, and data-driven portfolio
- `assets/` — original editable SVG branding and illustrations
- `assets/generated/` — transparent UI accents and service medallions extracted from supplied brand palettes
- `tools/extract-brand-assets.ps1` — reproducible palette-sheet extraction workflow
- `docs/` — architecture, design rationale, deployment, and roadmap

## Dimensional motion

The site creates depth from separate image and interface planes rather than modeled objects. `js/motion.js` applies damped pointer and scroll parallax only while scenes are visible. `js/page-transitions.js` turns ordinary same-origin links into a short pull-back and push-in camera move. Links remain normal links when JavaScript is unavailable, and reduced-motion mode skips both effects.
