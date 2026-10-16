# Approval gate

Nothing is built, claimed or exported before the user approves. The user chose a mode during intake.

## What to prepare
2-3 variants for each block:

| Block | Each variant shows |
|---|---|
| Format | name (cheat sheet / list / how-to / opinion / story) + why it fits |
| Cover | headline with word count (6-10), accent word, kicker, "N ideas" count |
| Outline | slide-by-slide: role, numeral, h2, h3s, the ONE visual, key number |
| Design direction | palette swatches, type pair, one-line mood, per-slide theme sequence |
| Caption | full text, word count (120-250), hashtag set |

## Mode A - interactive artifact page
Use only if an Artifact tool is available in this session.
1. Publish one page with the variants side by side. RTL layout for Arabic previews.
2. Each block has a radio-style **Approve** control and an optional note field.
3. A final **Send approvals** button stores `{block, variantId, note}[]` with `status: "submitted"`.
4. Give the user the link and stop. When they say they are done, read the stored choices. If a block is missing or the status is not `submitted`, ask; never fill gaps.

## Mode B - in chat
Use AskUserQuestion, one block at a time (up to 4 blocks per call):
- Question: the block name. Options: the variants, with the full text in the description or preview field.
- "Other" is always available for notes or "none of these".
- After all blocks are answered, restate the choices as a summary and ask for a final go before step 5.

## If the user wants changes
Revise only the blocks they flagged, present the revised variants, and wait again. Keep earlier approved blocks as they are.

## Hard rules
- Never choose a headline, outline, palette or caption for the user.
- Never start step 5 with an incomplete set of approvals.
- Write the approved choices into `./<slug>/brief.md` so the build and QA steps have a single source of truth.
