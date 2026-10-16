# Export and verify loop

```
node export.mjs             # out/slide-XX.png (2x) + out/carousel.pdf, prints the PDF page count
node export.mjs --video     # also records a webm of the viewer (optional)
```

Then build a contact sheet and look at it. With Python and Pillow:

```python
from PIL import Image
import glob
files = sorted(glob.glob("out/slide-*.png"))
cols, w, h = 5, 360, 450
rows = -(-len(files) // cols)
sheet = Image.new("RGB", (cols * w, rows * h), "#222")
for i, f in enumerate(files):
    sheet.paste(Image.open(f).convert("RGB").resize((w, h)), ((i % cols) * w, (i // cols) * h))
sheet.save("out/contact-sheet.png")
```

Open `out/contact-sheet.png` with the Read tool. Inspect at least the cover at 540x675.

## Check
- [ ] Numeral never collides with the headline
- [ ] Headline is 2 lines, not 3 (shrink `font-size`, or add `nowrap` on the cover)
- [ ] Nothing decorative sits behind body text
- [ ] Mascot or hero visual does not overlap copy
- [ ] Footer and counter readable on every theme, including dark ones
- [ ] Arabic text shapes correctly (joined letters, right-to-left order, no tofu boxes)
- [ ] Neighbouring slides use different themes
- [ ] No slide over 45 words
- [ ] PDF page count equals slide count
- [ ] Source credited on the last slide, series mark on every slide

Re-export after every fix. Loop until a full pass is clean, then deliver.

## Common fixes
| Symptom | Fix |
|---|---|
| Headline wraps to 3 lines | smaller `font-size` or shorter `max-width` on that slide's title |
| Missing glyphs | font did not load; check the `<link>` and network, or use a system fallback |
| PDF blank pages | the export page was not at `?export=1`; do not open the viewer URL for the PDF |
| Fonts differ between PNG and PDF | wait for `document.fonts.ready` (the export script already does) |
