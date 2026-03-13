# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Repository Overview

This workspace contains **two interconnected marketing knowledge bases** for Vantage Circle products.

**Top-level (Vantage Pulse focus):**
- `/collaterals/` — PDF sales decks, case studies, brochures, guides, and product documentation
- `/visual-context/` — Plain-text descriptions of charts, UI screenshots, and infographics extracted from PDFs (use these to reference visual data without re-reading PDFs)
- `/blogs/` — Blog catalog and URL list (`blog_catalog.md`, `blogs_url.txt`) covering 43 blog posts across 8 topic categories

**`/vc-marketing/` — Full Vantage Circle product suite knowledge base** (separate git repo):
- `/vc-marketing/specs/` — 47 verified feature specs across 4 products: Recognition & Rewards (18), Perks (9), Pulse (11), Platform & Admin (9)
- `/vc-marketing/sources/VC-Marketing-Content-Compacted.md` — Distilled marketing reference with all approved proof points and case study data
- `/vc-marketing/.claude/CLAUDE.md` — Product suite overview, personas, differentiators, proof points (auto-loaded when working inside `vc-marketing/`)
- `/vc-marketing/.claude/rules/` — 8 rule files covering brand voice, content standards, SEO conventions, data accuracy, blog formatting (Ghost CMS), HR buyer lens, and change tracking
- `/vc-marketing/FEATURE-INDEX.md` — Master index of all 47 specs with key marketing angles

When working on any marketing task, read the relevant `/visual-context/` files first — they are the most efficient source of precise stats and product visuals. For full-suite Vantage Circle content (Recognition, Perks, Platform), open the `vc-marketing/` directory and work from the feature specs.

---

## Typst PDF Workflow

Marketing articles and reports can be authored in Typst and compiled to PDF. Typst 0.14 is installed at `/opt/homebrew/bin/typst`.

**Compile a `.typ` file to PDF:**
```bash
typst compile <file>.typ <output>.pdf
```

**Key patterns from existing Typst work (`survey_article.typ`):**
- Full-bleed colored header bar: use `page(background: place(top + left, rect(width: 100%, height: Xcm, fill: color)))` — the `background` parameter paints at page coordinates before content
- Header text over the bar: set `margin.top` equal to the bar height; the `header:` block sits inside the margin area, naturally overlaying the background rect
- Two-column sections: `grid(columns: (1fr, 1fr), gutter: 1em, ...)` with `grid.cell(colspan: 2, ...)` for full-width rows within the grid
- Page counter: must be wrapped — `#context counter(page).display(...)` not bare `#counter(page).display(...)`
- Font fallback: `font: ("Helvetica Neue", "Arial")` — Inter is not installed system-wide

**Brand colors for Vantage Pulse Typst docs:**
- Navy header: `#0d2b4e`
- Primary blue: `#1a4f8a`
- Accent blue: `#2e7dd1`

**Brand colors for full Vantage Circle (from brand book):**
- Space Cadet (primary): `#29294C`
- Pumpkin Orange (accent/CTA): `#FF6D05`
- Ghost White (background): `#EEEEF6`
- Typeface: Lato (Bold for headings, Regular for body)

---

## vc-marketing Skills (Claude Code Slash Commands)

When working inside `vc-marketing/`, these skills are available:

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `/vc-blog-update` | `/vc-blog-update "URL" "keyword"` | SEO-optimize an existing VC English blog — produces optimization report + content writer outline saved to `output/reports/` |
| `/vc-blog-translate` | `/vc-blog-translate "URL" "spanish\|french" ["keyword"]` | Translate a blog to Spanish or French with localized SEO, Ghost CMS formatting; saved to `output/translations/` |
| `/vc-pdf` | `/vc-pdf` | Convert markdown/HTML/Word content to a branded Vantage Circle PDF using Typst — reports, case studies, one-pagers |

Skills require MCP servers configured in `.mcp.json` inside `vc-marketing/`: Ahrefs, DataForSEO, Google Search Console, Google Analytics.

---

## vc-marketing Working Rules (Auto-Loaded)

When generating content using the `vc-marketing/` knowledge base, these rules always apply:

- **No em-dashes** (`—`) in blog content — split into two sentences instead
- **Never fabricate stats** — all data must trace to `sources/VC-Marketing-Content-Compacted.md` or a feature spec Section 7.3. The live website (`vantagecircle.com`) is not an approved source.
- **Brandon Hall Awards belong to client programs**, not to Vantage Circle directly — "Wipro's Winners' Circle program, powered by Vantage Circle, won Brandon Hall Gold 2023"
- **Ghost CMS tables**: always use HTML `<table class="table table-bordered text-left star-rating-table">` wrapped in `<div class="table-responsive">` — never markdown pipe tables
- **Ghost CMS images**: `<img src="..." alt="..." loading="lazy" />` — no fixed widths, no centering wrappers
- **Every commit to `vc-marketing/` must add an entry to `vc-marketing/CHANGELOG.md`** (date, prompt, files changed) — see `vc-marketing/.claude/rules/change-tracking.md`
- **Maximum 2–3 natural brand mentions per blog post**
- **Competitor outbound links** get `rel="nofollow"`; `vantagefit.io` links are treated as internal (no nofollow, same tab)

