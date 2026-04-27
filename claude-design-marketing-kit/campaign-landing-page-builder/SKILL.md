---
name: campaign-landing-page-builder
description: Use when asked to build a campaign landing page, demo request page, free trial page, content download page, or webinar registration page for B2B SaaS. Takes a campaign brief and produces a 7-section wireframe with copy, plus two handoff paths — Claude Design prompt for visual layout OR Claude Code prompt for deploy-ready HTML/Tailwind.
---

# Campaign Landing Page Builder

## When to use this skill

- Launching a new campaign that needs a dedicated landing page
- Building a demo request, free trial, or content download page
- Creating a webinar registration page
- Replacing an existing page that's underperforming (conversion <2%)
- Producing a campaign microsite (single-page)

## What this skill produces

Three artifacts:

1. **Wireframe + copy** — the 7 standard B2B landing page sections, each with headline, subhead, body copy direction, and visual direction
2. **Claude Design prompt** — paste-ready block for generating the visual layout in `claude.ai/design`
3. **Claude Code prompt** — paste-ready block for generating deploy-ready HTML/Tailwind (via Claude Code), when the user wants the page live rather than a visual mockup

## Workflow

1. **Brand lookup.** Read `~/.claude/skills/brand-design-system-builder/outputs/brand.md`. If missing, collect brand basics (name, primary color, typography) before proceeding.
2. Read `landing-page-patterns.md` in this skill folder.
3. Ask the 7 intake questions, **one at a time**.
4. Select a landing page archetype from the reference file based on the campaign objective:
   - Demo request → outcome-led hero
   - Free trial → category-led hero + risk-reversal
   - Content download → problem-led hero + preview
   - Webinar registration → value-led hero + speakers + agenda
5. Draft the 7 sections with specific copy.
6. Generate both handoff prompts (Claude Design for visual, Claude Code for HTML).
7. Present both paths and let the user pick (most users want both — the design mock for stakeholder review, the code for actual deployment).
8. Run the quality checklist.

## Intake

Ask these 7 questions, **one at a time**.

1. **Campaign name + objective.** Demo request, content download, webinar signup, free trial, other?
2. **Target audience (ICP).** Role, industry, company size, seniority.
3. **Core value proposition.** One sentence on what the page offers and why it matters.
4. **Proof points.** Logos, stats, testimonials, analyst quotes, case studies.
5. **Primary + secondary CTA.** What's the main action, and what's the fallback?
6. **Form fields.** What do you need to capture? (Common: work email, company, role, phone — lean short for content downloads, can be longer for demo requests.)
7. **Competitor references to differentiate from.** Any explicit positioning against competitors? Any "we're not like X" angle?

## Output format: wireframe + copy

```
## Section 1 — Hero
**H1:** <headline, 6-12 words>
**Subhead:** <1 sentence, 15-25 words>
**Primary CTA:** <button copy + destination>
**Secondary CTA:** <link text, optional>
**Visual:** <direction — product screenshot, abstract graphic, illustration, etc.>

## Section 2 — Problem
**H2:** <problem framing>
**Body:** <2-3 sentences describing the pain>
**Visual:** <direction>

## Section 3 — Solution Bridge
**H2:** <how the offer closes the gap>
**Body:** <2-3 sentences>
**Visual:** <direction>

## Section 4 — Value Proof (outcomes)
**H2:** <outcome framing>
**3 benefit blocks:**
  - **<Benefit 1>:** <1-sentence expansion>
  - **<Benefit 2>:** <1-sentence expansion>
  - **<Benefit 3>:** <1-sentence expansion>
**Visual:** <direction — likely 3-column layout>

## Section 5 — Social Proof
**Logo bar:** <5-7 customer logos, list them>
**Featured testimonial:** <full quote + attribution>
**Stat callout:** <one hero metric + source>

## Section 6 — Objection Handler (FAQ)
**H2:** "<common objection framed as question>"
**3-5 FAQ Q&As:** <based on user's audience and objections>

## Section 7 — CTA Block
**H2:** <closing argument>
**Primary CTA:** <same as hero, repeated>
**Form:** <fields listed>
**Trust signal:** <"We never share your data" or similar>
```

## Output format: Claude Design prompt

```
Generate a B2B landing page for <brand_name> — <campaign name>. Desktop-first, 1440px wide, with mobile-responsive considerations noted.

**Brand context:**
<full contents of brand.md>

**Page structure (7 sections, top to bottom):**
<inline each section from the wireframe above>

**Design principles:**
- Hero leads with H1 + primary CTA above the fold — no distractions
- Logo bar in section 5 uses grayscale logos for visual quiet
- Stat callout uses accent color
- FAQ uses expandable accordions (or visible block if short)
- CTA block repeats the hero CTA with a form

**Aspect:** Desktop web (1440x~3500 depending on content density)

Generate the full page in one view, then I'll iterate section by section.
```

## Output format: Claude Code prompt

```
Generate a deploy-ready B2B landing page for <brand_name> — <campaign name>. Use Tailwind CSS, no framework (vanilla HTML + Tailwind CDN is fine for prototyping; otherwise Next.js App Router with TypeScript).

**Brand tokens (use these as Tailwind config or CSS custom properties):**
- Primary: <hex>
- Secondary: <hex>
- Accent: <hex>
- Text: <hex>
- Muted: <hex>
- Background: <hex>
- Display font: <font name>
- Body font: <font name>

**Page sections (top to bottom):**
<inline each section from the wireframe>

**Requirements:**
- Semantic HTML (section, header, main, h1-h3)
- Mobile-responsive (test at 375px and 1440px)
- Accessible (ARIA labels on CTAs, form inputs with labels, skip link)
- One <form> element in the CTA block with the fields listed
- All links should be stub hrefs (#) — I'll wire them up
- Include a minimal <script> tag for form submission (just preventDefault + console.log for now)
- No analytics tags — I'll add those later
- No client-side frameworks beyond Tailwind

Output: a single `index.html` (or Next.js page component if framework specified) with all styling inline via Tailwind classes.
```

## Quality checklist

- [ ] All 7 intake questions answered
- [ ] Brand lookup completed (or fallback brand basics collected)
- [ ] All 7 sections have concrete copy (no "TBD" or "headline goes here")
- [ ] Hero H1 is 6-12 words (short enough to read at a glance)
- [ ] At least 3 proof points in Section 5 (logos, testimonial, stat)
- [ ] CTA text is action-oriented ("Book a demo", not "Submit")
- [ ] Form has ≤4 fields for content downloads, ≤6 for demo requests
- [ ] FAQ has 3-5 items, each a real objection
- [ ] Both handoff prompts are paste-ready (brand inline, full section spec)
- [ ] User knows the difference between the two paths (Claude Design for visual mock, Claude Code for code)

## Related

- `landing-page-patterns.md` — hero formulas, section anatomy, conversion benchmarks, A/B testing priorities
- Pairs with `sales-deck-generator` (when the deck's CTA points to this page) and `paid-ad-creative-builder` (when ads point to this page)
