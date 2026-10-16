# Design brief from references

Goal: convert the user's references into a short written brief and a set of CSS tokens. The brief is what the user approves in step 4.

## 1. Read every reference
- Images: open each with the Read tool and look at it.
- URLs: fetch them and pull colours, fonts and layout cues from the CSS or the page text.
- Past carousels (PDF/PNG): sample the cover and two inner slides.
- A film, video or painting as mood reference: use it for palette, mood and silhouette language only. Never copy frames, characters or faces.

## 2. Extract, in this order
| Dimension | Capture |
|---|---|
| Palette | 3-7 hexes: sky/background tones, ink, soft ink, one accent, one light source |
| Washes | If the reference uses one colour per scene, list each wash with its hexes (a "scene" per slide) |
| Type | display family (headlines, numerals) + UI/body family; weights; an Arabic or Latin match for the target language |
| Layout grammar | numeral placement, headline size, block style, corner chrome (mark, counter, source) |
| Illustration | line weight, fills (flat or textured), silhouettes, how many shapes per object, one accent detail |
| Motion | only if the output includes a viewer or video |
| Mascot | pose, placement, whether it recurs (cover, one middle, close) |

## 3. Write the tokens
Edit `engine/css/tokens.css` (the copy inside the carousel folder). Each slide theme is a block that sets the same variables:

```
--bg-1 --bg-2 --bg-3    background gradient stops
--ink --soft-ink        text colours
--accent                one accent colour for the accent word, numerals, stat
--panel                 callout and chip background
--font-display --font-body
```
Define at least 3 themes (`a`, `b`, `c`), including one dark theme for the close. Use the `theme` field on each slide.

## 4. Palette rotation (optional but recommended)
Consecutive posts should not share a colour story. Keep a `.carousel-history.json` in the user's working folder:
```
{ "posts": [ { "date": "2026-10-17", "title": "...", "palette": "sand-blue", "themes": ["a","b","c"] } ] }
```
Before proposing directions, read it and propose at least one direction that differs from the last post's palette. Append the claimed palette after approval, not before.

## 5. Fonts
- Prefer a web font loaded by `<link>` in `index.html`, with a system fallback in `--font-display`/`--font-body`.
- Arabic suggestions: Cairo, Tajawal, IBM Plex Sans Arabic, Noto Naskh Arabic, Alexandria, Readex Pro. Latin: Inter, DM Sans, Fraunces, Space Grotesk.
- Maximum two families. If the export machine is offline, system fonts will be used: say so.

## 6. Mascot (if any)
- Cut out the image to a transparent PNG (for example `rembg`, `pip install rembg`), inspect it on a flat colour, save as `assets/mascot.png`.
- Place it on the cover, one middle slide and the close; hide the feet behind a mound or edge.
- Do not recolour the mascot per slide; the background does the work.

## 7. The written brief (what to show)
Four lines: palette name + swatches, type pair, layout note, illustration note. Offer 2-3 directions as variants when the user gave no references or only a loose mood.
