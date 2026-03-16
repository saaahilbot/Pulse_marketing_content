# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Repository Overview

This workspace contains **two interconnected marketing knowledge bases** for Vantage Circle products.

**Top-level (Vantage Pulse focus):**
- `/collaterals/` — PDF sales decks, case studies, brochures, guides, and product documentation
- `/visual-context/` — Plain-text descriptions of charts, UI screenshots, and infographics extracted from PDFs (use these to reference visual data without re-reading PDFs)
- `/Pulse Screenshots/` — **16 live product screenshots** of the actual Vantage Pulse UI (use these as the authoritative source for UI descriptions, feature copy, and product visuals in marketing content)
- `VANTAGE_PULSE_FEATURE_LIST.md` — Comprehensive technical feature list generated from codebase analysis; authoritative reference for feature completeness and backend capabilities
- `/blogs/` — Blog catalog and URL list (`blog_catalog.md`, `blogs_url.txt`) covering 43 blog posts across 8 topic categories

**`/vc-marketing/` — Full Vantage Circle product suite knowledge base** (separate git repo):
- `/vc-marketing/specs/` — 47 verified feature specs across 4 products: Recognition & Rewards (18), Perks (9), Pulse (11), Platform & Admin (9)
- `/vc-marketing/sources/VC-Marketing-Content-Compacted.md` — Distilled marketing reference with all approved proof points and case study data
- `/vc-marketing/.claude/CLAUDE.md` — Product suite overview, personas, differentiators, proof points (auto-loaded when working inside `vc-marketing/`)
- `/vc-marketing/.claude/rules/` — 8 rule files covering brand voice, content standards, SEO conventions, data accuracy, blog formatting (Ghost CMS), HR buyer lens, and change tracking
- `/vc-marketing/FEATURE-INDEX.md` — Master index of all 47 specs with key marketing angles

When working on any marketing task, check `/Pulse Screenshots/` first for live UI visuals — they are the most accurate representation of the current product. Then read the relevant `/visual-context/` files for precise stats and data points. For full-suite Vantage Circle content (Recognition, Perks, Platform), open the `vc-marketing/` directory and work from the feature specs.

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

## Vantage Pulse Skills (Claude Code Slash Commands)

When working inside `/Users/sahil/Desktop/marketing/`, these Pulse-specific skills are available:

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `/pulse-blog` | `/pulse-blog "topic or keyword"` | Write a complete Ghost CMS-ready blog post for Vantage Pulse targeting HR leaders — includes SEO metadata, product section with screenshot references, and AccessOne proof |
| `/pulse-landing-page` | `/pulse-landing-page "keyword or angle"` | Write full conversion-optimised landing page copy — hero, social proof, features, case study, integrations, compliance, CTA |
| `/pulse-email` | `/pulse-email "angle" [persona]` | Write a 3-email outbound sequence (Awareness → Nurture → Conversion) targeting HR leaders; persona options: chro, hr-director, hr-bp |
| `/pulse-linkedin` | `/pulse-linkedin "angle" [post_type]` | Write a single LinkedIn post; post types: data, feature, story, thought-leadership |

