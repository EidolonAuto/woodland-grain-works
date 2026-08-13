# Woodland Grain Works

The V1 Woodland Grain website is a custom static web experience built with semantic HTML, modular CSS, modern vanilla JavaScript, SVG, and a small optional Canvas enhancement. It has no CMS, database, framework, runtime backend, or production dependency bundle.

## Preview locally

Any static HTTP server works. From the repository root, use one of:

```powershell
python -m http.server 4173
```

```powershell
npx serve . -l 4173
```

Then open `http://localhost:4173`. Do not rely on opening `index.html` directly: browsers can restrict ES modules under `file://` URLs.

## Quality checks

Use Node.js 22 or newer:

```powershell
npm install
npm run check
```

The checks validate HTML, lint JavaScript and CSS, and run source-level regression tests. The public site itself does not require Node or a build step.

## Deploy

- **GitHub Pages:** set Pages source to **GitHub Actions**. The included deployment workflow publishes the repository root on pushes to `main`.
- **Cloudflare Pages, Netlify, or Vercel:** choose a static project, leave the build command empty, and set the publish directory to `.`.

All public paths are relative, so the site works from a project subpath. Before production launch, replace the placeholder canonical URL and configure a real absolute social image URL.

## Launch blockers

The inquiry form is intentionally disabled. Connect a secure form/serverless endpoint, add abuse protection and privacy handling, then enable it. Real business email, phone, address, hours, and service-area details are also pending; the site does not invent them.

Project artwork in V1 is explicitly labeled as concept studies. Replace or supplement it with licensed, optimized AVIF/WebP photography as genuine project documentation becomes available. See [docs/DESIGN.md](docs/DESIGN.md) for art direction.

## Project map

- `index.html` — semantic page content and progressive-enhancement baseline
- `css/` — reset, tokens, core components, animation, and page composition
- `js/` — navigation, centralized motion, ambient particles, and data-driven portfolio
- `assets/` — original editable SVG branding and illustrations
- `docs/` — architecture, design rationale, deployment, and roadmap

