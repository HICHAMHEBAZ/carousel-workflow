# Intake script

Ask in two rounds. Round A and B each use AskUserQuestion (max 4 questions per call). Anything needing a path, a link or free text goes in plain chat right after.

## Round A - the script and content

1. **What are we starting from?** (header: Source)
   - Article / URL - I will fetch and read it
   - Pasted script or text - you paste it in chat
   - Just a topic - research it for me
   - Existing doc or file - I give you a path
2. **Language and reading direction?** (header: Language)
   - Arabic, RTL (MSA)
   - Arabic with light Moroccan Darija tone
   - English / French, LTR
   - Other - tell me
3. **Where will it be posted?** (header: Platform)
   - LinkedIn document (PDF, 4:5)
   - Instagram carousel (PNG, 4:5)
   - LinkedIn + Instagram + X (PDF + PNGs)
4. **What should the carousel do for the reader?** (header: Goal)
   - Teach a process (how-to / cheat sheet)
   - Explain an article's ideas (list)
   - Push an opinion or hot take
   - Tell a story / case study

Then ask in chat: "Paste the link or script now (or the topic), and tell me the audience in one line plus any tone words (e.g. direct, warm, sceptical)."

## Round B - references and process

5. **Do you have design references?** (header: References)
   - Yes - screenshots / images of the look I want
   - Yes - a brand kit (colours, fonts, logo)
   - Yes - a URL or past carousel to match
   - No - propose directions for me
6. **A mascot, character or logo on slides?** (header: Mascot)
   - Yes, I have an image (will cut it out)
   - Logo only, no character
   - None
7. **How do you want to approve variants?** (header: Approval)
   - Interactive artifact page (if available), then tell me when done
   - Right here in chat, block by block
8. **Slide count?** (header: Length)
   - 9 slides (default)
   - 8-12, you decide from the source
   - Specific number - I will tell you

Then ask in chat, only for the options chosen above:
- References: "Paste the image paths or links, and say what to take from each (colours, layout, illustration style, mood)."
- Brand kit: "Hex colours, font names, and the logo path."
- Mascot: "Path to the image."
- Series name: "What is the name or handle for the top-right mark? (default: your name or brand)"
- Past posts: "Do you have a list or folder of past carousels so I avoid repeating the palette?"

## After the answers

Restate the answers as the run sheet (see SKILL.md, Phase 0.5) and continue. If an answer changes the workflow, say how:
- Pasted script: step 1 skips fetching; keep the author's wording where it already works.
- Topic only: step 1 becomes research; every stat needs a source.
- No references: step 3 proposes 2-3 directions with hexes and fonts.
- Chat approvals: step 4 runs as block-by-block AskUserQuestion instead of a page.
- Instagram or multi-platform: also ship PNGs and the IG/X caption variants.
