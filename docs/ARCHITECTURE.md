# Architecture

## Current state

V1 is a provider-neutral, multi-page static site. The homepage is an animated navigation hub; Services, Work, About, and Contact are dedicated HTML documents that feel like connected areas of one visual canvas. Semantic content and links work without JavaScript. ES modules add optional reveal, parallax, cross-page camera movement, Canvas ambience, and local utility behavior.

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
       ├─ page-transitions.js → progressive workshop-map dolly transitions
       ├─ project-note.js → local-only clipboard utility
       └─ portfolio.js → project data and rendering
```

## Decisions

- **No framework, runtime dependency, or build output:** native APIs keep deployment portable and the source directly inspectable.
- **Hub-and-destinations model:** the homepage creates atmosphere and directs visitors; destination pages carry detail without repeating a corporate landing-page funnel.
- **Portfolio data module:** project content is a plain object collection ready to become JSON or API data later.
- **Bounded graphics:** particles and depth scenes are ignored by assistive technology, paused or simplified when hidden or off-screen, and static for reduced motion.
- **Honest visual studies:** concept renders are explicitly distinguished from completed customer projects.

## Content boundaries

Durable page copy lives in HTML. Repeating project entries live in JavaScript data. The contact utility only assembles and copies a plain-text note; it performs no network request or persistence. Actual submission remains deferred until a secure endpoint, privacy handling, abuse controls, and verified business details exist.

## Future integration points

- Inquiry form: a secure serverless or hosted form endpoint with server-side validation and understandable error states.
- Portfolio: static JSON, a headless API, or generated documents retaining the current project schema.
- Analytics: opt-in and privacy-aware only; none ships by default.
