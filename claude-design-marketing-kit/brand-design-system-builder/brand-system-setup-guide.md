# Brand System Setup Guide

Reference material for `brand-design-system-builder`. Covers how Claude Design's native Design Systems feature works, fallback patterns for users without access, a color theory primer for marketers, typography pairing recommendations, and known limitations.

---

## Claude Design Design Systems — how it works

Claude Design launched April 17, 2026 with a feature called **Design Systems**. In practice:

- Available on Pro, Max, Team, and Enterprise plans. **Not available on the free tier.**
- You create a Design System by uploading brand assets (logo, color samples, reference designs, PDF brand guidelines) and providing a text description of the brand.
- Once set up, every asset you generate in Claude Design inherits the system — colors, type, voice, layout conventions — without having to respecify per prompt.
- The system learns from uploaded examples. Uploading 3-5 "things that feel on-brand" significantly improves output consistency compared to text-only setup.

**What to upload for best results:**
- Logo (PNG with transparency, or SVG)
- 1-2 reference designs from the brand (recent landing page screenshots, approved decks)
- Any existing brand guideline PDF
- Customer case study designs (if the brand has a consistent one)

Claude reads these as examples during generation. More coverage = more consistency.

---

## Free-tier fallback: the "brand block" pattern

Users without Claude Design access still benefit from this skill — the `brand.md` file becomes a **manual brand block** they paste into every Claude Design prompt (or every Claude Artifact, or every Claude Code generation).

Pattern: at the top of every downstream skill's output prompt, include:

```
**Brand context (apply to this design):**
<contents of brand.md>
```

This is less automatic but works across any Claude surface. Downstream skills in this pack handle this automatically when the user has a `brand.md` file — no manual pasting required once the brand skill has been run.

---

## Color theory primer (for marketers who don't want to go deep)

### The 60/30/10 rule

Most well-designed marketing assets follow roughly:
- **60%** neutral / background (off-whites, dark navys, pale grays)
- **30%** primary brand color (in headings, fills, hero zones)
- **10%** accent (CTAs, highlights, data callouts)

If the user picks an accent color, cap its usage at 10% of the visual weight. The accent is a pointer, not wallpaper.

### Complementary vs. analogous palettes

- **Complementary** (opposite on the color wheel, e.g., deep navy + signal orange) = high contrast, high energy. Works for bold B2B brands (Gong, Ramp).
- **Analogous** (neighbors on the wheel, e.g., deep blue + teal + green) = harmonious, calmer. Works for healthcare, wellness, financial services.
- **Monochromatic + accent** (neutrals + one bold color) = sophisticated, easy to maintain. Works for most B2B SaaS (Linear, Vercel, Attio).

### WCAG contrast for marketing

Minimum contrast ratios for accessible marketing:
- **Body text:** 4.5:1 against background (WCAG AA)
- **Large text (18pt+):** 3:1
- **CTAs and buttons:** 3:1 minimum, aim for 4.5:1

If the user picks a mid-tone color for text or CTA, warn them and suggest a darker/lighter variant.

### Picking colors when the user says "pick for me"

Propose 3 options, each tied to a brand archetype. Example responses:

**If audience is technical / dev-focused:**
1. Deep navy (#0A1F44) + off-white (#F9FAFB) + signal orange (#FF5A36) — "Linear/Vercel energy"
2. Forest green (#0F3D2E) + cream (#FFF8E7) + gold (#D4A017) — "Grounded, premium"
3. Charcoal (#1A1A1A) + pale ice (#E8F0FE) + electric blue (#3366FF) — "Modern, high-tech"

**If audience is sales / revenue leaders:**
1. Navy (#0D1F3C) + sand (#F2EADF) + amber (#F59E0B) — "Confident, warm"
2. Slate (#334155) + pale blue (#DBEAFE) + crimson (#DC2626) — "Sharp, urgent"
3. Dark teal (#0F766E) + off-white (#FAFAF9) + coral (#FB7185) — "Distinctive, approachable"

**If audience is marketing leaders:**
1. Deep purple (#4C1D95) + lavender (#EDE9FE) + magenta (#DB2777) — "Creative, bold"
2. Black (#000000) + white (#FFFFFF) + one bright accent chosen by the user — "Editorial, high-signal"
3. Burgundy (#7F1D1D) + cream (#FEF3C7) + gold (#D97706) — "Premium, established"

Always let the user pick. Never default without asking.

---

## Typography pairing recommendations

6 pairings by brand archetype. Each pairing gets one line describing its vibe.

| Pairing | Vibe | Good for |
|---|---|---|
| **Inter + Inter** | Modern SaaS, clean, neutral | Most B2B SaaS — safest default |
| **IBM Plex Sans + IBM Plex Serif** | Enterprise, trustworthy, technical | Enterprise software, fintech, security |
| **Merriweather + Source Sans** | Authoritative, editorial, thoughtful | Research, advisory, thought leadership |
| **Playfair + Nunito** | Editorial, premium, distinctive | Brand-heavy categories, design-forward |
| **Poppins + Lora** | Friendly, approachable, readable | SMB tools, HR/people tech, wellness |
| **JetBrains Mono (accents) + Inter** | Technical, dev-focused, data-forward | Developer tools, dev platforms, analytics |

**Rules of thumb:**
- Serif + sans pairing = more editorial feel
- Same-family (Inter + Inter) pairing = cleaner, lower-friction, faster to produce
- If the user picks a display serif (Playfair), default body to a warm sans (Lora or Nunito) — hard-edged body sans fights the display
- JetBrains Mono only for code blocks and data callouts, never body copy

---

## Known limitations (as of April 2026)

1. **Research preview status.** Claude Design launched April 17, 2026 and is explicitly labeled a research preview. Features may change, rate limits may shift, the Design Systems feature may be refined.

2. **Token cost.** Community reports (Reddit r/ClaudeAI) indicate a single complex design can consume 30-50% of a Pro user's daily usage. Expect to generate 2-4 complex assets per day on Pro before hitting limits. This skill's downside impact: the brand setup runs once but shouldn't be re-run casually.

3. **Free-tier exclusion.** The Claude Design product and Design Systems feature are not available on the free tier. The fallback pattern above works but loses the "learn from examples" advantage.

4. **Logo generation.** Claude Design can generate text-based wordmarks reasonably well. For more complex logos (symbols, icon-mark combos), expect 3-5 iterations to get something usable, or bring an existing logo.

5. **Handoff to Claude Code.** Claude Design supports handoff to Claude Code for code generation (HTML/React/Tailwind). This works well for landing pages but has more variance for complex app UIs. Downstream skills (`campaign-landing-page-builder`, `animated-ui-mockup-builder`) rely on this handoff.