Skills live in `.claude/skills/` at this directory level. Each skill reads from `CLAUDE.md`, `VANTAGE_PULSE_FEATURE_LIST.md`, and `Pulse Screenshots/` — load these before generating content.

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
| Automated Pulse Surveys | Scheduled, recurring, configurable-length surveys with anonymous submission; 3 creation paths: scratch, templates, or automated |
| Employee Analytics Dashboard | Engagement Index (circular gauge, ↑/↓ vs prior), eNPS with Promoter/Passive/Detractor split, Participation Rate with benchmark alerts, Engagement Over Time multi-line chart |
| Categories Overview | Bar chart of all engagement categories; colour-coded Strong (≥70%), Neutral (60–69%), Needs Attention (<60%); eNPS/Engagement toggle; rich category cards |
| Segments / Heatmap | Cross-tab engagement + eNPS scores by department, country, BU, time; colour-coded red→green; response counts per cell |
| Department-wise Insights | Table view: dept × eNPS distribution bar + Engagement Score + Participation %; Quick Summary sidebar with best/worst dept |
| Comments & Sentiment Analysis | Per-comment sentiment (Positive/Neutral/Negative); AI-generated Overall Feedback Summary with key insights; filterable by dept, category, reply status |
| Two-Way Anonymous Conversation | HR ↔ anonymous employee thread on any feedback item; **AI Assistant suggests empathetic response drafts (94% confidence)** with Copy / Use & Edit; employee reply is always sent anonymously |
| AI Hub (Pro) | Dedicated premium AI features hub (nav item); AI-generated feedback summaries, response suggestions, highlights & recommendations |
| eNPS Tracking | Promoters / Passives / Detractors breakdown with trend over time and benchmark comparison |
| Lifecycle Surveys | Automated surveys triggered at onboarding days (7/15/30/45/60/90) and tenure years (1/2/3/5/7/10) |
| PDF Reports | Exportable survey reports with full demographic and category breakdowns |
| Question Library | 35+ pre-built, validated questions across categories (Rating Scale 1–5, MCQ, open-ended); searchable; "Add Custom Question" inline |
| Word Cloud | Per open-ended question; colour-coded; filterable by sentiment (Positive/Neutral/Negative) with comment counts |
| Kiosk + QR Code Access | Toggle at survey creation ("For deskless employees"); frontline worker access — no app or email required |
| Survey Attempt (Employee UX) | Clean card design; language selector; trust badges ("Your identity is protected", "No name or email tracking"); "Powered by Vantage Circle" |
| Action Planning | Dedicated nav section for follow-through actions post-survey (full feature; appears in all HR nav views) |

### The 10+ Engagement Categories Measured

Alignment · Autonomy · Compensation & Benefits · Engagement · Personal Growth · Recognition · Relationship with Manager · Relationship with Peers · Wellness · Work Environment · Social Connection · Leadership · Communication · Work-Life Balance

*(Heatmap shows all categories as rows; categories visible in screenshots include Social Connection and Leadership in addition to the core 10. Custom categories can be added.)*

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

Templates are browsable in a gallery view with Select / Preview per template. Filtered by category (e.g. "Employee Engagement"). All templates show question count and estimated completion time.

| Template | Time | Questions | Notes |
|---|---|---|---|
| Human Centered Workplace | 12 min | 44 questions | Employee Engagement category |
| Resilience | 12 min | 44 questions | Employee Engagement category |
| Back to Office | 2 min | 4 questions | Lightweight pulse |
| Mental Health | 12 min | 44 questions | Employee Engagement category |
| Employee Mood | 12 min | 44 questions | Employee Engagement category |
| Team Spirit | 12 min | 44 questions | Employee Engagement category |
| Work Culture | 12 min | 44 questions | Employee Engagement category |
| Recognition | 12 min | 44 questions | Employee Engagement category |
| Psychosocial Health | 5 min | 8 questions | Wellness-focused |
| Onboarding | 12 min | 44 questions | DOJ / lifecycle automation |
| 5 Years Work Anniversary | 3 min | 12 questions | Tenure milestone automation |
| Custom | Variable | User-defined | Start from scratch or mix questions |

*Time estimates communicate respect for employees' time — always include them in copy that references surveys.*

**Survey creation wizard (4 steps):** Get Started (name, description, enable QR/Kiosk toggle) → Select Questions (question bank + custom questions) → Configure (schedule, frequency, targeting) → Preview & Launch

---

## Platform UI Navigation Structure (Confirmed from Screenshots)

The HR admin dashboard left nav contains these sections:

```
Overview
Insights
  ├── Categories
  ├── Questions
  ├── Comments
  ├── Heat-map
  └── Employee-Lifecycle
Surveys
  ├── Create
  ├── Manage
  ├── Question
  └── Templates
Action Planning
Configuration
Reports
AI Hub  [Pro badge]
```

**"Create Survey" purple CTA button** is always pinned to the top of the left nav.

---

