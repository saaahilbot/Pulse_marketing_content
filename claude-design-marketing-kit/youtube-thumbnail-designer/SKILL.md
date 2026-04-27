---
name: youtube-thumbnail-designer
description: Use when asked to design YouTube thumbnails for B2B/SaaS/marketing content. Produces 3 on-brand thumbnail variants at 1280x720 with different CTR hypotheses (e.g., curiosity, authority, contrarian) plus a Claude Design prompt that generates the full set.
---

# YouTube Thumbnail Designer

## When to use this skill

- Producing thumbnails for a new B2B/marketing YouTube video
- A/B testing thumbnail angles (YouTube now supports native A/B testing)
- Refreshing underperforming video thumbnails (CTR <4% on a subscriber audience)
- Producing thumbnails consistent with channel branding
- Creating thumbnails when no designer is available

## What this skill produces

Two artifacts:

1. **3 thumbnail concepts** — each tied to a different CTR hypothesis (curiosity, authority, contrarian, transformation, etc.) with headline, visual direction, and rationale
2. **Claude Design prompt** — paste-ready block that generates all 3 variants in a single canvas at 1280x720 each

## Workflow

1. **Brand lookup.** Read `~/.claude/skills/brand-design-system-builder/outputs/brand.md`. If missing, collect brand basics before proceeding.
2. Read `thumbnail-design-principles.md` in this skill folder.
3. Ask the 5 intake questions, **one at a time**.
4. Based on the user's target tone (Q4) and video topic (Q2), propose 3 distinct CTR hypotheses. Each hypothesis should be meaningfully different (not three variations of "curiosity").
5. Draft each variant's concept: headline (≤4 words on thumbnail), visual hierarchy, dominant color tone, subject placement.
6. Construct the Claude Design prompt — all 3 variants in one canvas.
7. Present concepts + rationale + prompt. Remind user to test if they have volume; otherwise pick the one that best matches channel voice.
8. Run the quality checklist.

## Intake

Ask these 5 questions, **one at a time**.

1. **Video title.** The full title as it will appear on YouTube.
2. **Video topic / hook.** What's the video about in one sentence? What's the main claim or takeaway?
3. **Subject.** Will the thumbnail feature a face (yours, a guest's), a product screenshot, an abstract graphic, or an object? Faces tend to outperform for B2B creators; abstract works for topic-first content.
4. **Target emotional tone.** Curiosity (hint, don't reveal), urgency (stakes, deadline), contrarian (challenge convention), authoritative (expertise), transformation (before/after)?
5. **Channel visual identity baseline.** Do you have an existing channel style? Specific fonts, colors, or framing patterns? Or starting fresh?

## Output format: 3 thumbnail concepts

```
## Variant A — <CTR Hypothesis: e.g., Curiosity Gap>

**Thumbnail text:** "<≤4 words on the thumbnail itself>"
**Subject placement:** <left, right, center — face or object>
**Dominant color:** <which brand color dominates>
**Visual hierarchy:** <what the eye lands on first, second, third>
**Rationale:** <1-2 sentences on why this hypothesis might work for this video>

## Variant B — <CTR Hypothesis: e.g., Stat Shock>

**Thumbnail text:** "<big number + 1-2 words>"
**Subject placement:** <direction>
**Dominant color:** <color>
**Visual hierarchy:** <direction>
**Rationale:** <direction>

## Variant C — <CTR Hypothesis: e.g., Contrarian>

**Thumbnail text:** "<provocation>"
**Subject placement:** <direction>
**Dominant color:** <color>
**Visual hierarchy:** <direction>
**Rationale:** <direction>
```

## Output format: Claude Design prompt

```
Generate 3 YouTube thumbnail variants for a video titled "<video title>". Each variant is 1280x720 (YouTube standard). Render all 3 side-by-side in a single canvas so I can compare.

**Brand context:**
<full contents of brand.md>

**Variants:**
<inline the 3 concepts above>

**Design principles:**
- Each thumbnail has one clear focal point (face, stat, or symbol) — not multiple competing elements
- Text ≤4 words, sized at 80-120pt (full 1280x720 res) for mobile legibility
- High contrast between text and background
- Test at 300px wide preview — thumbnails live at that size on mobile home feed
- Use brand primary color for 1 variant, a high-energy accent (e.g., red, yellow, orange) for 1 variant, and a contrast treatment (black + single bright) for the third
- Don't stretch the brand logo onto the thumbnail — YouTube already shows the channel avatar
- Avoid soft gradients and subtle type — thumbnails need to shout at 300px

**Aspect:** 1280x720 per variant, 3-up grid in canvas

Generate all 3 variants in one pass.
```

## Quality checklist

- [ ] All 5 intake questions answered
- [ ] Brand lookup completed
- [ ] 3 variants hit 3 genuinely different CTR hypotheses (not 3 variations of "curiosity")
- [ ] Each variant has ≤4 words of text on the thumbnail
- [ ] Each variant has a clear focal point (not busy)
- [ ] At least one variant uses a high-energy color (red, yellow, orange) for scroll-stop
- [ ] Text is sized for mobile legibility (80-120pt at full 1280x720 res)
- [ ] Rationale is specific per variant (not "this might work")
- [ ] User knows to test on YouTube native A/B or monitor CTR after publish

## Related

- `thumbnail-design-principles.md` — CTR patterns, color psychology, text density rules, mobile legibility, pattern interrupt principles
- Pairs with `blog-featured-image-generator` (if video has a written companion) and `linkedin-carousel-designer` (if video is being repurposed to LinkedIn)
