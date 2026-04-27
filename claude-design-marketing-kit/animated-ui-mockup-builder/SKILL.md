---
name: animated-ui-mockup-builder
description: Use when asked to build an animated UI mockup showing a product feature in motion — for landing page hero embeds, social posts, or product launches. Produces a standalone HTML/CSS animated mockup (and optionally a Lottie export) via Claude Code handoff. Not for recording real product screens — use Arcade or Loom for that.
---

# Animated UI Mockup Builder

## When to use this skill

- Product launch needs an animated hero for a landing page
- Social post needs a GIF/MP4 showing a feature in motion
- Pitch deck needs an embedded animated demo (Keynote/Google Slides support HTML embed poorly; save MP4 version)
- Showing a feature that doesn't exist yet (fake it until the real UI ships)
- You want to avoid recording the real product (no staging data, competitive secrecy, feature not built)

## When NOT to use this skill

- You have a working product and can record the real thing → use **Arcade** (interactive demos) or **Loom** (video)
- You need a complex branching demo → use **Navattic** or **Storylane**
- You need a full screen recording with narration → use Loom, ScreenFlow, or similar
- The goal is a realistic product walkthrough (users expect to see the actual UI) → don't fake it

## What this skill produces

Two artifacts:

1. **Concept description** — the animation sequence, timing, visual hierarchy, brand application
2. **Claude Code prompt** — paste-ready prompt for Claude Code to generate a standalone HTML file with CSS animations. Lightweight, no frameworks, embeddable anywhere.

## Workflow

1. **Brand lookup.** Read `~/.claude/skills/brand-design-system-builder/outputs/brand.md`. If missing, collect brand basics first.
2. Read `ui-animation-patterns.md` in this skill folder.
3. Ask the 6 intake questions, **one at a time**.
4. Based on user's interaction (Q2) and animation style (Q4), select an animation pattern from the reference file.
5. Draft the concept — sequence of states, timing, motion curves, visual elements.
6. Construct a Claude Code prompt that generates a standalone HTML file. Include brand tokens as CSS custom properties.
7. Present the concept + Claude Code prompt. User runs the prompt in a Claude Code session (temp directory is fine). Output is an HTML file that plays in any browser.
8. Provide embed guidance — Webflow, Framer, raw HTML, Notion (via iframe embed or screen recording to MP4 for broader compatibility).
9. Run the quality checklist.

## Intake

Ask these 6 questions, **one at a time**.

1. **Feature name + one-sentence description.** What feature is being demonstrated? (e.g., "Deal Reality Score — an AI-scored probability that a deal will close.")
2. **Core user interaction.** What's the one thing the animation shows happening? (e.g., "Cards fade in with scores that fill from 0 to the final value.")
3. **Platform context.** Web dashboard, mobile app, both?
4. **Animation style.** Subtle transitions (professional, restrained), attention-grabbing motion (energetic, eye-catching), or UI state change (toggle, loading → success)?
5. **Use context.** Landing page hero embed, social post, product launch asset, something else?
6. **Loop or one-shot.** Loop continuously (good for hero embeds, social posts) or play once (good for stepped walkthroughs)?

## Output format: concept description

```
## Animation Concept: <feature name>

**Pattern:** <chosen animation pattern from reference file>
**Duration:** <total animation time in seconds — usually 3-8s>
**Loop:** <yes/no>

**Sequence of states:**
1. **t=0s:** Initial state — what the viewer sees first
2. **t=0.5s:** First change — what begins animating
3. **t=1.5s:** Second change — next element
4. **t=3s:** Final state — what the viewer sees at the end of the loop/sequence

**Motion curves:**
- Enters: <ease-out or spring>
- Exits (if any): <ease-in>
- Stagger between elements: <ms>

**Visual elements:**
- <List the UI elements — cards, labels, icons, data bars, etc.>
- <Note which use brand color, accent color, neutral>

**Brand application:**
- Primary color: <where used>
- Accent color: <one highlight element>
- Typography: <Inter/display/whatever from brand.md>
```

## Output format: Claude Code prompt

```
Generate a standalone HTML file with CSS animations that creates an animated UI mockup. No frameworks — just HTML + CSS (and minimal inline JS only if necessary for loop control).

**File:** single `index.html`
**Size target:** <500KB including any inline assets
**Browser support:** Modern browsers (Chrome, Safari, Firefox) — no IE11 or legacy polyfills

**Brand tokens (use as CSS custom properties at `:root`):**
- --color-primary: <hex>
- --color-secondary: <hex>
- --color-accent: <hex>
- --color-text: <hex>
- --color-muted: <hex>
- --color-bg: <hex>
- --font-display: "<font>"
- --font-body: "<font>"

**Animation concept:**
<inline concept description above>

**Requirements:**
- Self-contained HTML file (all CSS inline in <style>, no external resources except a Google Fonts link if needed)
- Plays on page load (autoplays, no user interaction required)
- Loops seamlessly (if loop=true) with a natural reset moment — no jarring jump back to start
- Graceful fallback: if animations are disabled via `prefers-reduced-motion`, show the final state statically
- Semantic HTML (proper tags, ARIA labels where appropriate)
- Embeddable via `<iframe>` or via copy/pasting the HTML body into a host page
- Set viewport meta tag for mobile rendering

**Output:** one `index.html` file. I'll copy it to `examples/<name>.html` or embed it directly.
```

## Quality checklist

- [ ] All 6 intake questions answered
- [ ] Brand lookup completed
- [ ] Animation pattern chosen matches interaction and style
- [ ] Duration is 3-8 seconds (longer loses attention)
- [ ] Motion uses ease-out for enters, ease-in for exits (per reference)
- [ ] Brand color applied thoughtfully (not every element is brand color)
- [ ] Accent color used on ≤1 element
- [ ] HTML output is <500KB
- [ ] HTML file is self-contained (no external JS frameworks)
- [ ] Loop resets seamlessly OR one-shot ends on final state
- [ ] Embed guidance provided (at minimum: iframe, Webflow/Framer, raw HTML)
- [ ] If user needs MP4/GIF for wider compatibility, recommend screen recording the HTML to MP4 (Loom, QuickTime, CleanShot X)

## Related

- `ui-animation-patterns.md` — 4 common B2B UI animation patterns, motion principles, platform embedding guidance, file size targets
- Not paired closely with other skills — this is a specialty asset. Recommend using after `campaign-landing-page-builder` if the page needs a hero animation.
