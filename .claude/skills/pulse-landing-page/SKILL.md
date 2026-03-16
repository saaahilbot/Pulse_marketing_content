---
name: pulse-landing-page
description: >
  Write full conversion-optimised landing page copy for Vantage Pulse targeting
  HR leaders. Covers hero, social proof, problem, features, case study, integrations,
  compliance, and CTA sections. Reads product context from CLAUDE.md and live UI
  from /Pulse Screenshots/. Supports feature pages, solution pages, and comparison pages.
user_invocable: true
arguments:
  - name: keyword_or_angle
    description: >
      The primary keyword or page angle.
      Examples: "eNPS survey software", "employee pulse survey tool",
      "Vantage Pulse vs Culture Amp", "anonymous employee feedback platform".
    required: true
  - name: page_type
    description: "feature, solution, comparison, or demo. Auto-detected if omitted."
    required: false
---

# pulse-landing-page

Write full Vantage Pulse landing page copy for HR leaders — hero through closing CTA.

## Usage

```
/pulse-landing-page "eNPS survey software"
/pulse-landing-page "employee pulse survey tool" solution
/pulse-landing-page "Vantage Pulse vs Culture Amp" comparison
/pulse-landing-page "book a demo" demo
```

---

## Context Files (Read First — Every Time)

| File | What to Use |
|------|-------------|
| `CLAUDE.md` | Brand voice, approved stats, personas, competitive positioning, pull quotes, integrations, compliance |
| `VANTAGE_PULSE_FEATURE_LIST.md` | Feature accuracy — exact capabilities only |
| `Pulse Screenshots/` | UI descriptions for feature sections |

---

## Step 1 — Detect Page Type

| Keyword Signal | Page Type |
|---------------|-----------|
| Feature name + "software / platform / tool" | `feature` — deep dive on one capability |
| "eNPS", "pulse survey", "employee listening", "engagement survey" | `solution` — problem-solution narrative |
| "vs", "alternative", "compare" | `comparison` — head-to-head positioning |
| "demo", "free trial", "get started", "pricing" | `demo` — high-intent conversion page |

---

## Step 2 — Write Each Section

### Hero

**Headline (H1):** 8-12 words. Primary keyword + outcome. Punchy and specific — no vague claims.
- Good: "Turn Employee Feedback into Decisions. Not Just Reports."
- Bad: "The Leading Employee Engagement Survey Platform"

**Subheadline:** 20-30 words. Expand the benefit. Include one proof point or quantifier.

**CTA buttons:**
- Primary: "Book a Demo"
- Secondary: "See How It Works"

**Trust signal line** (below CTAs):
`700+ companies · 3.2M+ employees · 100+ countries`

---

### Social Proof Bar

Logo strip: Axonics · AcceleratON · BGIS · YNV Group · Lighthouse

Stat strip (3 numbers):
- 67% participation in month one
- eNPS 45 (AccessOne)
- 700+ clients globally

---

### Problem Section

Frame the pain points the page keyword maps to. Pick 3-5 from the core problems Vantage Pulse solves:

| Problem | One-line framing |
|---------|-----------------|
| Disengagement | "Most organisations find out about disengagement when someone hands in their notice." |
| No real-time signal | "HR is flying blind — survey results arrive weeks after the problem is already expensive." |
| Low participation | "Employees don't fill in surveys they don't trust. Anonymous-in-name-only tools don't count." |
| No actionable insight | "A 40-slide deck of charts isn't an action plan. It's a delay." |
| Frontline excluded | "Your desk-based employees get pulse surveys. Your frontline workers get nothing." |
| Collaboration breakdowns | "Peer relationship problems go undetected until they show up in attrition data." |

Write 2-3 sentences per problem. Fear-first, then solution direction.

---

### Features Section

Pick 4-6 features most relevant to the page keyword. For each:
- **Exact feature name** (from UI — see screenshots)
- 1-sentence benefit in HR outcome language
- Optional screenshot reference

Feature-to-outcome translations:

