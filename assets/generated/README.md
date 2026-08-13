# Extracted brand UI kit

These transparent PNG assets were cropped from the supplied business-card palette sheets in `assets/branding/source/` and processed by `tools/extract-brand-assets.ps1`.

## Contents

- `service-*.png` — six circular capability medallions
- `mountain.png`, `forest.png`, `moon.png`, `stars.png`, `winding-path.png` — landscape layers
- `gem.png`, `divider.png`, `corner-ornaments.png` — interface accents

The source sheets include labels and nearby elements, so crop coordinates are deliberately conservative. Re-run the extraction script after adjusting a crop rather than editing generated files by hand.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools/extract-brand-assets.ps1 `
  -SourceDirectory assets/branding/source `
  -OutputDirectory assets/generated
```

The unrelated fire-wing image supplied accidentally is not stored or referenced in this repository.
