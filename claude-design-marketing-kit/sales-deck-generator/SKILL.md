---
name: sales-deck-generator
description: Use when asked to build a sales deck, pitch deck, demo deck, or executive brief for a B2B SaaS company. Takes positioning/messaging inputs and produces a slide-by-slide outline with speaker notes plus a complete Claude Design prompt for generating the branded deck.
---

# Sales Deck Generator

## When to use this skill

- Building a pitch deck for a prospect before a first sales call
- Producing a demo follow-up deck recapping what was shown
- Writing a board or executive brief (internal sales/revenue review)
- Refreshing an existing deck with tighter narrative structure
- Translating a messaging doc or positioning statement into a branded deck

## What this skill produces

Three artifacts:

1. **Slide-by-slide outline** — a table showing every slide with a headline, body copy direction, and visual direction
2. **Speaker notes** — 2-3 sentences per slide for whoever presents
3. **Claude Design prompt** — a paste-ready block that generates the branded deck in `claude.ai/design`

## Workflow

1. **Brand lookup.** Read `~/.claude/skills/brand-design-system-builder/outputs/brand.md`. If it exists, use it. If not, tell the user:
   > "No brand system found. I'll ask you for brand basics up front, or you can run the `brand-design-system-builder` skill first for a proper setup."
   If they want to proceed without full setup, ask for: brand name, primary color, and typography preference only.
2. Read `b2b-deck-frameworks.md` in this skill folder.
3. Ask the 7 intake questions below, **one at a time**.
4. Based on the deck purpose (Question 1), select a framework from the reference file:
   - **Pitch (first call):** Raskin's 5-part "Greatest Sales Deck"
   - **Demo follow-up:** Problem-Agitate-Solve with proof anchor
   - **Board/exec brief:** Challenger Sale (insight-led)
5. Construct the slide outline using the chosen framework's skeleton, populated with user inputs.
6. Write speaker notes for each slide.
7. Construct the Claude Design prompt. Inline the full `brand.md` block. Specify deck format (16:9), slide count, aspect, export targets (PPTX, Canva, PDF).
8. Present all 3 artifacts. Remind the user to open `claude.ai/design`, paste the prompt, iterate with inline comments, then export.
9. Run the quality checklist.

## Intake

Ask these 7 questions, **one at a time**.

1. **Deck purpose.** Pitch (first call), demo follow-up, board/exec brief, or other?
2. **Audience.** Role, company stage, industry. (e.g., "VP Sales at 500-1000-employee B2B SaaS")
3. **Core narrative / positioning.** You can paste a messaging doc, a positioning statement, or just describe it. The more specific, the better the deck.
4. **Key proof points.** Customer names, metrics, research citations, analyst quotes. What's the strongest evidence you can bring?
5. **Deck length.** 10, 12, 15, or 20 slides?
6. **CTA / next step.** What do you want the audience to do after this deck? (Book a demo, approve budget, sign off on a strategy, etc.)
7. **Meeting context.** Is this a first call, a demo follow-up, a board review, a mutual evaluation plan? This affects pacing and expected depth.

## Output format: slide outline table

```
| # | Slide | Headline | Body direction | Visual direction |
|---|-------|----------|----------------|------------------|
| 1 | Title | <brand + one-line> | — | Full-bleed brand color, logo center |
| 2 | <slide role> | <H1> | <copy direction 1-2 lines> | <visual spec> |
| ... continue for full deck ... |
```

## Output format: speaker notes

For each slide:

```
**Slide N — <Slide role>**

<2-3 sentences on how to present this slide. What to emphasize, what to skip, how it transitions to the next slide.>
```

## Output format: Claude Design prompt

```
Generate a <N>-slide sales deck for <brand_name>. 16:9 aspect. Export-ready for PPTX, Canva, and PDF.

**Brand context (apply throughout):**
<full contents of brand.md>

**Deck structure:**
<slide-by-slide spec — include each slide's H1, body copy direction, visual direction>

**Voice:** <from brand.md>

**Constraints:**
- Apply brand colors exactly — accent color for highlights only, not large fills
- Use <typography> — display for H1, body for all other text
- No stock photography unless brand.md allows
- Every proof slide must have a visual anchor (logo bar, stat callout, quote card)
- Title slide and closing slide use full-bleed primary color
- Text-dense slides use single-column layouts; feature comparisons use 2-3 column grids

When generating, produce the full deck in one pass, then I'll iterate with inline comments.
```

## Quality checklist

- [ ] All 7 intake questions answered
- [ ] `brand.md` read (or fallback brand basics collected)
- [ ] Framework chosen matches deck purpose
- [ ] Slide count matches user's requested length
- [ ] Every slide has a concrete headline (no "TBD" or "Add headline")
- [ ] Every slide has visual direction (not just "design something")
- [ ] At least 2 slides anchor proof (customers, metrics, or analyst)
- [ ] Closing slide has explicit CTA
- [ ] Speaker notes are 2-3 sentences each (not empty, not essays)
- [ ] Claude Design prompt includes full brand block inline
- [ ] Claude Design prompt specifies 16:9 and export formats
- [ ] User knows to paste into `claude.ai/design` and iterate with inline comments

## Related

- `b2b-deck-frameworks.md` — Raskin's 5-part framework, Problem-Agitate-Solve, Challenger Sale, deck archetypes, speaker notes conventions
- Pairs well with `one-pager-builder` (for leave-behinds) and `campaign-landing-page-builder` (for the page the deck CTA points to)
