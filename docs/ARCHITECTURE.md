# Architecture

## Current state

V1 is a provider-neutral, multi-page static site. The homepage is an animated navigation hub; Services, Work, About, and Contact are dedicated HTML documents that feel like connected areas of one visual canvas. Semantic content and links work without JavaScript. ES modules add optional reveal, parallax, cross-page camera movement, Canvas ambience, and local utility behavior. `spatial-scenes.js` owns the shared homepage camera calculations; `page-transitions.js` reuses the same layer contract for clicked navigation.

```text
*.html
  ├─ css/tokens.css → shared visual contract
  ├─ css/base.css + components.css → global presentation
  ├─ css/animations.css → shared motion and reduced-motion behavior
  ├─ css/pages/home.css → animated hub composition
  ├─ css/pages/internal.css → destination page composition
  └─ js/main.js
       ├─ navigation.js
       ├─ motion.js → shared reveal and object response
       ├─ spatial-scenes.js → homepage scroll and pointer camera engine
       ├─ particles.js → bounded homepage Canvas ambience
       ├─ page-transitions.js → in-page and cross-page camera transitions
       ├─ project-note.js → local-only clipboard utility
       └─ portfolio.js → project data and rendering
```

## Decisions

- **No framework, runtime dependency, or build output:** native APIs keep deployment portable and the source directly inspectable.
- **Hub-and-destinations model:** the homepage creates atmosphere and directs visitors; destination pages carry detail without repeating a corporate landing-page funnel.
- **Portfolio data module:** project content is a plain object collection ready to become JSON or API data later.
- **Bounded graphics:** particles and depth scenes are ignored by assistive technology, paused or simplified when hidden or off-screen, and static for reduced motion.
- **Honest visual studies:** concept renders are explicitly distinguished from completed customer projects.

## Spatial scene contract

Homepage environments opt into one reusable contract instead of owning separate scroll listeners:

- `data-workshop-scene` marks a camera environment.
- `data-scene-layer` assigns a scene plane; larger values travel farther and represent nearer objects.
- `data-depth-scene` and `data-depth` provide smaller pointer and scroll separation inside an object composition.
- `data-engraving` opts an SVG into the shared observed line-reveal behavior.

`spatial-scenes.js` caches document measurements and renders all active scene properties from one passive scroll listener and one scheduled animation frame. Distant scenes become dormant, stop reserving `will-change`, and pause decorative light effects. CSS owns the actual transforms through semantic custom properties, so a new scene can reuse the engine without adding JavaScript.

`page-transitions.js` reuses these layers for clicked anchors and same-origin page changes. Ordinary URLs, browser history, deep anchors, focus transfer, and non-JavaScript navigation remain intact.

## Content boundaries

Durable page copy lives in HTML. Repeating project entries live in JavaScript data. The contact utility only assembles and copies a plain-text note; it performs no network request or persistence. Actual submission remains deferred until a secure endpoint, privacy handling, abuse controls, and verified business details exist.

## Future integration points

- Inquiry form: a secure serverless or hosted form endpoint with server-side validation and understandable error states.
- Portfolio: static JSON, a headless API, or generated documents retaining the current project schema.
- Analytics: opt-in and privacy-aware only; none ships by default.