---

## Brand Voice: "Professional Yet Punchy"

**The core rule:** Data-driven and authoritative, but human and direct. Never corporate-bland. Never breathlessly hypey.

**How it works in practice:**

- **Lead with data, follow with meaning.** Don't just state a stat — land what it means for the reader.
  - Wrong: "Our platform tracks eNPS."
  - Right: "Your eNPS score tells you who's about to quit before they do."

- **Short sentences land harder than long ones.** Prefer punchy, declarative statements.
  - "You can't fix what you don't hear in time."
  - "Inaction isn't neutral — it's expensive."
  - "We're not just a survey tool. We're a better way to lead."

- **Be specific, not vague.** Real numbers beat adjectives.
  - Wrong: "High participation rate"
  - Right: "67% participation in month one — double the industry average"

- **Speak to the reader's fear first, then solve it.** HR leaders fear being blindsided. Start there.
  - "Most organisations find out about disengagement when someone hands in their notice."

- **The brand is confident, not arrogant.** The product earns the right to bold claims through specific proof.

**Approved pull quotes (use verbatim):**
- "Listening to Your Employees Powers Better Decisions"
- "Other Tools Give You Dashboards. We Give You Decisions."
- "You can't fix what you don't hear in time."
- "Inaction isn't neutral — it's expensive."
- "We're not just a survey tool. We're a better way to lead."
- "No more guesswork. Just a fast, clear plan to strengthen engagement every day."
- "Compliant data. Connected workflows."
- "Ready to Turn Feedback into Fuel?"
- "Book a Demo and See the Difference in 15 Minutes"
- "Let's Build a Listening Culture That Lasts."

**Customer quote (approved, use with attribution):**
> "Seeing honest feelings in real numbers? Priceless. We could actually watch morale lift after each change."
> — Cassidi Ross, HR Coordinator, AccessOne

---

## Product: What Vantage Pulse Is and Does

**One-line definition:** Vantage Pulse is an automated employee engagement pulse survey platform that turns real-time feedback into actionable insights — with no manual analytics required.

### Core Product Capabilities (4 Value Streams)

1. **Employee Engagement** → Automated Pulse Surveys → Experience Cycle → Pre-built survey templates → Anonymous Feedback
2. **Workforce Trends** → Question Scores → Filters for category-based comparison → Employee Analytics Dashboard
3. **Greater Insights** → Pulse Survey Reports → Engagement Reports → eNPS Reports
4. **Learning & Guidance** → Suggested Improvements → Access to HR Best Practices Articles

### Key Features

| Feature | What It Does |
|---|---|
| Automated Pulse Surveys | Scheduled, recurring, configurable-length surveys (5–23 min) with anonymous submission |
| Employee Analytics Dashboard | Engagement Score (circular gauge), eNPS distribution, Engagement Score Timeline — multi-device |
| Segments / Heatmap | Cross-tab engagement scores by geography, department, or any dimension — colour-coded critical alerts |
| eNPS Tracking | Promoters / Passives / Detractors breakdown with trend over time |
| Lifecycle Surveys | Automated risk prediction at key employee journey moments |
| PDF Reports | Exportable survey reports with full demographic and category breakdowns |
| Question Library | Pre-built, validated question sets across 10 engagement categories |
| Kiosk + QR Code Access | Frontline worker access — no app or email required |
| Sentiment Heatmaps | AI-powered emotion mapping (vs. basic/none in competitors) |
| Anonymous Feedback | Psychological safety layer to improve response honesty and participation |

### The 10 Engagement Categories Measured

Alignment · Autonomy · Compensation & Benefits · Engagement · Personal Growth · Recognition · Relationship with Manager · Relationship with Peers · Wellness · Work Environment

### The 3-Phase Engagement Pyramid (Methodology)

1. **Top — Instant Feedback Survey:** Quick, mobile-friendly, anonymous
2. **Middle — What It Means:** Seamless platform, real-time insights surfaced automatically
3. **Base — Why It Works:** Safe space design boosts response rates and data quality

---

## Competitive Positioning

**Primary differentiator table ("Why Vantage Pulse Wins Where Others Don't"):**

