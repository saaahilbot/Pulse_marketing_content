---
name: linkedin-carousel-designer
description: Use when asked to design a LinkedIn carousel (document post) for organic distribution. Takes a thesis/hook plus key points and produces a 10-slide on-brand carousel with hook slide, point slides, and CTA/summary slide, plus a Claude Design prompt that generates the full PDF and accompanying LinkedIn post copy.
---

# LinkedIn Carousel Designer

## When to use this skill

- Producing an organic LinkedIn carousel (document post)
- Repurposing a blog post, video, or podcast episode into a scroll-stopping carousel
- Establishing thought leadership on a specific topic
- Promoting an offer through a value-first carousel
- Creating evergreen content that's easy to pin/save

## What this skill produces

Three artifacts:

1. **Slide-by-slide copy** — 10 (or 8/12) slides with headlines, body copy, and visual direction
2. **Claude Design prompt** — paste-ready block that generates the full PDF carousel at 1080x1350 (LinkedIn's recommended vertical spec)
3. **Accompanying LinkedIn post copy** — the text that goes above the carousel in the feed, written to stop scroll and funnel into the carousel

## Workflow

1. **Brand lookup.** Read `~/.claude/skills/brand-design-system-builder/outputs/brand.md`. If missing, collect brand basics first.
2. Read `carousel-patterns.md` in this skill folder.
3. Ask the 6 intake questions, **one at a time**.
4. Based on the user's tone (Q6) and hook (Q1), select a hook slide formula from the reference file.
5. Structure the middle slides: each slide gets one idea. If the user provided 5 points for a 10-slide carousel, that's 5 point-slides, 1 hook, 1 transition (after hook), 1 summary, 1 CTA, 1 reserve slide.
6. Draft slide-by-slide copy with visual hierarchy.
7. Construct the Claude Design prompt with brand block + slide specs.
8. Write the accompanying LinkedIn post — hook match, 3-paragraph expansion, explicit mention of the carousel.
9. Run the quality checklist.

## Intake

Ask these 6 questions, **one at a time**.

1. **Hook / thesis.** One-sentence POV. The more contrarian, specific, or counterintuitive, the better. (e.g., "73% of the pipeline in your CRM is fake.")
2. **Carousel length.** 8, 10, or 12 slides? (10 is the sweet spot — long enough for depth, short enough that people actually swipe through.)
3. **Key points.** 5-10 main ideas you want to make. List them in priority order; we may cut the weakest ones.
4. **Ending type.** CTA (drive to a page or offer), summary recap, save-worthy checklist, or provocative question?
5. **Your positioning / credibility angle.** What gives you the right to make this argument? (e.g., "I've analyzed 200K sales calls", "10 years as a VP Sales", "CMO of three B2B exits")
6. **Tone.** Educational (teacher), provocative (challenger), contrarian (debate), narrative (story-led)?

## Output format: slide-by-slide copy

```
## Slide 1 — Hook
**Headline:** <6-10 words, bold thesis>
**Subhead/hook pattern:** <which pattern from carousel-patterns.md>
**Visual direction:** <full-bleed brand color, oversized headline, minimal decoration>

## Slide 2 — Hook Expansion / Stakes
**Headline:** <expansion of the hook — what's at stake>
**Body:** <1-2 sentences of context>
**Visual direction:** <direction>

## Slide 3 — Point 1
**Headline:** <tight framing of the first point>
**Body:** <≤35 words>
**Visual direction:** <direction — icon, callout, data viz, etc.>

## Slide 4 — Point 2
... (same structure)

... continue for N points ...

## Slide N-1 — Summary / Checklist / Takeaway
**Headline:** <wrap>
**Body:** <summary line, recap list, or provocative Q>
**Visual direction:** <direction>

## Slide N — CTA
**Headline:** <CTA frame>
**Body:** <what happens next + where to go>
**Visual direction:** <brand-forward, CTA button, URL or QR>
```

## Output format: Claude Design prompt

```
Generate a <N>-slide LinkedIn carousel for <brand_name> at 1080x1350 (LinkedIn vertical recommended spec). Export as PDF.

**Brand context:**
<full contents of brand.md>

**Carousel slides (top to bottom in order):**
<inline the slide-by-slide copy>

**Design principles:**
- Slide 1 (hook) uses full-bleed primary brand color with H1 in display type
- All body text ≤35 words per slide — if a slide has more, split it
- Each slide has a subtle slide indicator in the lower right (e.g., "2 / 10")
- Use accent color for one highlight per slide (never more)
- Reserve the final slide for the CTA — full-brand treatment, clear next step
- Maintain consistent vertical alignment of headlines across slides (reader's eye stays anchored)

**Aspect:** 1080x1350 per slide

Generate the full carousel as a single PDF, then I'll iterate individual slides.
```

## Output format: LinkedIn post copy

```
**Hook line (first sentence):** <match the carousel slide 1 thesis — if slide 1 says "73% of your pipeline is fake," post opens "73% of your pipeline is fake.">

**Para 2:** <2-3 sentences expanding why this matters>

**Para 3:** <what the carousel delivers — scannable preview of the value>

**CTA line:** <explicit — "Swipe through for the 5-point diagnostic" or similar>

**PS (optional):** <personality / credibility line + invite to repost/save>

**Hashtags:** 3-5 relevant (#B2BMarketing, #SalesOps, etc.)
```

## Quality checklist

- [ ] All 6 intake questions answered
- [ ] Brand lookup completed
- [ ] Hook slide (Slide 1) uses a specific pattern from the reference file
- [ ] Every middle slide has one idea only (no crammed slides)
- [ ] No slide has more than 35 words of body copy
- [ ] Final slide has a clear CTA with destination
- [ ] Claude Design prompt specifies 1080x1350 and PDF export
- [ ] LinkedIn post hook matches slide 1 (reader sees consistency)
- [ ] Post includes explicit "swipe through" or "save this" mention
- [ ] Hashtags are topical, not generic (avoid #marketing — use #SalesOps, #RevOps, etc.)

## Related

- `carousel-patterns.md` — hook formulas, slide density rules, ending patterns, post-copy conventions
- Pairs well with `blog-featured-image-generator` (visual treatment), `paid-ad-creative-builder` (paid distribution of the same angle)