## Dashboard Data Points (from Live UI Screenshots)

These are the exact numbers shown in the Q1 Engagement Survey 2025 demo environment — use for illustrative examples in content:

**Overview Dashboard:**
- Engagement Index: **65** (↑4 vs prior) — circular gauge, purple/blue gradient
- eNPS: **67** (↑4 points), breakdown: Promoters 21% / Passives 34% / Detractors 45%, badge: "Favorable", note: "36 points below benchmark 100"
- Participation Rate: **36%** (36 of 100 employees), badge: "Low Participation"
- Top Performers: Work-Life Balance (+5 → 85), Leadership (+4 → 65), Communication (+1 → 52)
- Needs Attention: Cybersecurity (−1 → 85), Leadership (−4 → 65), Communication (−1 → 65)
- Engagement Over Time: multi-line chart (Jan–Jun) tracking Participation, Engagement, eNPS simultaneously

**Heatmap (Q1 2025 demo):**
- Total responses: 2.1K company-wide
- Departments shown: Information Security, IT Compliance, Systems Administration, IT Infrastructure, Technical Support, User Experience, DevOps, Database Administration, Web Development, Artificial Intelligence, IT Operations, Data Science, Quality Assurance, Software Development
- Example critical score: Engagement row → Technical Support dept = **04** (red)
- Example healthy score: Work Environment → Database Administration = **98** (green)
- Note shown in UI: "Multiple choice and comment-only questions are not shown in heatmap view"

**Categories Overview (demo):**
- Avg Engagement: 62%, Avg eNPS: 22, Avg Participation: 74%, Total Comments: 21
- Best Performing Dept: Design | Needs Attention Dept: Product (R&R)
- Scoring thresholds: Strong ≥70% (green), Neutral 60–69% (yellow), Needs Attention <60% (red)

**Comments & Sentiment (demo — 1,827 responses):**
- Positive Sentiment: **61%** (1,247 comments) | Neutral: **45%** (601 comments) | Negative: **26%** (31 comments)
- AI summary example: "Analysis of 1,827 feedback responses reveals a predominantly positive workplace sentiment with focused areas for improvement."
- AI key insights: Career development highly valued · Work-life balance concerns need immediate attention · Management communication improved · Compensation review requests increasing · Remote work flexibility is a key satisfaction driver

**Department Breakdown (demo):**
- Data Science: eNPS 53, Engagement 77, Participation 74% (160/200)
- Cybersecurity: eNPS 33, Engagement 77, Participation 80% (160/200)

---

## AI Features in Detail (from Screenshots)

### AI Hub (Pro Tier)
A dedicated "AI Hub" nav item with Pro badge — the premium AI features hub. Contains all AI-powered capabilities in one place.

### AI-Generated Overall Feedback Summary
On the Comments & Sentiment Analysis page: one-click AI summary of all responses with labelled Key Insights bullet points. Shown as an expandable card ("Overall Feedback Summary ✦").

### AI Assistant for HR Responses (Two-Way Anonymous Conversation)
When HR opens any employee feedback item and enters a reply:
- A right-side **AI Assistant panel** appears with 3 AI-drafted response options
- Each draft is tagged "empathetic response" with a **94% confidence score**
- HR can **Copy** or **Use & Edit** any draft — no need to write from scratch
- The "AI Help" button is also available inline in the chat input
- Employee reply footer confirms: "Your response will be sent anonymously"
- This is a **major differentiator** — competitors don't offer AI-assisted HR reply drafting inside anonymous conversation threads

### Word Cloud (per Open-Ended Question)
- Generated per question from open-ended responses
- Dominant words shown in larger text, colour-coded
- "Filter by sentiment" section: All / Positive / Neutral / Negative with comment counts
- Links to individual responses below

---

## Visual Asset Reference

All visual context files are in `/visual-context/`. For live product screenshots, use `/Pulse Screenshots/`. Key assets:

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

### Live Product Screenshots (`/Pulse Screenshots/`)