| Capability | Vantage Pulse | Competitors |
|---|---|---|
| Real-time feedback | ✓ Instant alerts | ✗ Delayed |
| Sentiment heatmaps | ✓ AI-powered emotion mapping | ✗ Basic or none |
| Lifecycle insights | ✓ Automated risk prediction | ✗ Manual |
| Frontline access | ✓ Kiosk + QR code | ✗ Limited |
| Actionable follow-through | ✓ Integrated with Vantage Recognition / Perks / Fit | ✗ Requires separate tools |

**The wedge message:** Competitors give dashboards. Vantage Pulse gives decisions. The platform is integrated with Vantage Circle's broader ecosystem (Recognition, Perks, Fit) — so insights lead directly to action without leaving the suite.

---

## Stats & Data Points (Verified — Use With Confidence)

### Vantage Pulse Scale
- **700+ clients** globally
- **3.2M+ users**
- **100+ countries**

### AccessOne Case Study (Primary Customer Proof)
- **67% participation rate** in month one (industry benchmark: 30–50%)
- **eNPS Score: 45** (industry average: 10–30)
  - Promoters: 58% | Passives: 29% | Detractors: 13%
- **Three cultural strengths identified:** Relationship with Peers, Work Environment, Relationship with Managers
- **Critical alert example:** Customer Success department — Relationship with Peers score: **20** (flagged in pink/red)
- **Healthy example:** Marketing department — Relationship with Manager: 76, Relationship with Peers: 77

### Sample Report Data (Anonymous benchmark data — use to illustrate platform outputs)
- Engagement Score: **78** (↑ from 67 prior quarter)
- eNPS: **61** (↑ from 52 prior quarter)
- Participation Rate: **73%** (↓ from 75%)
- Highest-engagement category: **Wellness** (~65 score)
- Lowest-eNPS category: **Compensation & Benefits** (~21)
- Highest-participation department: **Brand Sales** (~95%), **HR** (~91%)
- Critical department: **R&D** — lowest engagement (~67) AND lowest participation (~20%)
- Gender breakdown: Female (Engagement ~75, Participation ~81%, eNPS ~57) vs. Male (Engagement ~78, Participation ~74%, eNPS ~60)

### Segments Heatmap Example (Geography)
- United States: Manager 76 / Peers 77 / Recognition 95 — all healthy (teal)
- Pune: Manager 68 / Peers **20** / Recognition 66 — Peers score **critical** (red)
- Australia: Manager 80 / Peers 86 / Recognition 80 — all healthy (teal)

### Industry Research Stats (Third-Party — Cite Source)
- **Forbes / Leigh Branham:** "Lack of employee feedback is one of the biggest causes of performance problems and turnover."
- **Salesforce:** "Employees who feel their voice is heard are nearly **5x more likely** to feel empowered to perform their best work."
- **IBM:** "**83% of surveyed employees** said they would participate in an employee listening program."
- **Gallup:** Actively disengaged employees cost US businesses **$483B–$605B/year** in lost productivity. Global engagement is stagnating.

### Brochure Stats (Top-line Social Proof)
- **87%** — [engagement-related stat from brochure; use in awareness-stage content]
- **41%** — [retention-related stat from brochure; use in awareness-stage content]
- **100** — [related metric from brochure; use in awareness-stage content]
- **37** — [badge-style stat from brochure; use for credibility]

*(Note: The exact descriptors for these four brochure stats should be confirmed against the brochure PDF before use in formal materials — `VantagePulse_Brochure_2Pager_v2_2025-06.pdf`, page 1.)*

---

## Security, Compliance & Integrations

### Compliance Certifications (All Verified)
ISO 27001:2013 · GDPR · SOC 2 Type 2 (AICPA) · VAPT · BSI · HIPAA · CCPA

### Integrations
| Type | Platforms |
|---|---|
| Social / Communication | Microsoft Teams, Slack, Yammer, Zoom, Google Workspace, Vantage |
| SSO | Azure AD, Okta |
| HRIS | BambooHR, Dayforce, Workday, Oracle HCM, SAP |

**Pull quote:** "Compliant data. Connected workflows."

---

## Target Personas

Three distinct audiences — messaging emphasis differs for each:

| Persona | Pain Point | What They Need to Hear |
|---|---|---|
| **Employees** | Don't feel heard; worry about anonymity | Anonymous, quick, their feedback drives real change |
| **HR & People Teams** | Manual analytics, no real-time signal, can't segment | Self-serve insights, instant alerts, no analytics overhead |
| **Executives & C-Suite** | Can't quantify culture ROI, blind to attrition risk | $483B–$605B cost of disengagement, eNPS tied to retention, data-backed decisions |

---

## 5 Core Problems Vantage Pulse Solves

