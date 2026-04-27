# Claude Design Kit for B2B Marketers

**9 production-ready Claude skills for B2B marketing design — from sales decks to YouTube thumbnails. No designer required.**

Each skill runs a structured intake, applies proven frameworks, and produces a branded deliverable via Claude Design (or Claude Code, for landing pages and animated mockups). Set up your brand once with the flagship skill; every other skill reads it automatically.

---

## What's Inside

| Skill | Track | What It Builds |
|-------|-------|---------------|
| `brand-design-system-builder` | Foundation | Brand `brand.md` + Claude Design Design System — one-time setup, every downstream skill inherits it |
| `sales-deck-generator` | Sales & Demand | Slide-by-slide pitch deck (10/12/15 slides) with speaker notes + Claude Design prompt — Raskin, PAS, or Challenger framework |
| `campaign-landing-page-builder` | Sales & Demand | 7-section wireframe with copy + Claude Design prompt (visual) + Claude Code prompt (deploy-ready HTML/Tailwind) |
| `one-pager-builder` | Sales & Demand | Print-ready one-pager PDF (product, solution, integration, or vertical format) |
| `paid-ad-creative-builder` | Sales & Demand | 6 static ad variants (3 LinkedIn 1200x627, 3 Meta 1080x1080) across different angles for A/B testing |
| `linkedin-carousel-designer` | Content & Social | 10-slide LinkedIn carousel PDF (1080x1350) + accompanying post copy |
| `youtube-thumbnail-designer` | Content & Social | 3 thumbnail variants (1280x720) with different CTR hypotheses |
| `blog-featured-image-generator` | Content & Social | Blog hero (1200x630) + social share card (1200x1200), editorial-consistent per category |
| `animated-ui-mockup-builder` | Content & Social | Standalone HTML + CSS animated UI mockup for landing page heroes or social — embeddable anywhere |

Each skill also ships with a reference file (frameworks, patterns, platform specs, benchmarks) that Claude reads when producing your deliverable.

---

## Prerequisites

