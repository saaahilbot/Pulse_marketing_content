# Landing Page Patterns

Reference material for `campaign-landing-page-builder`. Covers B2B SaaS landing page anatomy, hero formulas, conversion benchmarks, A/B testing priorities, and common mistakes.

---

## B2B SaaS Landing Page Anatomy

The 7-section structure used by this skill is a distillation of what works across high-converting B2B SaaS pages. Each section has a job.

| Section | Job | Time user spends |
|---|---|---|
| 1. Hero | Answer "am I in the right place?" and "do I want what you're selling?" in 3 seconds | 3s |
| 2. Problem | Trigger "yes, that's my pain" recognition | 5s |
| 3. Solution Bridge | Show the gap closure — how the offer moves them from pain to outcome | 10s |
| 4. Value Proof (outcomes) | Concrete benefits that justify the cost of conversion | 15s |
| 5. Social Proof | De-risk the decision — "people like me use this" | 10s |
| 6. Objection Handler | Address the 2-3 reasons they'd otherwise bounce | 15s |
| 7. CTA Block | Recapture attention + provide the conversion mechanism | 10s |

Total read time for a high-intent user: ~60-70 seconds. Low-intent users will bounce at Section 1-3. That's fine — the page is optimized for high-intent conversion.

---

## Hero Formulas

Three formulas, matched to campaign objective.

### Outcome-Led (for demo requests, competitive campaigns)

```
H1: <Specific outcome the buyer wants>
Subhead: <How you deliver it + audience qualifier>
CTA: "Book a demo"
```

**Example:**
- H1: "Know which deals will close before your CEO asks."
- Subhead: "[Your brand] is the revenue intelligence platform for mid-market B2B sales teams — real forecasts, no pipeline theatre."
- CTA: "Book a demo"

### Problem-Led (for content downloads, diagnostic offers)

```
H1: <Punchy problem statement or rhetorical question>
Subhead: <What the downloadable offers>
CTA: "Get the <asset type>"
```

**Example:**
- H1: "73% of your pipeline is fake. The other 27% isn't labeled."
- Subhead: "Download The Pipeline Reality Check — a 15-point diagnostic that revenue leaders run quarterly."
- CTA: "Get the diagnostic"

### Category-Led (for free trials, established category plays)

```
H1: "The <category descriptor> for <audience>"
Subhead: <Differentiation from category norm>
CTA: "Start free" or "Try it free"
```

**Example:**
- H1: "The revenue intelligence platform for mid-market."
- Subhead: "Enterprise-grade forecasting without the enterprise timeline or price tag. Live in a week."
- CTA: "Start free"

---

## Conversion Benchmarks (2026 B2B SaaS)

Numbers expressed as ranges because conversion varies massively by category, brand recognition, and traffic source. Ranges reflect 25th-75th percentile performance.

| Page type | Expected conversion range | Red flag |
|---|---|---|
| Demo request (direct traffic, brand-aware) | 3-7% | <1.5% |
| Demo request (paid ad click traffic) | 1-3% | <0.5% |
| Free trial (direct) | 5-15% | <2% |
| Content download (gated) | 10-25% | <5% |
| Webinar registration | 15-35% | <8% |

**Sources:** WordStream Conversion Benchmarks 2025, Unbounce B2B Conversion Report, Databox B2B SaaS benchmarks.

If a user is below the red flag range, the page is broken — go back to hero, CTA, and form friction first.

---

## Mobile-First Considerations

Roughly 30-50% of B2B landing page traffic is now mobile (higher for content downloads, lower for demo requests). Non-negotiables:

- Hero H1 readable at 375px width without scrolling horizontally
- Primary CTA tappable (min 44x44px touch target) and visible above the fold on mobile
- Form fields stack vertically, not side-by-side
- Logo bar in Section 5 scrolls horizontally on mobile (don't shrink logos to unreadable size)
- FAQ accordions collapse by default on mobile

---

## A/B Testing Priorities

Rank order for where to test first (assuming you have the volume to run tests at all — most campaigns don't).

1. **Hero H1** — largest impact on conversion. Test outcome-led vs. problem-led framing.
2. **CTA copy** — "Book a demo" vs. "Get a live walkthrough" vs. "See it in action"
3. **Form length** — can you cut fields without sales losing qualification?
4. **Proof placement** — logo bar near top vs. dedicated section 5
5. **Page length** — short (hero + proof + CTA) vs. long (all 7 sections)

**Don't test:** colors, button shapes, micro-copy on secondary elements. Impact too small to be significant.

---

## Common Mistakes to Avoid

- **Form too long.** 6+ fields for a content download kills conversion. Ask for email + role and enrich the rest.
- **CTA hidden.** Primary CTA should be visible above the fold on both desktop and mobile.
- **Hero is too clever.** "We built the Tesla of sales tools" makes the user stop to decode. Be clear before you're clever.
- **Proof is generic.** "Trusted by the world's best companies" without logos or quantified outcomes is worthless.
- **Multiple competing CTAs above the fold.** One primary, one optional secondary. Not three.
- **FAQ answers are defensive.** If you're addressing an objection, answer it directly, not in marketing-speak.
- **Stock photography.** Anything photorealistic and generic actively hurts — people register it as "corporate nothing."
- **No page-speed consideration.** Above-fold content should render in <2 seconds. Hero videos are usually a mistake for landing pages.
