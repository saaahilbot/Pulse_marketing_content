---
name: pulse-blog
description: >
  Write a complete Ghost CMS-ready blog post for Vantage Pulse targeting HR
  leaders. Reads product context from CLAUDE.md, live UI from /Pulse Screenshots/,
  and feature accuracy from VANTAGE_PULSE_FEATURE_LIST.md. Enforces brand voice,
  data accuracy, HR buyer framing, and Ghost CMS formatting on every output.
user_invocable: true
arguments:
  - name: topic_or_keyword
    description: >
      The topic or primary keyword for the blog post.
      Examples: "how to improve employee survey participation", "eNPS best practices",
      "anonymous pulse survey benefits", "AI feedback analysis for HR".
    required: true
  - name: funnel_stage
    description: "awareness (TOFU), consideration (MOFU), or decision (BOFU). Auto-detected if omitted."
    required: false
---

# pulse-blog

Write a complete Ghost CMS-ready Vantage Pulse blog post for HR leaders.

## Usage

```
/pulse-blog "how to improve employee survey participation rates"
/pulse-blog "eNPS tracking software" bofu
/pulse-blog "what is a pulse survey" awareness
```

---

## Context Files (Read First — Every Time)

| File | What to Use |
|------|-------------|
| `CLAUDE.md` | Brand voice, approved stats, personas, product features, content principles |
| `VANTAGE_PULSE_FEATURE_LIST.md` | Feature accuracy — use exact capability names |
| `Pulse Screenshots/` | UI descriptions and screenshot references for product sections |

---

## Step 1 — Parse Topic and Detect Funnel Stage

Extract from the topic:
- **Primary keyword** — what an HR leader would type into Google
- **Pain point** — the underlying problem behind the search
- **Funnel stage** (if not specified):

| Signal | Stage |
|--------|-------|
| "what is", "how does", "why", broad engagement terms | TOFU — Awareness |
| "best way to", "how to improve", "tips for", comparisons | MOFU — Consideration |
| "software", "platform", "tool", "Vantage Pulse vs" | BOFU — Decision |

---

## Step 2 — Build the Outline

Plan the structure before writing. Present the outline to the user and confirm before drafting the full post.

```
H1: [Primary keyword — punchy, benefit-led, 8-12 words]

Introduction (3-5 sentences):
  - Open with the pain point or a sharp stat
  - No "In today's world…" or "Employee engagement is crucial…" openers
  - End with what the reader will get from the post

H2: [Why this matters — context section]
H2: [Core section 1]
  H3: [Subsection if needed]
H2: [Core section 2]
  H3: [Subsection if needed]
H2: [Core section 3]
H2: [How Vantage Pulse solves it — product section]
  → Screenshot placement here
H2: [Proof — AccessOne case study or benchmark data]
Conclusion (1 short paragraph)
CTA: "Book a Demo" or "See How It Works"
```

---

## Step 3 — Write the Blog Post

### Voice Rules (Non-Negotiable)

- Lead with data, follow with meaning — land what every stat means for the reader
- Short sentences. Punchy, declarative statements
- **No em-dashes (`—`)** — split into two sentences instead
- No corporate jargon: synergy, leverage, best-in-class, revolutionize, gamification
- Maximum 2-3 natural Vantage Pulse brand mentions
- Every stat must trace to an approved source in CLAUDE.md

### Length

1,500–2,500 words. Each H2 section: 150-300 words with a clear takeaway.

### Product Section

Pick 1-2 features directly relevant to the topic. Use exact in-product feature names from the screenshots. Describe what HR sees and what they can do — not how it works technically.

Match topic to screenshot:

