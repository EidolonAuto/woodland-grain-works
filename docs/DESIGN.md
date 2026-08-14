# Design direction

The central visual metaphor is that wood grain and circuitry are related geometries. Growth rings, signal paths, measurement marks, and controlled light create a workshop-at-the-forest-edge atmosphere without fantasy or rustic nostalgia.

The homepage is an animated map rather than a conventional sales funnel: four large workshop doors lead to focused destination pages. Interior pages use a calmer editorial cadence so detail remains easy to read.

## System

- Brand purple: `#4F0E70`
- Warm brass/gold: `#C79543`
- Foundation: near-black, parchment, deep forest, and restrained neutrals
- Display typography: system Georgia serif for a crafted editorial voice
- Body typography: native system sans for performance and clarity
- Geometry: mostly square and linear; radius is reserved rather than applied to every surface

Reusable values live in `css/tokens.css`. Local one-off dimensions are acceptable only when tied to a specific illustration or composition.

## Motion narrative

- Hero paths draw like an engraving pass.
- A scan line connects precision light to the material mark.
- Dust particles imply a working environment without becoming smoke or spectacle.
- Portal artwork responds gently to fine-pointer movement; content and destinations remain fully visible on touch.
- Section reveals are slow and controlled; procedural objects respond with damped rotation rather than novelty motion.

Reduced-motion mode removes continuous scanning and Canvas ambience, resolves drawn paths immediately, and reveals all content without translation.

Motion follows a staged editorial system: a short layered entrance establishes hierarchy, content reveals once with directional depth, and technical linework draws only when it becomes relevant. Fine-pointer responses use damped interpolation rather than snapping; ambient movement stays subordinate to reading.

The site treats every page as part of one dimensional canvas. Supplied moon, mountain, forest, path, material, and interface elements sit on separate depth planes. Pointer movement shifts nearby planes farther than distant ones; scroll introduces a second axis of movement. Same-origin page changes pull back to a full-screen illustrated workshop map, identify the selected destination, and push the camera into the next page. Nothing in the depth system is presented as a fabricated product or completed technical installation.

## Supplied brand artwork

The business-card artwork establishes a richer purple-night, engraved-gold visual vocabulary. The website uses it selectively:

- `assets/backgrounds/woodland-night-road-v2.jpg` is a generated wide adaptation of the supplied square landscape, with dark text-safe space on the left.
- `assets/generated/` preserves the original transparent extractions. `assets/generated/hd/` contains the retina-ready set used by the site: six 1254 × 1254 high-detail service redraws plus padded 4× decorative layers.
- `assets/branding/legacy/` preserves the supplied transparent maker seal and print SVG as reference assets.
- The homepage section divider is a single CSS-rendered brass and purple line, keeping the ornament crisp and visually quieter at every viewport size.

The detailed artwork is treated as atmosphere and emphasis rather than applied to every surface. Text remains HTML, not baked into images. The extraction script and original palette sources are retained so the UI kit is reproducible.

## Photography needed

No external photos are included. When genuine work is documented, source these assets with clear ownership:

- Hero/workshop atmosphere: 16:10 or 3:2, minimum 2400 px wide, dark controlled lighting, real workspace detail, no staged lumberjack styling.
- Portfolio projects: 4:5 portrait and 3:2 landscape crops, minimum 1600 px on the long edge, consistent warm-neutral grading.
- Process details: 1:1 and 4:3 close-ups showing hands, tools, grain, wiring quality, and finish detail without revealing private customer data.

Export AVIF and WebP variants with meaningful alt text. Preserve SVG concept studies as graphic interludes instead of presenting them as project photography.
