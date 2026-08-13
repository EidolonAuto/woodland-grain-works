# Spatial render set

These transparent PNGs are original AI-generated interface concept art. They are decorative brand assets and must not be described as completed customer work.

| Asset                   |  Dimensions | Interface role                                   |
| ----------------------- | ----------: | ------------------------------------------------ |
| `precision-relic.png`   | 1536 × 1024 | Homepage focal artifact and selected-work portal |
| `laser-fabrication.png` | 1536 × 1024 | Services portal                                  |
| `forest-model.png`      | 1536 × 1024 | About portal                                     |
| `signal-orb.png`        | 1214 × 1295 | Contact portal                                   |

## Art direction

The set combines realistic blackened walnut, brushed brass, charcoal metal, and deep-purple glass. Each image was generated as an isolated physically based product render with no text, logo, people, scenery, or baked-in UI. The transparent padding is intentional so CSS can compose the object at different aspect ratios without destructive cropping.

Use these through the shared `.spatial-render` template. Keep width and height attributes in HTML, lazy-load non-hero instances, and preserve the reduced-motion rules when adding new depth layers.
