# UI Animation Patterns

Reference material for `animated-ui-mockup-builder`. Four common B2B UI animation patterns, motion principles, platform embedding guidance, and performance guardrails.

---

## 4 Common B2B UI Animation Patterns

Every B2B SaaS animated mockup is usually one of these four patterns. Match the pattern to the feature you're showing.

### 1. Data Populating

Rows, cards, or data points fade in sequentially as if the system is "loading" them.

**What it suggests:** Real-time data, live system, AI processing.

**Typical sequence:**
- t=0: empty table / dashboard shell visible
- t=0.3s: first row fades in with a soft slide-up
- t=0.5s: second row fades in (staggered 200ms)
- t=0.7s: third row
- ... up to 5-7 rows
- t=2.5s: optional subtle highlight on the "winning" row
- Loop: fade everything out simultaneously, reset, repeat

**Good for:** Dashboards, analytics tools, lead lists, deal lists.

### 2. Card/Dashboard Reveal

A dashboard or card grid reveals section by section with a staggered slide-in.

**What it suggests:** Comprehensive view, unified data, polished product.

**Typical sequence:**
- t=0: page shell visible (logo, nav, empty canvas)
- t=0.5s: main KPI card slides in from below
- t=0.8s: 3 supporting metric cards slide in with stagger (100ms between)
- t=1.5s: chart or larger visualization animates in
- t=2.5s: final "overview" state settles
- Loop: fade out, reset

**Good for:** Homepage hero for dashboard products, landing page animations.

### 3. Pipeline Flowing

Items move through stages — deals through a sales pipeline, tasks through a workflow, candidates through a funnel.

**What it suggests:** Process automation, progression, visibility into flow.

**Typical sequence:**
- t=0: empty pipeline with 3-5 stages shown
- t=0.5s: first item appears at stage 1
- t=1s: first item moves to stage 2 (second item appears at stage 1)
- t=1.5s: movements continue — staggered flow
- t=3s: pipeline is populated across all stages
- Loop: newest items slide out of final stage, new items enter at stage 1

**Good for:** Sales pipeline tools, workflow automation, task management.

### 4. State Change (Toggle / Loading → Success)

A specific UI state changes — a toggle flips, a form submits and shows success, a button transforms from loading to completed.

**What it suggests:** Responsive interaction, polish, clear feedback.

**Typical sequence:**
- t=0: button in default state
- t=0.5s: user "clicks" (simulated — cursor appears briefly)
- t=0.6s: button transitions to loading state (spinner or pulse)
- t=1.5s: loading completes, button morphs to success state (checkmark, color change)
- t=3s: settles on success state
- Loop: fade back to default, repeat

**Good for:** Specific feature callouts, form submission demos, interaction spotlights.

---

## Motion Principles

These rules apply regardless of pattern. Violating them makes animations feel "off" even when you can't articulate why.

### Easing

- **Enters (things appearing):** `ease-out` or `cubic-bezier(0.16, 1, 0.3, 1)` (strong ease-out). Feels natural — things decelerate as they arrive.
- **Exits (things leaving):** `ease-in` or `cubic-bezier(0.7, 0, 0.84, 0)` (strong ease-in). Things accelerate as they leave.
- **Continuous motion (flows, loops):** `ease-in-out` or `linear` depending on context.
- **Springs (playful feel):** Use sparingly. Spring physics are eye-catching but can feel juvenile for enterprise products.

### Duration

- **Micro-interactions (button hover, toggle flip):** 100-200ms
- **Component enters (cards, rows appearing):** 200-400ms
- **Section reveals (full panels, large data blocks):** 400-600ms
- **Full hero animations (complete sequence):** 3-6 seconds total
- **Loop resets:** 300-500ms fade before restart

### Stagger

When animating multiple items (3 cards, 5 rows), stagger them 50-100ms apart. Too-synchronized feels mechanical. Too-staggered feels slow.

**Example:** 3 cards animating in — t=0, t=0.1s, t=0.2s. Each card's animation takes 400ms, so full sequence is 0.8s total.

### Reduced Motion

Respect `prefers-reduced-motion: reduce`. Users who've set this at OS level should see the final state statically without animation. It's a one-liner in CSS:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Platform Embedding Guidance

### Webflow

- Upload the HTML as a code embed (`</>`) component
- Or host on a subdomain and iframe it
- Webflow's native animations aren't this powerful — embed is the path

### Framer

- Similar to Webflow — use a Code Component or iframe embed
- Framer's Motion library can do this natively if you're comfortable writing React

### Raw HTML / Static site (Ghost, WordPress, Jekyll)

- Drop the HTML directly into a post/page
- Or host the file separately and iframe it

### Notion

- Notion doesn't support arbitrary HTML directly
- Options: (a) iframe embed via a third-party (e.g., `indify.co`), (b) screen-record the HTML animation as MP4 and upload the video, (c) link out to a hosted page

**Recommendation:** For Notion, prefer MP4 — guaranteed playback, no embed dependencies.

### Landing pages / product marketing sites

- Direct HTML embed is cleanest (no iframe overhead, no cross-origin issues)
- Critical: lazy-load the animation below the fold. If it's above the fold, ensure total file size <200KB for page-speed budget.

### Social media (LinkedIn, X)

- HTML doesn't play natively on social
- Screen-record the animation as MP4, upload the video
- For LinkedIn: 1080x1080 or 1080x1350 vertical crop works best

---

## File Size & Performance Guardrails

- **Target file size:** <500KB total (HTML + CSS inline)
- **If using fonts:** Google Fonts link adds ~50-100KB. Consider system fonts if file-size-constrained.
- **No GSAP for simple animations.** CSS keyframes and transitions handle 90% of cases and add zero bytes beyond the CSS itself.
- **Use GSAP only when:** timeline coordination across many elements is needed, or you need programmatic control (e.g., user-triggered replays).
- **Lazy-load below-fold animations.** Use Intersection Observer to trigger the animation only when in viewport. Saves initial page load time.

---

## Out-of-Scope Tools (Recommend Instead)

This skill creates **mockup animations** — fake UIs in motion. For real product use cases:

| Use case | Recommended tool |
|---|---|
| Record the actual product UI | **Arcade** (interactive demos) |
| Narrated video walkthrough | **Loom** |
| Complex branching product tours | **Navattic** or **Storylane** |
| In-app product onboarding | **Intro.js**, **Appcues**, **Userpilot** |
| Polished explainer video with voice | Use a video production service |

---

## Common Mistakes to Avoid

- **Too long.** 6+ second animations lose attention. Keep to 3-5s hero, loop.
- **Too busy.** Too many elements animating simultaneously reads as chaos.
- **Wrong easing.** Linear motion throughout feels robotic. Always ease-out for enters.
- **Inconsistent loop.** If the loop has a jarring jump back to start, fade out first.
- **Brand color on everything.** Restraint reads as premium. One accent color on one element.
- **Fake data that looks too fake.** "Company name: Acme Inc." reads as template. Use plausible fictional data or real customer names (with permission).
- **Autoplay audio.** Never. Ever.
