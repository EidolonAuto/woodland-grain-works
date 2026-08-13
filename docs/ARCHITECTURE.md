# Architecture

## Current state

V1 is a provider-neutral static site. `index.html` owns durable semantic content; modular stylesheets compose the visual system; ES modules add optional behavior. No compilation step is required to serve the website.

```text
index.html
  ├─ css/tokens.css → shared visual contract
  ├─ css/base.css + components.css → global presentation
  ├─ css/animations.css + pages/home.css → motion and composition
  └─ js/main.js
       ├─ navigation.js
       ├─ motion.js → shared reveal and pointer response
       ├─ particles.js → bounded Canvas ambience
       └─ portfolio.js → content data and DOM rendering
```

## Decisions

- **No framework:** V1 state and rendering needs are small; native APIs keep the payload, failure surface, and maintenance burden low.
- **One-page V1:** anchor navigation makes every route real while the first milestone focuses effort on a complete homepage. Standalone service and project pages can be introduced when verified content warrants them.
- **Portfolio data module:** project content is a plain object collection, ready to be replaced by fetched JSON or an API later.
- **Canvas is decorative:** the ambient system is ignored by assistive technology, uses a capped pixel ratio and low particle count, pauses in hidden tabs, and turns off for reduced motion.
- **Original SVG studies:** launch visuals avoid licensing risk and are explicitly distinguished from completed customer projects.

## Content boundaries

Ordinary page copy is in HTML. Repeating project entries live in JavaScript data. If editing volume grows substantially, migrate the data source without changing the rendering and design contracts. Do not build a fake local database.

## Future integration points

- Inquiry form: secure serverless or hosted form endpoint with server-side validation, spam protection, retention rules, and transparent user feedback.
- Portfolio: static JSON, headless API, or generated files with the same project schema.
- Analytics: opt-in, privacy-aware configuration only; none ships by default.

