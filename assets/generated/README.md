# Extracted brand UI kit

These transparent PNG assets were cropped from the supplied business-card palette sheets in `assets/branding/source/` and processed by `tools/extract-brand-assets.ps1`.

## Contents

- `service-*.png` — six circular capability medallions
- `mountain.png`, `forest.png`, `moon.png`, `stars.png`, `winding-path.png` — landscape layers
- `gem.png`, `divider.png`, `corner-ornaments.png` — interface accents
- `hd/` — retina-ready transparent assets used by the website. Service medallions are high-resolution redraws; landscape and ornament layers are 4× high-quality transparent upscales.

The source sheets include labels and nearby elements, so crop coordinates are deliberately conservative. Re-run the extraction script after adjusting a crop rather than editing generated files by hand.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools/extract-brand-assets.ps1 `
  -SourceDirectory assets/branding/source `
  -OutputDirectory assets/generated
```

After extraction, rebuild the high-resolution decorative layers with:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools/upscale-transparent-assets.ps1
```

The unrelated fire-wing image supplied accidentally is not stored or referenced in this repository.
