---
name: carousel-workflow
description: Guided workflow for turning an article, URL, script or topic into a social-media carousel (LinkedIn PDF document, Instagram/X slides) in any language, including Arabic RTL. It first interviews the user about their design references (images, URLs, brand, mascot, palette, fonts) and the type of script/content (source, language, platform, format, tone), then hands back a tailored run sheet and walks through every step with approval gates - source ingestion, format choice, design brief, variants, build, export and QA loop, delivery of PDF + caption + hashtags. Use when the user says "carousel", "carrousel", "LinkedIn document post", "turn this article/script into slides", or asks for a repeatable carousel process.
---

# Carousel workflow

Interview first, then give the user their workflow and run it. Never design or write anything before the intake is answered, and never pick a headline, format, palette or caption on the user's behalf: they approve variants, then you build only what was approved.

Files in this skill (paths relative to this folder):
- `references/intake-questions.md` - the exact intake script
- `references/formats.md` - format playbook and slide-count rules
- `references/copywriting.md` - hooks, per-slide copy rules, RTL/Arabic notes
- `references/design-brief.md` - turn references into design tokens, palette rotation
- `references/approval-board.md` - how to present variants and collect approvals
- `references/caption-and-hashtags.md` - caption formula, hashtag rules
- `references/qa-checklist.md` - the export + verify loop
- `engine/` - small HTML to PNG/PDF engine (Node + Playwright)
- `scripts/scaffold.mjs` - copies `engine/` into a new carousel folder

## Phase 0 - Intake (always first)

Run `references/intake-questions.md`. Use AskUserQuestion for the choice questions (max 4 per call, two rounds) and plain chat for anything that needs a path or a link.

Round A, the content: source type, language and direction, platform, goal.
Round B, the references: design references, brand assets, tone references, approval mode, slide count.

Do not skip a question because it "seems obvious". If the user already answered one in their first message, restate it as confirmed and skip only that one.

## Phase 0.5 - Give the user their run sheet

When the intake is done, print a short run sheet that fills the workflow below with their answers, for example:

```
Run sheet - <working title>
Source: <URL | pasted script | topic>      Language: <Arabic MSA, RTL>
Platform: <LinkedIn PDF>                    Format: <to be proposed in step 2>
References: <3 images + brand colours>      Approval: <artifact board | in chat>
Steps: 1 Ingest -> 2 Format -> 3 Design brief -> 4 Variants (you approve) -> 5 Build -> 6 Export + QA -> 7 Deliver
You will be asked to approve: format, cover headline, outline, design direction, caption.
```

Then continue with step 1 without waiting, unless something in the intake was missing.

## The workflow

### 1. Ingest the source
- URL: fetch it and extract title, author, date, thesis, every section in order, all numbers/stats, named people, examples, conclusion.
- Pasted script or text: use as-is; list its beats in order.
- Topic only: do light research (search first), note every claim's source; flag anything you cannot source.
- Keep the numbers. Stat slides carry carousels.
- Never invent a statistic or a quote. If the source has none, say so.

### 2. Propose the format
Pick from `references/formats.md` (cheat sheet, list, how-to, opinion, story; avoid raw news). Name the format per variant and say why it fits this source. Decide slide count (default 9, sweet spot 8-12, never 3 or fewer).

### 3. Design brief from references
Follow `references/design-brief.md`: look at every reference the user gave (images with Read, URLs with fetch), extract palette, type feel, layout grammar, illustration style, mascot rules, and write them as design tokens. With no references, propose 2-3 directions with concrete hexes and fonts. If the user keeps a history of past carousels, never reuse the previous palette.

### 4. Variants and approval gate (nothing is built yet)
Prepare 2-3 variants per decision block: **format**, **cover headline** (6-10 words, a number for lists/how-tos, one accent word, word count shown), **slide-by-slide outline**, **design direction** (swatches + type), **caption** (120-250 words + hashtags, word count shown). Present them following `references/approval-board.md`, collect one choice per block (plus optional notes), and stop until you have all of them. If a block is missing or the user says "none of them", revise and ask again. Never fill gaps yourself.

### 5. Build only what was approved
1. `node <skill>/scripts/scaffold.mjs <slug>` creates `./<slug>/` from `engine/`.
2. Edit `css/tokens.css` (palette, fonts, direction) from the design brief.
3. Edit `js/content.js` only for content: `meta` and `slides[]` (data, not HTML). Layouts: `cover`, `idea`, `stat`, `list`, `close`. Title markup: `*word*` marks the accent word, `\n` breaks a line.
4. New visual types go in `js/render.js` / `css/slides.css`, using tokens only.
5. `npm install` once (set `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` if Chrome or Edge is installed).

### 6. Export and verify (loop until clean)
`node export.mjs` writes `out/slide-XX.png` (2x) and `out/carousel.pdf`. Then run the loop in `references/qa-checklist.md`: build a contact sheet, LOOK at it, fix, re-export. Do not deliver on the first export.

### 7. Deliver only these
- `./<slug>/<slug>.pdf` - the document (page count equals slide count)
- `./<slug>/caption.md` - the approved caption plus hashtags, built per `references/caption-and-hashtags.md`
- In the reply: PDF path, the caption pasted in full, the design direction used, three posting tips. No PNG/video links unless asked.

## Rules that always apply
- One idea per slide, at most 45 words of body text per slide, numbers as digits.
- Credit the author/source on the last slide. Never use another outlet's logo; the top-right mark is the user's series name.
- No links on slides or in the caption; credit by name only.
- Do not reproduce someone else's artwork, characters or faces from the references; use them for palette, mood and layout grammar only.
- Keep intermediate files (PNGs, viewers) in the work folder; they are not deliverables.