| File | What It Shows | Best Use |
|---|---|---|
| `Engagement dashboard.png` | Full overview dashboard: Engagement Index 65, eNPS 67, Participation 36%, Top Performers, Needs Attention, Engagement Over Time chart | Product pages, demo decks, overview visuals |
| `Heatmap.png` | Full heatmap: 2.1K responses, 15 departments, 9 categories, red→green colour coding, critical scores (04) and healthy (98) visible | Highest-impact product visual for ads and hero sections — shows the "where's my 04?" urgency |
| `Sentiment trend graph.png` | Comments & Sentiment Analysis: 3 donut gauges (Positive 61%, Neutral 45%, Negative 26%), AI Overall Feedback Summary panel, filterable comment feed | AI capability showcase, sentiment analysis copy |
| `Anonymous response interface.png` | Two-Way Anonymous Conversation + AI Assistant: empathetic response drafts at 94% confidence, Copy/Use & Edit, anonymity footer | **Most powerful AI differentiator screenshot** — use in competitive comparisons and AI feature copy |
| `Survey creation dashboard.png` | Survey creation hub: 3 paths (scratch / templates / automated), recent templates with q-count and time | Product walkthrough, onboarding copy |
| `Custom survey builder1.png` | Step 1 of 4-step wizard: survey name, description, QR/Kiosk toggle | Survey creation flow copy |
| `Custom survey builder2.png` | Step 2: Question Bank (35q), category browse, add/remove, Selected Questions panel, real-time completion estimate | Feature depth copy, question library showcase |
| `Template selection view.png` | Template gallery: Employee Engagement category with 8 templates (Human Centered Workplace, Resilience, Back to Office, Mental Health, etc.) | Template library copy, onboarding materials |
| `Performance score breakdown.png` | Categories Overview: bar chart with Strong/Neutral/Needs Attention thresholds, Rich category analysis cards | Category analytics copy, "see all your categories at a glance" messaging |
| `Department-wise insights.png` | Department breakdown table: eNPS distribution bar, Engagement Score, Participation %; Quick Summary sidebar | Manager/HR buyer copy, department-level analysis |
| `Word-Cloud.png` | Per-question word cloud for open-ended responses; Filter by sentiment section below | Open-ended analytics copy, AI insights showcase |
| `Survey attempt page.png` | Employee survey landing (desktop): trust badges, language selector, "Quick Pulse Check" 8q/2min | Employee UX copy, anonymity messaging |
| `Survey attempt page-mobile.png` | Same as above, mobile responsive layout | Mobile-first copy, responsive design proof point |
| `Participation tracking.png` | Same as Engagement dashboard (duplicate) | — |
| `Question builder interface1.png` | Same as Custom survey builder step 2 (duplicate) | — |

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
3. **Respect survey time estimates** — always mention that pulse surveys are short (2–12 min depending on template). HR leaders' biggest objection is "employees won't bother."
4. **Never claim capabilities not in this document** — the product does many things but the above is the verified feature set.
5. **AccessOne is the go-to case study** — Cassidi Ross quote is approved. 67% participation and eNPS 45 are the hero metrics.
6. **The integration list is a trust signal for enterprise buyers** — include it in any content aimed at IT decision-makers or enterprise HR.
7. **Compliance badges matter at evaluation stage** — include GDPR/ISO/SOC 2 in any content addressing data-security objections.
8. **The AI Assistant for HR replies is the #1 AI differentiator** — the `Anonymous response interface.png` screenshot shows this explicitly. No competitor offers AI-drafted empathetic responses inside anonymous conversation threads. Lead with this in any AI-focused content.
9. **"Two-Way Anonymous Conversation" is the correct feature name** — not just "anonymous feedback." The conversation thread is two-way; the AI Assistant assists HR; identity is always protected.
10. **AI Hub is a Pro-tier feature** — position it as part of the premium offering; don't imply it's available on all plans unless confirmed.
11. **Use live screenshot data for UI descriptions** — the `/Pulse Screenshots/` folder contains the authoritative current UI. Prefer these over older PDF-based visual context files when describing the product interface.