- [Claude Code](https://claude.ai/code) installed
- Claude Code CLI running (`claude` in your terminal)
- **For Claude Design outputs:** Claude Pro, Max, Team, or Enterprise plan (Claude Design is not available on free tier; launched April 17, 2026)
- **For Claude Code handoffs (landing pages, animated mockups):** Same Claude Code setup

---

## Installation

1. **Copy the skill folders** into your Claude skills directory:

```bash
cp -r brand-design-system-builder ~/.claude/skills/
cp -r sales-deck-generator ~/.claude/skills/
cp -r campaign-landing-page-builder ~/.claude/skills/
cp -r one-pager-builder ~/.claude/skills/
cp -r paid-ad-creative-builder ~/.claude/skills/
cp -r linkedin-carousel-designer ~/.claude/skills/
cp -r youtube-thumbnail-designer ~/.claude/skills/
cp -r blog-featured-image-generator ~/.claude/skills/
cp -r animated-ui-mockup-builder ~/.claude/skills/
```

2. **Restart Claude Code** (or start a new session) so the skills are loaded.

3. **Run the flagship skill first:**

```
/brand-design-system-builder
```

Answer the 8 intake questions about your brand. This saves a `brand.md` file that every other skill in the pack reads automatically. Skip this step and every downstream skill will ask you for brand basics every time — defeating the point.

4. **You're set.** Run any of the other 8 skills whenever you need the corresponding asset.

---

## How to Use Each Skill

### Option A — Invoke directly

Type the skill name in any Claude Code conversation:

```
/sales-deck-generator
```

Claude will ask 5-8 intake questions (one at a time), then produce the deliverable.

### Option B — Natural language trigger

Just describe what you need. Claude will recognize when a skill applies:

> "Build me a 12-slide sales deck for our Q3 pipeline push targeting mid-market VP Sales"

> "Design a LinkedIn carousel about why most pipeline reviews are broken"

> "Create 3 thumbnails for my next video on revenue forecasting"

---

## What Each Skill Produces

### `brand-design-system-builder`

Two artifacts:
- **`brand.md`** — saved to `~/.claude/skills/brand-design-system-builder/outputs/brand.md`. The source of truth every downstream skill reads: name, colors, typography, voice, admired brands, avoids, audience.
- **Claude Design setup prompt** — a paste-ready block to configure Claude Design's native Design Systems feature (requires Pro/Max/Team/Enterprise).

Backed by `brand-system-setup-guide.md` — Claude Design walkthrough, free-tier fallback pattern, color theory primer, 6 type pairings by brand archetype.

### `sales-deck-generator`

Three artifacts:
- Slide-by-slide outline table (H1, body, visual direction per slide)
- Speaker notes (2-3 sentences per slide)
- Claude Design prompt for generating the full deck (PPTX/Canva/PDF export-ready)

Uses Andy Raskin's "Greatest Sales Deck" framework for pitch decks, Problem-Agitate-Solve for demo follow-ups, or Challenger Sale for exec briefs.

Backed by `b2b-deck-frameworks.md` — 3 narrative structures, 3 deck archetypes, slide count guidance, speaker-notes conventions.

### `campaign-landing-page-builder`

Three artifacts:
- 7-section wireframe (Hero, Problem, Solution, Proof, Objection Handler, CTA, FAQ) with copy per section
- Claude Design prompt for visual mockup
- Claude Code prompt for deploy-ready HTML + Tailwind CSS

Choose visual-first (for stakeholder review) or code-first (for actual deployment) — most teams want both.

Backed by `landing-page-patterns.md` — 3 hero formulas, conversion benchmarks by page type, mobile-first considerations, A/B testing priorities.

### `one-pager-builder`

Two artifacts:
- Layout spec (6 sections with headlines, body, proof, CTA)
- Claude Design prompt for print-ready PDF (8.5x11 or A4)

Four canonical formats: product, solution, integration, and vertical-specific.

Backed by `one-pager-templates.md` — section diagrams for each format, visual hierarchy principles, strict word-count discipline per element.

### `paid-ad-creative-builder`

Two artifacts:
- 6-variant concept table (3 LinkedIn 1200x627 + 3 Meta 1080x1080) with angle, copy, and visual direction per variant
- Claude Design prompt generating the full set in a single canvas

Each variant hits a different angle (social proof, customer story, comparison, stat shock, problem/solution, founder POV) for proper A/B testing.

Backed by `b2b-ad-patterns.md` — 6 proven ad formats with example copy, copy-to-visual ratios, platform specs, creative testing framework, decay signals.

### `linkedin-carousel-designer`

Three artifacts:
- Slide-by-slide carousel copy (10 slides standard, 8 or 12 optional)
- Claude Design prompt for 1080x1350 PDF
- Accompanying LinkedIn post copy (hook line, expansion, CTA, hashtags)

Backed by `carousel-patterns.md` — LinkedIn specs, 14 hook slide formulas, slide density rules, 4 ending patterns, post-copy conventions.

### `youtube-thumbnail-designer`

Two artifacts:
- 3 thumbnail concepts (each with a different CTR hypothesis and rationale)
- Claude Design prompt generating all 3 variants at 1280x720

Backed by `thumbnail-design-principles.md` — 5 CTR-tested patterns for B2B/edu YouTube, color psychology, text density rules, mobile legibility test, pattern interrupt principles.

### `blog-featured-image-generator`

Two artifacts:
- Concept description (style archetype, composition, text overlay, required elements)
- Claude Design prompt for blog hero (1200x630) + social share variant (1200x1200), plus optional 3 in-post graphics

Backed by `featured-image-patterns.md` — 5 style archetypes (abstract geometric, illustrated metaphor, photo-with-overlay, data-viz, typographic), hero vs. share card differences, text-on-image rules, editorial consistency principles.

### `animated-ui-mockup-builder`

Two artifacts:
- Animation concept (pattern, sequence, timing, motion curves, brand application)
- Claude Code prompt generating a standalone HTML file with CSS animations — no frameworks, no external dependencies

For **fake UI in motion** (landing page heroes, product launches, social). Not a replacement for **Arcade / Loom / Navattic** for real product recordings.

Backed by `ui-animation-patterns.md` — 4 common B2B UI animation patterns, motion principles (easing, duration, stagger), platform embedding (Webflow/Framer/Notion/social), performance guardrails.

---

## Skills vs. Prompts

These are not prompts — they're structured skill files that Claude uses as a reference guide during your conversation.

| Prompts | Skills |
|---------|--------|
| You copy-paste a block of text each time | Claude loads the framework automatically |
| Output varies based on how you word things | Structured intake ensures consistent, complete output |
| No intake — output reflects what you gave it | 5-8 question intake before generating anything |
| No reference benchmarks | Backed by reference files with patterns and benchmarks |
| Stateless — starts from scratch | Persistent across sessions; brand.md chains skills together |

---

## Tips

**Run `brand-design-system-builder` first.** It's the foundation. Skipping it means every other skill asks you for brand basics every time — and your outputs won't be consistent across the pack.

**Be specific in intake answers.** The skills are designed to push back on vague inputs. "Improve our forecasting" produces generic output. "VP Sales at 500-1000-person B2B SaaS can't answer 'will we hit the number?' because reps fudge pipeline" produces sharp output.

**Use the quality checklist.** Every skill ends with a checklist. Claude will walk through it before declaring the deliverable complete.

**Reference files are your benchmarks.** Each skill folder contains a reference file (e.g., `b2b-ad-patterns.md`). You can read these directly or ask Claude to pull specific patterns when building.

**Chain skills for a full campaign.** Typical flow:
1. `brand-design-system-builder` (once)
2. `campaign-landing-page-builder` (build the destination)
3. `paid-ad-creative-builder` (drive traffic to it)
4. `linkedin-carousel-designer` + `blog-featured-image-generator` (organic distribution)
5. `sales-deck-generator` (sales enablement)
6. `one-pager-builder` (leave-behind for sales conversations)

**Watch your Claude Design token budget.** Community reports suggest a single complex design can consume 30-50% of a Pro user's daily usage. The brand setup runs once; downstream assets iterate cheaply because the system is pre-configured. Plan 2-4 complex asset generations per day on Pro.

---

## Sources & Citations

Reference files are grounded in published industry research and practitioner frameworks:

- **Sales deck frameworks:** Andy Raskin's "Greatest Sales Deck" teardowns, The Challenger Sale (Dixon & Adamson), Problem-Agitate-Solve
- **Landing page benchmarks:** Unbounce Conversion Benchmark Report, WordStream Conversion Benchmarks 2025, Databox B2B SaaS benchmarks
- **Ad creative:** LinkedIn Marketing Solutions creative guidelines, Meta Business creative best practices, WordStream Paid Advertising Benchmarks
- **LinkedIn carousel patterns:** Document post engagement research across B2B LinkedIn creators (2024-2026)
- **YouTube thumbnail patterns:** Creator economy research on B2B/edu CTR patterns
- **UI animation principles:** Material Design motion guidelines, Framer motion conventions

Specific numbers are expressed as ranges where precise figures vary by industry, funnel stage, and traffic source.

---

## About This Pack

Built by [Jenna Potter](https://www.linkedin.com/in/jennapotter) using Claude Code skills.

Skills are a way to give Claude persistent, structured frameworks that work better than prompts for repeated, high-stakes work. This pack focuses on B2B marketing design — the category most bottlenecked by design availability — now that Claude Design (launched April 2026) makes brand-consistent visual output accessible to anyone with a Pro plan.

If this was useful, connect on LinkedIn or share it with a B2B marketer who could use it.

---

## License

Free to use, modify, and share. Attribution appreciated but not required. If you fork the pack or build something on top of it, let me know — I'd love to see what you ship.