| Topic Area | Screenshot |
|-----------|------------|
| Dashboard / engagement scores / overview | `Engagement dashboard.png` |
| Heatmap / department segmentation / critical scores | `Heatmap.png` |
| Sentiment analysis / AI feedback summary / comments | `Sentiment trend graph.png` |
| Anonymous conversations / AI-assisted HR replies | `Anonymous response interface.png` |
| Survey creation / getting started | `Survey creation dashboard.png` |
| Template library / pre-built surveys | `Template selection view.png` |
| Question bank / custom questions | `Custom survey builder2.png` |
| Category scores / performance overview | `Performance score breakdown.png` |
| Department-level insights | `Department-wise insights.png` |
| Word cloud / open-ended analysis | `Word-Cloud.png` |
| Employee survey UX / anonymity trust | `Survey attempt page.png` |
| Mobile survey experience | `Survey attempt page-mobile.png` |

Image placeholder format (user replaces with hosted URL):
```html
<img src="[PULSE_SCREENSHOT: filename.png]" alt="Vantage Pulse [feature description]" loading="lazy" />
```

Place image **after the H2 heading** or after the first 1-2 context sentences — never at the end of a section.

### Ghost CMS Formatting

**Tables:** Always HTML, never markdown pipes.
```html
<div class="table-responsive">
<table class="table table-bordered text-left star-rating-table" style="width: 100%" cellpadding="10">
<thead><tr><th>Header</th><th>Header</th></tr></thead>
<tbody><tr><td>Data</td><td>Data</td></tr></tbody>
</table>
</div>
```

**Images:** Full-width, lazy-loaded, no fixed widths.
```html
<img src="..." alt="Vantage Pulse [description]" loading="lazy" />
```

---

## Step 4 — SEO Metadata

Write:
- **Title tag:** `[Primary Keyword] — [Benefit Qualifier] | Vantage Pulse` (50-60 chars)
- **Meta description:** 140-155 chars — keyword + proof point + soft CTA
- **Slug:** `/blog/[hyphenated-primary-keyword]/`
- **Focus keyword:** primary keyword
- **Secondary keywords:** 2-3 LSI terms used naturally in the body

---

## Step 5 — Output

Deliver in this order:
1. **SEO block** — title tag, meta description, slug, focus keyword, secondary keywords
2. **Full blog post** — Ghost-ready markdown with HTML blocks for tables and images
3. **Screenshot placement notes** — list each `[PULSE_SCREENSHOT: filename.png]` with recommended alt text and hosted-URL swap instruction

---

## Approved Proof Points

### AccessOne (Primary Case Study)
- **67% participation rate** in month one (industry benchmark: 30–50%)
- **eNPS 45** (industry average: 10–30) — Promoters 58%, Passives 29%, Detractors 13%
- Critical alert example: Customer Success dept — Relationship with Peers: **20** (red)
- **Approved quote:** "Seeing honest feelings in real numbers? Priceless. We could actually watch morale lift after each change." — Cassidi Ross, HR Coordinator, AccessOne

### Platform Scale
- 700+ clients · 3.2M+ users · 100+ countries

### Industry Stats (Always Cite Source)
- Employees who feel heard are nearly **5x more likely** to feel empowered — Salesforce
- **83% of employees** would participate in a listening program — IBM
- **$483B–$605B/year** lost to disengagement — Gallup

### Approved Pull Quotes (Use Verbatim)
- "You can't fix what you don't hear in time."
- "Other Tools Give You Dashboards. We Give You Decisions."
- "Inaction isn't neutral — it's expensive."

---

## Quality Checklist

- [ ] CLAUDE.md read before writing
- [ ] Every stat traced to an approved source
- [ ] No em-dashes — two sentences instead
- [ ] Written for HR buyer (CHRO, HR Director), not employees
- [ ] Feature names match exact in-product UI labels
- [ ] Maximum 2-3 brand mentions
- [ ] Tables use HTML — not markdown pipes
- [ ] Images use placeholder format with "Vantage Pulse" in alt text
- [ ] Images placed at section start or midpoint — never at the end
- [ ] 1,500–2,500 words
- [ ] SEO metadata block included
- [ ] CTA at end of post
- [ ] AccessOne quote attributed correctly (Cassidi Ross, HR Coordinator, AccessOne)
- [ ] No "gamification" language — that's Vantage Fit, not Pulse
