# Design direction

The central visual metaphor is that wood grain and circuitry are related geometries. Growth rings, signal paths, measurement marks, and controlled light create a workshop-at-the-forest-edge atmosphere without leaning on fantasy or rustic nostalgia.

## System

- Brand purple: `#4F0E70`
- Warm brass/gold: `#C79543`
- Foundation: near-black, parchment, deep forest, and restrained muted neutrals
- Display typography: a system Georgia serif for a crafted editorial voice
- Body typography: native system sans for performance and clarity
- Geometry: mostly square and linear; radius is reserved rather than applied to every surface

All reusable values are in `css/tokens.css`. Local one-off dimensions are acceptable only when tied to a specific illustration or composition.

## Motion narrative

- Hero paths draw like an engraving pass.
- A scan line connects precision light to the material mark.
- Dust particles imply a working environment without becoming smoke or spectacle.
- Service artwork uses vector tracing, while section reveals are slow and controlled.
- Pointer response is limited to fine pointers; touch receives fully visible equivalent content.

Reduced-motion mode removes continuous scanning and Canvas ambience, resolves drawn paths immediately, and reveals all content without translation.

## Photography needed

No external photos are included. When genuine work is documented, source these assets with clear ownership:

- Hero/workshop atmosphere: 16:10 or 3:2, minimum 2400 px wide, dark controlled lighting, real workspace detail, no staged lumberjack styling.
- Portfolio projects: 4:5 portrait and 3:2 landscape crops, minimum 1600 px on the long edge, consistent warm-neutral grading.
- Process details: 1:1 and 4:3 close-ups showing hands, tools, grain, wiring quality, and finish detail without revealing private customer data.

Export AVIF and WebP variants with meaningful alt text. Preserve the SVG concept studies as optional graphic interludes rather than passing them off as project photography.

