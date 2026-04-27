---
name: paid-ad-creative-builder
description: Use when asked to create static paid ad creative for LinkedIn Sponsored Content or Meta feed ads targeting B2B SaaS buyers. Produces 6 on-brand ad variants (3 LinkedIn 1200x627, 3 Meta 1080x1080) across different angles for A/B testing, plus a single Claude Design prompt that generates the full set. Out of scope: video ads.
---

# Paid Ad Creative Builder

## When to use this skill

- Launching a new paid campaign on LinkedIn Sponsored Content and/or Meta
- Refreshing ad creative after a campaign has hit creative fatigue (CTR decay)
- Producing variant creative for A/B testing
- Generating a full ad set from a campaign brief
- Producing on-brand ads without a designer

## What this skill does **NOT** do

- Video ads (different creative discipline — use a video tool)
- Carousel ads where each card needs its own unique design (use the `linkedin-carousel-designer` skill for organic carousels; for ad carousels, run this skill and extend the output manually)
- Native ads or sponsored content with editorial formatting
- Search ads (Google Ads doesn't use image creative the same way)

## What this skill produces

Two artifacts:

1. **6-variant concept table** — each variant with angle, headline copy, body copy, visual direction, and platform placement
2. **Claude Design prompt** — paste-ready block that generates all 6 variants in one Claude Design canvas, properly sized per platform

## Workflow

1. **Brand lookup.** Read `~/.claude/skills/brand-design-system-builder/outputs/brand.md`. If missing, collect brand basics before proceeding.
2. Read `b2b-ad-patterns.md` in this skill folder.
3. Ask the 7 intake questions, **one at a time**.
4. Based on the user's 3-5 angles (Question 5), map each to an ad format from the reference file. If the user gave fewer than 3 angles, propose the missing ones.
5. Generate 6 ad concepts — 3 LinkedIn (1200x627) and 3 Meta (1080x1080), each hitting a different angle. If user specified only one platform, generate all 6 for that platform instead.
6. Construct the Claude Design prompt so Claude Design produces all 6 variants in a single canvas (gridded layout).
7. Present the table and prompt. Remind user that CTR signals creative decay within 7-14 days; plan to refresh.
8. Run the quality checklist.

## Intake

Ask these 7 questions, **one at a time**.

1. **Campaign goal.** Awareness, demand gen, retargeting, or brand?
2. **Offer.** What's the "thing" the ad points to? (Asset download, webinar, demo, trial, tool, etc.)
3. **Audience pain / desired outcome.** What do they feel today? What do they want to feel? (One sentence each.)
4. **Available social proof.** Logos, stats, customer quotes, analyst mentions — what can you use?
5. **3-5 angles to test.** Different hooks / framings. (e.g., "founder POV", "stat shock", "customer story", "comparison", "problem/solution"). If user says "pick for me," propose 5.
6. **Platforms.** LinkedIn, Meta, or both?
7. **Brand constraints.** Disallowed copy patterns? Required legal disclaimers? Forbidden phrases?

## Output format: 6-variant concept table

```
| # | Platform | Size | Angle | Headline | Body copy | Visual direction |
|---|---|---|---|---|---|---|
| 1 | LinkedIn | 1200x627 | <angle> | <headline, ≤70 chars> | <body, ≤150 chars> | <visual, 1-2 sentences> |
| 2 | LinkedIn | 1200x627 | <angle> | <headline> | <body> | <visual> |
| 3 | LinkedIn | 1200x627 | <angle> | <headline> | <body> | <visual> |
| 4 | Meta | 1080x1080 | <angle> | <headline, ≤40 chars> | <body, ≤125 chars> | <visual> |
| 5 | Meta | 1080x1080 | <angle> | <headline> | <body> | <visual> |
| 6 | Meta | 1080x1080 | <angle> | <headline> | <body> | <visual> |
```

Notes on the table:
- **Headline** = the big text on the creative itself (what the user reads first)
- **Body** = supporting text inside the creative
- The feed-level text (what appears above the creative in the feed) is separate — include that as a note below the table.

## Output format: Claude Design prompt

```
Generate 6 static ad variants for <brand_name> across LinkedIn and Meta. Render all 6 in a single canvas, gridded — 3 LinkedIn on top row (1200x627), 3 Meta on bottom row (1080x1080). Each variant must be on-brand and clearly different from the others.

**Brand context:**
<full contents of brand.md>

**Campaign context:**
- Goal: <from Q1>
- Offer: <from Q2>
- Audience pain: <from Q3>

**Ad specs:**
<inline the 6-variant table>

**Design principles:**
- Text-to-image ratio: ≤20% of each creative is text (LinkedIn/Meta best practice)
- Primary visual hierarchy: headline (biggest), logo, body copy, CTA area — in that order
- Use brand primary color as background for 3 variants, light background for 3 variants (test both)
- Accent color used sparingly — only in the CTA button or a single data point
- Don't use stock photography or abstract AI/robot visuals (per brand.md avoid list)
- LinkedIn variants must be more professional-leaning, Meta variants can be more playful
- Every creative must have the logo visible but not dominant

**Legibility check:**
- Test headline readability at 300px wide preview (LinkedIn) and 250px wide (Meta)
- Minimum font size at full res: 48pt for headlines, 24pt for body

Generate all 6 in one pass, then I'll iterate individual variants.
```

## Quality checklist

- [ ] All 7 intake questions answered
- [ ] Brand lookup completed
- [ ] At least 3 distinct angles (not variations of the same angle)
- [ ] LinkedIn headlines ≤70 chars, Meta headlines ≤40 chars
- [ ] Each variant ties to a specific ad format from the reference file
- [ ] Visual direction is specific (not "design something")
- [ ] Claude Design prompt specifies exact dimensions for each platform
- [ ] User knows to plan for creative refresh every 7-14 days
- [ ] Feed-level text is provided alongside creative copy
- [ ] If only one platform specified, all 6 variants are for that platform

## Related

- `b2b-ad-patterns.md` — 6 proven B2B ad formats, copy-to-visual ratios, platform specs, creative testing framework
- Pairs with `campaign-landing-page-builder` (the page the ad points to) and `linkedin-carousel-designer` (for organic carousel content — different discipline)
