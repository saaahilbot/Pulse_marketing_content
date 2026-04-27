---
name: brand-design-system-builder
description: Use when asked to set up a brand design system in Claude, define brand guidelines for Claude Design, or configure brand consistency across marketing assets. Flagship skill of the Claude Design Kit for B2B Marketers — sets up a brand.md file that downstream skills (sales decks, landing pages, ads, carousels, thumbnails, etc.) read to keep every output on-brand.
---

# Brand Design System Builder

## When to use this skill

- First time setting up the Claude Design Kit for B2B Marketers (run this before any other skill in the pack)
- Brand refresh or rebrand — re-run to update the brand.md that downstream skills ingest
- Working for multiple clients or brands — re-run per brand and swap brand.md before each project

## What this skill produces

Two artifacts:

1. **`brand.md`** — saved to `~/.claude/skills/brand-design-system-builder/outputs/brand.md`. This is the source of truth every downstream skill in the pack reads to keep every deliverable on-brand.
2. **Claude Design setup prompt** — a paste-ready block of instructions for configuring Claude Design's native **Design Systems** feature with your brand assets. Requires Claude Pro, Max, Team, or Enterprise.

## Workflow

1. Read `brand-system-setup-guide.md` in this skill folder for color/type fallback rules and the setup prompt template.
2. Ask the 8 intake questions below, **one at a time**. Do not move on until each is answered.
3. If the user says "pick for me" for colors or typography, consult the reference file and propose 3 options with rationale; let the user pick one.
4. Construct `brand.md` using the schema below.
5. Create the output directory if missing: `mkdir -p ~/.claude/skills/brand-design-system-builder/outputs`
6. Write `brand.md` to `~/.claude/skills/brand-design-system-builder/outputs/brand.md`.
7. Construct the Claude Design setup prompt using the template in the reference file, with the user's brand inputs substituted in.
8. Present both artifacts to the user and walk them through the 3-step Claude Design Design Systems setup (upload assets → paste prompt → review). Note that users without Claude Design access will fall back to pasting the brand block into every prompt manually.
9. Run the quality checklist.

## Intake

Ask these 8 questions, **one at a time**. Do not batch.

1. **Brand name + one-line description.** (e.g., "Acme — revenue intelligence platform for mid-market B2B sales teams")
2. **Logo.** File path, URL, or "text-only" if you don't have a logo yet (I can design a wordmark in Claude Design).
3. **Primary + secondary colors.** Hex values, or say "pick for me" and I'll propose 3 palettes grounded in your brand archetype.
4. **Typography preference.** Specific pairing (e.g., "Inter + Inter"), or say "pick for me" and I'll propose 3 pairings.
5. **Voice & tone.** 3-5 adjectives (e.g., "direct, pragmatic, slightly irreverent").
6. **3-5 brands you admire visually.** This anchors the aesthetic direction more than abstract words do.
7. **Things to avoid.** Visual patterns, colors, competitor aesthetics, tropes (e.g., "no gradients, no stock photography, no abstract AI brain visuals").
8. **Target audience.** Industry, role, seniority (e.g., "VP Sales + RevOps at B2B SaaS companies, 200-1000 employees").

## Output format: `brand.md`

```markdown
---
brand_name: <name>
description: <one-line description>
last_updated: <YYYY-MM-DD>
---

# <Brand Name>

## Logo
<file path, URL, or "text-based wordmark — design in Claude Design">

## Colors
- **Primary:** `#HEX` — <name, usage note>
- **Secondary:** `#HEX` — <name, usage note>
- **Accent:** `#HEX` — <name, usage note>
- **Neutrals:**
  - Text: `#HEX`
  - Muted: `#HEX`
  - Background: `#HEX`

## Typography
- **Display + headings:** <font name>
- **Body:** <font name>
- **Code/data callouts (optional):** <font name>

## Voice & Tone
<3-5 adjectives + one-sentence elaboration>

## Brands Admired
- <brand 1> — <what about it>
- <brand 2> — <what about it>
- <brand 3> — <what about it>
- <brand 4> — <what about it>
- <brand 5> — <what about it>

## Avoid
- <pattern 1>
- <pattern 2>
- <pattern 3>

## Target Audience
<industry, role, seniority, any other qualifiers>

## Usage Notes (for downstream skills)
- Use the accent color for CTAs and key highlights only — not large areas.
- Lead with <tone adjective> voice in short copy; soften to <tone adjective> in long-form.
- Avoid stretching the logo; minimum clear space = <logo height>.
```

## Output format: Claude Design setup prompt

After writing `brand.md`, present this paste-ready prompt block to the user. They open `claude.ai/design`, go to Design Systems, click "New Design System", and paste:

```
I'm setting up a brand design system for <brand_name>.

**Brand:** <brand_name> — <description>

**Colors:**
- Primary: <hex>
- Secondary: <hex>
- Accent: <hex> (use for CTAs and highlights only)
- Text: <hex>
- Muted: <hex>
- Background: <hex>

**Typography:**
- Display + headings: <font>
- Body: <font>

**Voice:** <3-5 adjectives>

**Visual principles:**
- Admire: <list of admired brands>
- Avoid: <list of avoids>

**Audience:** <audience>

When I generate any asset in this Design System, match these brand rules exactly. Apply the accent color sparingly. Default to clean, modern, information-dense layouts unless I specify otherwise.
```

Tell the user to also upload their logo file (if they have one) in the Design Systems asset uploader.

## Quality checklist

Before declaring the skill complete, verify:

- [ ] All 8 intake questions were answered (not skipped or left vague)
- [ ] `~/.claude/skills/brand-design-system-builder/outputs/` directory exists
- [ ] `brand.md` was written to that directory with the full schema
- [ ] Colors all have valid hex values (6-character, prefixed with `#`)
- [ ] At least one "brand admired" has a specific reason attached
- [ ] Claude Design setup prompt is paste-ready (all placeholders filled)
- [ ] User knows the 3-step Claude Design setup (upload → paste prompt → review)
- [ ] User knows where `brand.md` lives and that downstream skills will read it automatically

## Related

- `brand-system-setup-guide.md` — color theory, type pairings, Claude Design Design Systems walkthrough, free-tier fallback pattern
- All downstream skills in this pack read `~/.claude/skills/brand-design-system-builder/outputs/brand.md` if present
