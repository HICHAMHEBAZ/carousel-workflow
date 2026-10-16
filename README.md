# carousel-workflow

A Claude Code skill that turns an article, URL, script or topic into a social-media carousel: a PDF document for LinkedIn, PNGs for Instagram/X, plus a caption and hashtags. It works in any language and handles Arabic right-to-left layouts.

It does not start designing right away. It interviews you first:

1. **The script and content**: source (URL, pasted text, topic, file), language and direction, platform, goal.
2. **Your references**: screenshots, brand kit, a URL or past carousel, a mascot or logo, how you want to approve.

Then it gives you a run sheet with your answers filled in and walks through every step. You approve each decision (format, cover headline, outline, design direction, caption) before anything is built.

## The workflow

| Step | What happens |
|---|---|
| 0 Intake | Two rounds of questions, then a run sheet |
| 1 Ingest | Read the source, keep every number, never invent stats |
| 2 Format | Cheat sheet, list, how-to, opinion or story, with the data behind each |
| 3 Design brief | Your references become palette, type and layout tokens |
| 4 Variants | 2-3 options per block; you approve in chat or on an artifact page |
| 5 Build | Scaffold the engine, edit tokens and one content file |
| 6 Export + QA | PNGs and PDF, contact sheet, checklist, loop until clean |
| 7 Deliver | `<slug>.pdf`, `caption.md`, hashtags, posting tips |

## Install

### Option 1: plugin marketplace (recommended)
In Claude Code:
```
/plugin marketplace add HICHAMHEBAZ/carousel-workflow
/plugin install carousel-workflow@carousel-workflow
```
Replace `HICHAMHEBAZ/carousel-workflow` with the final `owner/repo` if you host it elsewhere.

### Option 2: copy the skill folder
macOS / Linux:
```bash
git clone https://github.com/HICHAMHEBAZ/carousel-workflow.git
cp -r carousel-workflow/skills/carousel-workflow ~/.claude/skills/
```
Windows (PowerShell):
```powershell
git clone https://github.com/HICHAMHEBAZ/carousel-workflow.git
Copy-Item -Recurse carousel-workflow\skills\carousel-workflow $env:USERPROFILE\.claude\skills\
```
Or run `./install.sh` / `./install.ps1` from the cloned repo.

### Per project only
Copy `skills/carousel-workflow` into `<your-project>/.claude/skills/`.

Restart Claude Code, or start a new session, so the skill is picked up.

## Use

Say any of: "do a carousel", "turn this article into a LinkedIn carousel", "make slides from this script", or run `/carousel-workflow`. Answer the questions and approve the variants.

## Requirements

- Claude Code
- Node.js 18+ (for the export engine)
- Chrome or Edge installed (the engine uses it; otherwise Playwright downloads Chromium)
- Optional: Python + Pillow for the contact-sheet check, `rembg` to cut out a mascot

## What is inside

```
skills/carousel-workflow/
  SKILL.md                     interview + workflow
  references/                  intake script, formats, copy rules, design brief,
                               approval gate, caption + hashtags, QA checklist
  engine/                      HTML -> PNG/PDF (Playwright), data-driven slides
  scripts/scaffold.mjs         copy the engine into a new carousel folder
```

## Engine quick start

```bash
node ~/.claude/skills/carousel-workflow/scripts/scaffold.mjs my-post
cd my-post && npm install
# edit css/tokens.css and js/content.js
node export.mjs      # out/slide-XX.png + out/carousel.pdf
```

Slides are data, not HTML. In `js/content.js`:
```js
{ layout: "idea", theme: "b", numeral: "1", title: "The first idea,\nin *two lines*",
  blocks: [{ h: "The point", p: "One or two short lines." }] }
```
`*word*` marks the accent word. Layouts: `cover`, `idea`, `stat`, `list`, `close`.

## Notes on the data

Format and hook-length figures come from novitckii.com/resources/viral-carousels (10,743 Instagram carousels). The evidence is correlational and Instagram-based; the skill treats it as a prior, not a rule.

## License

MIT
