# Blog Featured Image Patterns

Reference material for `blog-featured-image-generator`. Standards, archetypes, text-on-image rules, and editorial consistency principles.

---

## B2B Blog Hero Conventions

- **Standard dimensions:** 1200x630 pixels. This is also the Open Graph (og:image) standard, so the blog hero doubles as the default share card.
- **Aspect ratio:** 1.91:1.
- **Safe zone:** Critical elements (logo, main text, focal point) stay within the center 80%. Social platforms crop edges on some devices.
- **File size:** Compress to <200KB for web performance. Use WebP or well-optimized JPEG.

The blog hero serves two jobs simultaneously:
1. On-page introduction (sets tone, signals topic, hooks reader)
2. Social share card (competes in a LinkedIn/X/Facebook feed)

A 1200x1200 social-share variant is ideal because LinkedIn and X prioritize square/taller cards in feed over the 1.91:1 landscape format.

---

## 5 Style Archetypes

Editorial consistency across a blog matters more than visual variety. Pick one archetype per category and stick to it.

### 1. Abstract Geometric (Ramp, Linear, Vercel style)

**Look:** Bold geometric shapes, flat fills, strong brand colors, no gradients, generous whitespace. Shapes often hint at a concept without being literal.

**When to use:** Tech-forward categories (product, engineering, dev-focused). B2B SaaS default.

**Example direction:** Post about "pipeline diagnostic" → three overlapping bold circles in brand colors, suggesting stages of a pipeline without being literal. No chart, no mockup, just geometry.

### 2. Illustrated Metaphor (Intercom, Clearscope, HelpScout style)

**Look:** Custom flat illustration, metaphor-led, usually 2-3 brand colors + 1-2 supporting tones. Friendly tone.

**When to use:** Customer success, education, how-to content. Anywhere warmth helps.

**Example direction:** Post about "onboarding playbook" → illustrated hand-drawn path with numbered markers, character figure walking it. Approachable, friendly.

### 3. Photo with Overlay (Gong, HubSpot style)

**Look:** High-quality editorial photo as backdrop, brand-color overlay at 30-60% opacity, text and logo overlaid. Feels journalistic.

**When to use:** Customer stories, industry commentary, executive voice content.

**Caveat:** Requires real photography or well-sourced stock that doesn't scream "stock." If you don't have access to quality photos, skip this archetype.

### 4. Data-Viz Inspired (Mode, Amplitude, Stripe long-form style)

**Look:** Stylized chart, graph, or dashboard screenshot as the visual anchor. Usually cleaned up for editorial (real data or plausible-looking mock data), brand colors applied.

**When to use:** Research content, benchmark posts, data-driven thought leadership.

**Example direction:** Post about "B2B pipeline benchmarks" → stylized bar chart showing "fake vs. real" pipeline, brand colors, clean type.

### 5. Typographic (Stripe long-form, Figma blog style)

**Look:** Type IS the hero. Oversized headline treatment as the visual, minimal supporting graphics. Feels editorial, premium, content-forward.

**When to use:** Thought leadership, opinion pieces, manifesto-style content.

**Example direction:** Post about "stop reporting pipeline" → oversized "STOP" in display type, brand-colored background, subtle underline or strikethrough graphic.

---

## Hero vs. Social Share Card Differences

Same post, two images, different jobs.

| Aspect | Blog Hero (1200x630) | Social Share (1200x1200) |
|---|---|---|
| Where it lives | Top of blog post, reader already on-page | Feed / search results / DMs |
| Goal | Set tone, signal topic | Stop scroll, earn click |
| Text density | Light or none (title is above in HTML) | Text overlay often required |
| Visual density | Generous whitespace | Denser, more elements |
| Focal point | Can be abstract, metaphorical | Must be clear in 2-3 seconds |
| Time to decode | 5-10 seconds | 2 seconds max |

Practical implication: the blog hero can be more subtle. The share card needs to work harder.

---

## Text-on-Image Rules

If adding text overlay to the share card:

- **≤6 words.** If you need more, rethink.
- **High contrast.** Text must pass WCAG AA against its immediate background (4.5:1 for body-size text, 3:1 for very large display type).
- **Font weight: bold or black.** Regular weights read as unstable over images.
- **Sans-serif for legibility at small sizes.** Unless your brand is serif-heavy and you've tested legibility.
- **Safe zone.** Keep text at least 80px from the edges.
- **Readable at 300px wide.** Same mobile test as thumbnails.

**When NOT to add text overlay:**
- The post title is already strong and appears in the social card preview (many platforms pull <title>)
- The image is metaphor-driven and text would compete with the visual
- Your brand style is minimalist — don't break it for one post

---

## Editorial Consistency Across a Blog

The most common mistake: every post gets a different visual style. This makes the blog feel inconsistent and lowers brand recognition.

**Rule:** Pick one style archetype per blog category. Apply consistently across all posts in that category.

**Example category → archetype mapping:**
- Customer Stories → Photo with Overlay (archetype 3)
- Research & Benchmarks → Data-Viz Inspired (archetype 4)
- How-To / Tactical → Illustrated Metaphor (archetype 2)
- Thought Leadership / Opinion → Typographic (archetype 5)
- Product Updates → Abstract Geometric (archetype 1)

When a new post is commissioned, check the category first and inherit the archetype.

---

## Common Mistakes to Avoid

- **Stock photography that screams "stock."** Handshakes, diverse-team-at-laptop, business-people-in-suits. Instant signal of low effort.
- **Soft gradients.** Read as low-effort or AI-generated. Skip unless gradient is a specific brand decision.
- **Inconsistent style across posts.** Each post looking "unique" ≠ good design. Consistency wins.
- **Logo as focal point.** The brand is already signaled by the blog URL; don't waste hero space on it.
- **Illegible text overlay.** If you have to squint, it's too small or too low-contrast.
- **Complex composition.** 1200x630 isn't a lot of space. One focal point, clear hierarchy.
- **Full-bleed brand color with no content.** Looks like a placeholder, not a hero.
