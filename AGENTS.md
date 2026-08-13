# Woodland Grain engineering rules

## Architecture

- This repository is a static front-end website. Do not introduce WordPress, a CMS, PHP, a database, server-side rendering, or a JavaScript framework without a requirement that clearly justifies the change.
- Preserve progressive enhancement: semantic content and navigation must remain understandable when JavaScript fails.
- Keep content, rendering, motion, and visual tokens separated. Prefer small ES modules and CSS custom properties over dependencies.
- Use relative public paths so the project remains portable across static hosts and subpaths.

## Experience

- The visual idea is nature transformed through precision: forest, grain, geometry, light, circuitry, and workshop craft.
- Avoid generic templates, rustic clichés, SaaS styling, fake textures, excessive cards, and motion without narrative purpose.
- Design mobile-first. Important information cannot be hover-only, and touch targets should be comfortable.
- Every advanced visual must have an attractive static fallback. Respect `prefers-reduced-motion`, reduce density on compact devices, and pause continuous effects when hidden.

## Content and safety

- Never invent testimonials, clients, awards, certifications, pricing, contact details, locations, hours, or service areas.
- Label concept artwork and synthetic fixtures clearly. Do not present them as customer work.
- Do not create fake form success. Public submissions require an intentional secure integration, validation, abuse controls, and privacy review.
- Keep third-party assets out unless licensing and attribution requirements are understood and documented.

## Quality

- Use semantic HTML, visible keyboard focus, logical headings, sufficient contrast, accessible names, and useful alt text.
- Prefer SVG and CSS transforms; use `requestAnimationFrame` only for continuous effects and `IntersectionObserver` for entrance triggers.
- Run `npm run check` after source changes and test rendered behavior at representative phone, tablet, laptop, and desktop widths. Test reduced motion and keyboard navigation.
- Do not claim a check, render, or deployment succeeded unless it was actually verified.
- Update documentation when architecture, launch requirements, or developer workflow changes.