| Feature (UI Name) | HR Buyer Language |
|-------------------|------------------|
| Engagement Index | "See your company's engagement score at a glance — with trend direction vs prior period" |
| Heat-map | "Spot the department with a score of 20 when your average is 77. That's where attrition risk is hiding." |
| Two-Way Anonymous Conversation | "HR replies to anonymous feedback without unmasking anyone. Employees feel heard. Identity stays protected." |
| AI Assistant (empathetic response) | "The AI drafts an empathetic reply at 94% confidence. HR edits and sends in seconds." |
| AI Hub | "Feedback summaries, key insights, response suggestions — all AI-powered, all in one place." |
| Comments & Sentiment Analysis | "Positive, Neutral, Negative — each filterable by department, category, or reply status." |
| Overall Feedback Summary | "AI reads every open comment and surfaces the 5 things HR needs to act on. In plain language." |
| Categories Overview | "All engagement categories on one screen — colour-coded Strong, Neutral, Needs Attention." |
| Employee-Lifecycle | "Automated surveys at Day 7, 15, 30, 45, 60, 90 onboarding. Catch problems before they become attrition." |
| QR Codes or Kiosks | "Frontline, factory, and retail employees included — no email address required." |
| Action Planning | "From insight to action plan in the same platform. No spreadsheet handoffs." |
| Word Cloud | "Open-ended responses visualised and filterable by sentiment. No manual reading." |

Screenshot to use per feature:

| Feature | Screenshot |
|---------|------------|
| Dashboard / engagement score | `Engagement dashboard.png` |
| Heatmap / segmentation | `Heatmap.png` |
| Sentiment / AI summary | `Sentiment trend graph.png` |
| Anonymous conversation + AI | `Anonymous response interface.png` |
| Survey creation | `Survey creation dashboard.png` |
| Template library | `Template selection view.png` |
| Category scores | `Performance score breakdown.png` |
| Department insights | `Department-wise insights.png` |
| Word cloud | `Word-Cloud.png` |
| Employee UX / anonymity | `Survey attempt page.png` |

Screenshot format:
```
[SCREENSHOT: filename.png — alt: "Vantage Pulse [feature name] showing [what HR sees]"]
```

---

### Case Study Section (AccessOne)

Structure:
1. **Company context** (1 sentence): mid-market healthcare company
2. **Challenge** (1-2 sentences): low survey trust, no real-time visibility
3. **Result metrics** (stat strip or bullets):
   - 67% participation in month one (benchmark: 30–50%)
   - eNPS 45 (industry average: 10–30)
   - Promoters 58% · Passives 29% · Detractors 13%
4. **Testimonial** (verbatim):
   > "Seeing honest feelings in real numbers? Priceless. We could actually watch morale lift after each change."
   > — Cassidi Ross, HR Coordinator, AccessOne

---

### Integrations Section

**Headline:** "Compliant data. Connected workflows."

Communication & SSO:
MS Teams · Slack · Yammer · Zoom · Google Workspace · Azure AD · Okta

HRIS:
BambooHR · Dayforce · Workday · Oracle HCM · SAP

---

### Compliance Section

ISO 27001:2013 · GDPR · SOC 2 Type 2 · VAPT · BSI · HIPAA · CCPA

---

### Comparison Section (comparison page type only)

Use the competitive differentiator table from CLAUDE.md:

| Capability | Vantage Pulse | Competitors |
|-----------|--------------|-------------|
| Real-time feedback | Instant alerts | Delayed |
| Sentiment heatmaps | AI-powered emotion mapping | Basic or none |
| Lifecycle insights | Automated risk prediction | Manual |
| Frontline access | Kiosk + QR code | Limited |
| AI-assisted HR replies | Built-in at 94% confidence | None |
| Integrated ecosystem | Recognition + Perks + Fit + Pulse | Separate tools |

Frame as: "Other tools give you dashboards. Vantage Pulse gives you decisions."

---

### Closing CTA Section

Use one approved pull quote as the headline. Then:

**Primary CTA:** "Book a Demo and See the Difference in 15 Minutes"
**Secondary CTA:** "See How It Works →"

Approved pull quotes for closing:
- "Ready to Turn Feedback into Fuel?"
- "Let's Build a Listening Culture That Lasts."
- "No more guesswork. Just a fast, clear plan to strengthen engagement every day."

---

## Step 3 — Output

Deliver as clearly labelled sections:
```
## Hero
## Social Proof Bar
## Problem Section
## Features Section
## Case Study
## Integrations & Compliance
## Closing CTA
```

Include screenshot placement notes:
`[SCREENSHOT: filename.png — alt: "Vantage Pulse [description]"]`

---

## Quality Checklist

- [ ] CLAUDE.md read before writing
- [ ] Every stat from approved source — no fabrication
- [ ] Hero headline is specific and punchy — no vague claims
- [ ] Feature names match exact in-product UI labels from screenshots
- [ ] AccessOne proof point included with correct attribution
- [ ] Cassidi Ross quote used verbatim
- [ ] Closing CTA uses an approved pull quote
- [ ] Integrations and compliance sections present
- [ ] No em-dashes — split into two sentences
- [ ] No "gamification" language
- [ ] Screenshot references matched correctly to features
- [ ] Comparison table only on comparison page type
