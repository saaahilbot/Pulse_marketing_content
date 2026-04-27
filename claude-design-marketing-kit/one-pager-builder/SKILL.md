---
name: one-pager-builder
description: Use when asked to create a product one-pager, solution brief, integration one-pager, or vertical-specific sales asset for B2B SaaS. Produces a single-page layout spec with copy plus a Claude Design prompt that generates a print-ready PDF one-pager at 8.5x11 or A4.
---

# One-Pager Builder

## When to use this skill

- Sales team needs a leave-behind for prospect meetings
- Product launch requires a sales-enablement asset
- New integration needs a partner-facing one-pager
- Vertical marketing campaign (e.g., "[Your brand] for healthcare")
- BDR/SDR outbound needs a single-asset attachment

## What this skill produces

Two artifacts:

1. **Layout spec** — a section-by-section breakdown with headlines, body copy, proof, and visual direction
2. **Claude Design prompt** — paste-ready block that generates a print-ready PDF at 8.5x11 (US) or A4 (international), plus export instructions

## Workflow

1. **Brand lookup.** Read `~/.claude/skills/brand-design-system-builder/outputs/brand.md`. If missing, collect brand basics before proceeding.
2. Read `one-pager-templates.md` in this skill folder.
3. Ask the 6 intake questions, **one at a time**.
4. Select the right template from the reference file based on Question 1 (one-pager type):
   - Product one-pager
   - Solution brief
   - Integration one-pager
   - Vertical-specific one-pager
5. Fill the template sections with user inputs. Enforce word-count discipline per section.
6. Generate the Claude Design prompt with the brand block inline and the template skeleton populated.
7. Present both artifacts with export instructions.
8. Run the quality checklist.

## Intake

Ask these 6 questions, **one at a time**.

1. **One-pager type.** Product, solution, integration, or vertical-specific?
2. **Audience.** End user, economic buyer, or both? What role, seniority?
3. **Problem framing.** What specific pain does this address? (One sentence.)
4. **Solution positioning + 3 core benefits.** What's the product / offer, and what are the 3 most important things it delivers?
5. **Proof.** Customer quote, outcome metric, logo bar, analyst mention — what's the strongest evidence you can show in a single page?
6. **CTA.** Book a call, start trial, read docs, contact sales — what's the next step you want the reader to take?

## Output format: layout spec

```
## One-Pager: <Title>
**Format:** 8.5x11 portrait (or A4)
**Print-ready:** Yes (CMYK-safe colors, 0.25in margins)

### Section 1 — Header (top 10% of page)
**Logo placement:** <brand logo, upper left>
**Tagline / category:** <3-6 words, upper right>

### Section 2 — Hero (next 25%)
**H1:** <outcome statement, 6-10 words, bold>
**Subhead:** <1 sentence expansion, 15-25 words>
**Hero visual:** <direction — abstract brand graphic, product screenshot crop, or icon>

### Section 3 — Problem (next 15%)
**H2:** "<Problem framing>"
**Body:** <2-3 sentences, ≤50 words>

### Section 4 — Solution + 3 Benefits (next 30%)
**H2:** <Solution statement, 6-10 words>
**3-column grid:**
  - **<Benefit 1 H3>:** <1 sentence, ≤30 words>
  - **<Benefit 2 H3>:** <1 sentence, ≤30 words>
  - **<Benefit 3 H3>:** <1 sentence, ≤30 words>

### Section 5 — Proof (next 15%)
**Format:** <logo bar + pull quote + stat callout>
**Logos:** <5-7 customer logos, grayscale>
**Quote:** "<full quote>" — <name, title, company>
**Stat:** <hero metric, large type>

### Section 6 — CTA (bottom 5%)
**Copy:** <action-oriented line + URL or QR code>
**Primary CTA button copy:** "<CTA>"
**URL or QR code:** <where it goes>
```

## Output format: Claude Design prompt

```
Generate a print-ready one-pager for <brand_name>.

**Page size:** 8.5 x 11 inches (US Letter) or A4, portrait orientation
**Print requirements:** CMYK color space, 0.25in bleed, 300 DPI for raster elements

**Brand context:**
<full contents of brand.md>

**Layout (top to bottom):**
<inline the layout spec above>

**Design principles:**
- Generous white space — don't cram, let the page breathe
- Logo in upper left, tagline upper right — not centered
- Hero H1 is the largest element on the page by 2x
- 3-benefit grid uses equal-width columns
- Proof section uses grayscale logos (brand color reserved for CTAs and H1)
- CTA is visually distinct — accent color button or bordered callout
- Bottom 5% reserved for legal, URL, page number if multi-page

**Export targets:** PDF (print-ready), PDF (web-optimized, smaller file size), PNG (for email attachments)
```

## Quality checklist

- [ ] All 6 intake questions answered
- [ ] Brand lookup completed
- [ ] Template chosen matches one-pager type
- [ ] Hero H1 is 6-10 words (not too long — it's the first thing scanned)
- [ ] Each benefit description is ≤30 words
- [ ] Problem statement is ≤50 words
- [ ] Proof section has at least 2 of: logos, quote, stat
- [ ] CTA is action-oriented and has a clear destination (URL or QR)
- [ ] Claude Design prompt specifies page size, color space, DPI
- [ ] User knows to export print-ready PDF and web-optimized PDF separately

## Related

- `one-pager-templates.md` — 4 canonical formats with section diagrams, visual hierarchy principles, word-count discipline
- Pairs with `sales-deck-generator` (deck for the meeting, one-pager as the leave-behind)
