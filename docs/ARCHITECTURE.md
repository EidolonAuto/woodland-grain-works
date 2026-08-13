# Architecture

## Current state

V1 is a provider-neutral, multi-page static site. The homepage is an animated navigation hub; Services, Work, About, and Contact are dedicated HTML documents with a calmer editorial rhythm. Semantic content and links work without JavaScript. ES modules add optional reveal, pointer, Canvas, and data-rendering behavior.

```text
*.html
  ├─ css/tokens.css → shared visual contract
  ├─ css/base.css + components.css → global presentation
  ├─ css/animations.css → shared motion and reduced-motion behavior
  ├─ css/pages/home.css → animated hub composition
  ├─ css/pages/internal.css → destination page composition
  └─ js/main.js
       ├─ navigation.js
       ├─ motion.js → shared reveal and pointer response
       ├─ particles.js → bounded homepage Canvas ambience
       └─ portfolio.js → project data and rendering
```

## Decisions

- **No framework or build output:** native APIs keep deployment portable and the runtime small.
- **Hub-and-destinations model:** the homepage creates atmosphere and directs visitors; destination pages carry detail without repeating a corporate landing-page funnel.
- **Portfolio data module:** project content is a plain object collection ready to become JSON or API data later.
- **Decorative Canvas only:** particles are capped, ignored by assistive technology, paused in hidden tabs, and disabled for reduced motion.
- **Original SVG studies:** visuals avoid licensing risk and are explicitly distinguished from completed customer projects.

## Content boundaries

Durable page copy lives in HTML. Repeating project entries live in JavaScript data. The contact interface remains disabled until a secure endpoint, privacy handling, abuse controls, and verified business details exist.

## Future integration points

- Inquiry form: a secure serverless or hosted form endpoint with server-side validation and understandable error states.
- Portfolio: static JSON, a headless API, or generated documents retaining the current project schema.
- Analytics: opt-in and privacy-aware only; none ships by default.