1. **Disengagement** — lack of listening kills morale before it's visible
2. **Lack of collaboration** — peer relationship breakdowns go undetected
3. **Mental health concerns** — wellness scores surface issues before they escalate
4. **Inequities & disparities** — segmentation reveals demographic and geographic gaps
5. **Uncertainty & job insecurity** — continuous pulse keeps leadership informed in real time

---

## Customer Journey / Getting-Started Flow

1. **Launch first pulse** — choose template (Employee Engagement, Wellness, Back to Office, or custom)
2. **Get first heatmap + insights** — real-time results, colour-coded, filterable by department/geography/demographic
3. **Build a culture of continuous improvement** — recurring pulses, trend tracking, suggested actions

**CTA:** "Book a Demo and See the Difference in 15 Minutes"

---

## Survey Templates (Pre-Built, with Time/Question Counts)

| Template | Time | Questions |
|---|---|---|
| Employee Engagement | 5 min | 12 questions |
| Employee Wellness | 11 min | 23 questions |
| Back to Office | 8 min | 17 questions |
| Custom | Variable | User-defined |

*Time estimates communicate respect for employees' time — always include them in copy that references surveys.*

---

## Visual Asset Reference

All visual context files are in `/visual-context/`. Key assets:

| File | What It Shows | Best Use |
|---|---|---|
| `sales-deck-cover-hero-ui-screenshot-context.txt` | Hero cover with survey template cards + real person photo | Deck openers, webinar title cards |
| `deck-empexp-segments-heatmap-ui-context.txt` | Heatmap showing Pune Peers score of 20 (critical red) | Ads, email sequences, website hero — highest-conversion visual |
| `casestudy-segment-filter-scores-ui-context.txt` | Dept filter: Customer Success Peers score 20 (red alert) | Product demos, case study pages |
| `deck-empexp-employee-analytics-dashboard-context.txt` | Dashboard: Engagement Score 77, eNPS chart, timeline | Product pages, explainer videos |
| `deck-empexp-feature-flow-diagram-context.txt` | 4-lane feature flow with 16+ capabilities | Feature deep-dives, RFP responses |
| `sales-deck-competitive-comparison-table-context.txt` | Competitive table: Vantage Pulse vs. generic tools | Sales enablement, objection handling |
| `sales-deck-engagement-pyramid-context.txt` | 3-phase methodology pyramid | Thought leadership, methodology explainers |
| `casestudy-67-participation-pictograph-context.txt` | 67% participation (vs. 30–50% benchmark) | Case study, email nurture |
| `casestudy-enps-breakdown-diagram-context.txt` | eNPS 45 with Promoters/Passives/Detractors split | Case study proof, sales collateral |
| `brochure-2pager-page1-stats-infographic-context.txt` | 87%, 41%, 100, 37 stats + social proof logos | Awareness-stage content |
| `report-executive-summary-stats-context.txt` | Q4: Engagement 78↑, eNPS 61↑, Participation 73% | Report template examples |
| `sales-deck-disengagement-cost-flow-context.txt` | Gallup $483B–$605B stat + cost-of-inaction arc | Top-of-funnel awareness content |

**The single most powerful product visual:** `deck-empexp-segments-heatmap-ui-context.txt` — the Pune / Peers score of 20. It is conversion-ready for ads, emails, and hero sections. It makes prospects think: "I need to know if I have a 20 somewhere in my organisation."

---

## Blog Content Universe

43 blog posts across 8 categories (full list in `/blogs/blog_catalog.md`):

1. Survey Strategy & Best Practices
2. Feedback, Results & Action Planning
3. Question Banks & Templates
4. Pulse Surveys & Tools
5. Employee Engagement
6. Retention
7. Company Culture & Climate
8. General HR / People Leadership

Use the blog catalog when planning content calendars, identifying content gaps, or briefing new blog posts. The blog content establishes Vantage Circle as a practitioner-facing thought leader — practical, HR-literate, solution-oriented.

---

## Social Proof Logos (Featured in Brochure)

Axonics · AcceleratON · BGIS · YNV Group · Lighthouse

---

## Content Principles for All Marketing Tasks

1. **Verify stats before publishing** — always trace back to the source visual-context file or PDF collateral listed above.
2. **The Pune/Customer Success "score: 20" example is your most powerful proof point** — use it when prospects need to feel urgency.
3. **Respect survey time estimates** — always mention that pulse surveys are short (5–11 min). HR leaders' biggest objection is "employees won't bother."
4. **Never claim capabilities not in this document** — the product does many things but the above is the verified feature set.
5. **AccessOne is the go-to case study** — Cassidi Ross quote is approved. 67% participation and eNPS 45 are the hero metrics.
6. **The integration list is a trust signal for enterprise buyers** — include it in any content aimed at IT decision-makers or enterprise HR.
7. **Compliance badges matter at evaluation stage** — include GDPR/ISO/SOC 2 in any content addressing data-security objections.
