---
name: blog-featured-image-generator
description: Use when asked to create a blog featured image, blog hero, or in-post section graphics for B2B SaaS content. Produces a blog hero (1200x630), a social-share variant (1200x1200), and optionally 3 in-post section graphics — all on-brand, via a single Claude Design prompt.
---

# Blog Featured Image Generator

## When to use this skill

- Producing the hero image for a new blog post
- Creating a social-share variant of an existing blog hero
- Generating in-post section graphics for long-form content
- Establishing a consistent visual identity across a blog
- Refreshing the hero images on top-performing blog posts

## What this skill produces

Two artifacts:

1. **Concept description** — style archetype choice, color treatment, composition, any required elements
2. **Claude Design prompt** — paste-ready block that generates the blog hero + social-share variant (and optionally 3 in-post graphics) in one canvas

## Workflow

1. **Brand lookup.** Read `~/.claude/skills/brand-design-system-builder/outputs/brand.md`. If missing, collect brand basics first.
2. Read `featured-image-patterns.md` in this skill folder.
3. Ask the 5 intake questions, **one at a time**.
4. Based on user style preference (Q3) and post category (Q2), select a style archetype from the reference file.
5. Draft the concept — composition, color treatment, any text overlay, metaphor if applicable.
6. Construct the Claude Design prompt. Include blog hero (1200x630) + social-share variant (1200x1200) mandatorily, plus 3 in-post graphics if user asked.
7. Present concept + prompt. Remind user that editorial consistency across a blog beats variety on any single post.
8. Run the quality checklist.

## Intake

Ask these 5 questions, **one at a time**.

1. **Post title.** The actual title of the post, exactly as it will appear.
2. **Post category / topic area.** What section of the blog? (Revenue ops, demand gen, customer stories, product launches, thought leadership, etc.) Editorial consistency is per-category, not per-post.
3. **Style preference.** Illustration (friendly, metaphor-driven), photo (editorial, real), abstract (geometric, gradient-free), or geometric (Linear/Ramp style)?
4. **Platforms the image will appear on.** Blog hero only, or also social share cards (LinkedIn, X, Meta), and/or newsletter hero?
5. **Required elements.** Logo presence? Text overlay? Specific icons or symbols? Anything the image must include?

## Output format: concept description

```
## Concept: <post title>

**Style archetype:** <chosen archetype from reference file>
**Primary color:** <brand color>
**Composition:** <describe the layout — where the focal point is, supporting elements, negative space>
**Metaphor (if applicable):** <what concept the visual represents — e.g., "broken pipeline → fixed pipeline" shown as abstract shapes>
**Text overlay:** <yes/no + what it says if yes>
**Required elements:** <logo? icons? specific symbols?>
```

## Output format: Claude Design prompt

```
Generate a blog hero image + social share variant for the following post. Render both side-by-side in one canvas.

**Post:** "<title>"
**Category:** <category>

**Brand context:**
<full contents of brand.md>

**Concept:**
<inline concept description above>

**Specs:**
- **Blog hero:** 1200x630, landscape. Optimized for blog post top-of-page display + Open Graph share cards.
- **Social share variant:** 1200x1200, square. Optimized for LinkedIn feed + Twitter/X. More visually dense (competes in feed) and includes text overlay if the hero doesn't.
<if user requested in-post graphics:>
- **In-post section graphics (3):** 1200x600, landscape. Each represents a major section of the post. Lighter visual weight than the hero — supporting, not competing.

**Design principles:**
- Hero is clean and generous with whitespace — it lives on-page, reader will see it long enough to register
- Share variant is denser and more text-forward — it competes in 2-3 seconds of feed scroll
- Editorial consistency across this blog category — match the style archetype, not invent a new one
- Text overlay (if any) must be high-contrast and readable at 300px wide
- No stock photography unless style is explicitly "photo" archetype
- No soft gradients — they read as low-effort or AI-generated

Generate all variants in one pass.
```

## Quality checklist

- [ ] All 5 intake questions answered
- [ ] Brand lookup completed
- [ ] Style archetype chosen (not free-form)
- [ ] Hero is 1200x630, social is 1200x1200 (standard specs)
- [ ] If social variant has text overlay, text is high-contrast and ≤6 words
- [ ] Concept is specific — focal point, composition, metaphor if applicable
- [ ] Required elements (logo, icons, etc.) are explicitly included in prompt
- [ ] Prompt includes editorial consistency reminder (match blog category style)
- [ ] User knows to test text legibility at 300px wide for share cards

## Related

- `featured-image-patterns.md` — 5 style archetypes, hero vs. share variant differences, text-on-image rules, editorial consistency principles
- Pairs with `youtube-thumbnail-designer` (if blog has video companion), `linkedin-carousel-designer` (if content is being repurposed to carousel)
