---
name: doc-update
description: >
  Create or update a branded Vantage Circle / Vantage Pulse marketing collateral
  in Typst (.typ → PDF). Encodes the exact visual system, component library, and
  methodology used to build automated-lifecycle-surveys.typ — the canonical reference
  doc. Apply this skill whenever producing or editing any .typ-based PDF collateral.
user_invocable: true
arguments:
  - name: task
    description: >
      What to do. Examples: "create a new doc on [topic]", "update the lifecycle
      survey PDF to add a section on X", "add a new page to [file]", "change the
      header copy in [file]".
    required: true
  - name: file
    description: >
      Path to the existing .typ file relative to /Users/sahil/Desktop/marketing/,
      e.g. "collaterals/automated-lifecycle-surveys.typ". Omit when creating a new file.
    required: false
  - name: brand
    description: >
      "pulse" (default) or "vc". Controls which logo and color palette to use.
      Pulse = Vantage Pulse navy/orange. VC = same palette, different logo.
    required: false
---

# doc-update

Create or update a Vantage Circle / Vantage Pulse branded PDF collateral using Typst.

## Usage

```
/doc-update "create a new doc on employee onboarding survey best practices"
/doc-update "add a FAQ page to collaterals/automated-lifecycle-surveys.typ"
/doc-update "update the lifecycle survey PDF intro copy" file=collaterals/automated-lifecycle-surveys.typ
/doc-update "create a one-pager on eNPS for sales" brand=pulse
```

---

## Step 1 — Read Context Before Writing Anything

Read these files before touching any .typ source:

| File | What to pull from it |
|------|----------------------|
| `CLAUDE.md` | Approved stats, verified proof points, feature names, brand voice rules, personas |
| `VANTAGE_PULSE_FEATURE_LIST.md` | Exact feature names and capability descriptions |
| `collaterals/automated-lifecycle-surveys.typ` | **Canonical reference** — replicate its structure, tokens, and components exactly |

If editing an existing file, read it in full before making any changes. Never guess at what's there.

---

## Step 2 — Plan Structure First

Before writing Typst code, plan:

1. **Document title** — short, product-feature-led
2. **Page count** — typical range is 2–4 content pages + 1 closing stats page
3. **Page-by-page outline:**
   - Page 1: What it is + why it matters (the problem/value pitch)
   - Page 2: How it works (steps, screenshots, callouts)
   - Page 3+: Deep-dive, comparison tables, governance, FAQ (if needed)
   - Final page: Closing "Thank You" + full-bleed navy stats footer

Confirm the outline with the user before writing code if creating a new document.

---

## Step 3 — Brand Tokens (Copy Verbatim)

Always open every `.typ` file with this exact token block. Do not change the variable names or values.

```typst
// ─── Brand tokens ──────────────────────────────────────────────────────────
#let navy     = rgb("#29294C")
#let orange   = rgb("#FF6D05")
#let ghost    = rgb("#EEEEF6")
#let muted    = rgb("#6B6B8A")
#let dark     = rgb("#1C1C3A")
#let accent-l = rgb("#FFF3EB")
#let fs       = ("Helvetica Neue", "Arial")
```

**Never use Inter** — it is not installed system-wide. The fallback chain `("Helvetica Neue", "Arial")` is correct for all text.

---

## Step 4 — Page Setup (Copy Verbatim, Change Title Only)

```typst
// ─── Page ──────────────────────────────────────────────────────────────────
#set document(title: "YOUR DOC TITLE HERE", author: "Vantage Circle")
#set page(
  paper: "a4",
  margin: (top: 3.2cm, bottom: 2.8cm, left: 2.5cm, right: 2.5cm),
  background: [
    #place(top + left, rect(width: 100%, height: 2.4cm, fill: navy))
    #place(top + left, dy: 2.4cm, rect(width: 100%, height: 2.5pt, fill: orange))
    #place(top + left, dy: 0.86cm, dx: 2.5cm)[
      #image("../logos/Negative-VPulse.png", height: 0.68cm)
    ]
  ],
  header: block(height: 2.4cm)[],
  footer: [
    #line(length: 100%, stroke: 0.5pt + rgb("#D8D8E8"))
    #v(0.28cm)
    #grid(
      columns: (1fr, auto),
      align(left + horizon)[
        #text(font: fs, size: 8pt, fill: muted)[
          YOUR DOC TITLE HERE · #context counter(page).display()
        ]
      ],
      align(right + horizon)[
        #image("../logos/new-vc-logo.png", height: 0.44cm)
      ]
    )
  ]
)
```

**Logo paths** (relative from `collaterals/`):
- Pulse header logo: `../logos/Negative-VPulse.png`
- VC footer logo: `../logos/new-vc-logo.png`

**Critical:** The page counter must always be wrapped: `#context counter(page).display()` — never bare `#counter(page).display()`.

---

## Step 5 — Typography System (Copy Verbatim)

```typst
// ─── Typography ────────────────────────────────────────────────────────────
#set text(font: fs, size: 10.5pt, fill: dark, lang: "en")
#set par(leading: 0.72em, spacing: 1.6em, justify: false)
#set list(indent: 0.4em, body-indent: 0.65em, spacing: 0.5em)
#set enum(indent: 0pt, body-indent: 0pt, spacing: 0pt)

// H1: navy bold + short orange underline rule
#show heading.where(level: 1): it => [
  #v(0.2em)
  #stack(
    dir: ttb,
    spacing: 4pt,
    text(font: fs, size: 24pt, weight: "bold", fill: navy)[#it.body],
    rect(width: 2.6cm, height: 2.5pt, fill: orange, radius: 1.5pt)
  )
  #v(0.45em)
]

// H2: navy text + orange underline
#show heading.where(level: 2): it => [
  #v(0.9em)
  #stack(
    dir: ttb,
    spacing: 3pt,
    text(font: fs, size: 13pt, weight: "bold", fill: navy)[#it.body],
    rect(width: 1.8cm, height: 2pt, fill: orange, radius: 1pt)
  )
  #v(0.25em)
]
```

**Heading usage:**
- `=` (H1) — document title, used once at the top of Page 1 only
- `==` (H2) — section headers, used throughout
- Never use H3 (`===`) — use bold inline text instead if subdivision is needed

---

## Step 6 — Component Library

These three components are available in every doc. Copy them verbatim after the typography block.

### callout — ghost-fill box with left orange border

Use for: warnings, tips, Q&A, important constraints, "good to know" notes.

```typst
#let callout(body) = block(
  width: 100%,
  fill: ghost,
  radius: (right: 6pt, left: 0pt),
  inset: (left: 1.15em, right: 1.1em, y: 0.8em),
  stroke: (left: 3pt + orange),
  body
)
```

**Usage pattern:**
```typst
#callout[
  #text(weight: "bold", fill: orange)[Question or label here]
  #v(0.28em)
  Body text explaining the answer or tip.
]
```

### shot — macOS-style screenshot frame

Use for: all product screenshots. Always wrap screenshots in this component — never use `#image()` naked.

```typst
#let shot(path, cap: none, w: 88%) = {
  v(0.5em)
  align(center)[
    #block(width: w)[
      #block(
        fill: rgb("#EDEDF3"),
        stroke: 1pt + rgb("#DCDCE8"),
        radius: (top: 8pt, bottom: 0pt),
        inset: (x: 0.85em, y: 0.48em),
        width: 100%
      )[
        #grid(
          columns: (auto, auto, auto, 1fr),
          gutter: 0.38em,
          align(horizon)[#box(width: 7pt, height: 7pt, radius: 50%, fill: rgb("#FF5F57"))],
          align(horizon)[#box(width: 7pt, height: 7pt, radius: 50%, fill: rgb("#FEBC2E"))],
          align(horizon)[#box(width: 7pt, height: 7pt, radius: 50%, fill: rgb("#28C840"))],
          []
        )
      ]
      #block(
        stroke: (bottom: 1pt + rgb("#DCDCE8"), left: 1pt + rgb("#DCDCE8"), right: 1pt + rgb("#DCDCE8")),
        radius: (bottom: 8pt, top: 0pt),
        clip: true,
        width: 100%
      )[
        #image(path, width: 100%)
      ]
    ]
    #if cap != none {
      v(0.28em)
      text(font: fs, size: 8pt, fill: muted, style: "italic")[#cap]
    }
  ]
  v(0.55em)
}
```

**Usage pattern:**
```typst
#shot(
  "../Pulse Screenshots/Heatmap.png",
  cap: "Caption text describing what HR sees in this screenshot.",
  w: 88%   // adjust width: 72% for narrower, 100% for full-width
)
```

Screenshot path prefix from `collaterals/`: `../Pulse Screenshots/`

**Available screenshots (use these, don't invent paths):**
- `../Pulse Screenshots/Engagement dashboard.png`
- `../Pulse Screenshots/Heatmap.png`
- `../Pulse Screenshots/Sentiment trend graph.png`
- `../Pulse Screenshots/Anonymous response interface.png`
- `../Pulse Screenshots/Survey creation dashboard.png`
- `../Pulse Screenshots/Custom survey builder1.png`
- `../Pulse Screenshots/Custom survey builder2.png`
- `../Pulse Screenshots/Template selection view.png`
- `../Pulse Screenshots/Performance score breakdown.png`
- `../Pulse Screenshots/Department-wise insights.png`
- `../Pulse Screenshots/Word-Cloud.png`
- `../Pulse Screenshots/Survey attempt page.png`
- `../Pulse Screenshots/Survey attempt page-mobile.png`

### step — numbered step with orange circle badge

Use for: how-it-works flows, setup instructions, sequential processes.

```typst
#let step(n, body) = {
  grid(
    columns: (1.65em, 1fr),
    gutter: 0.65em,
    align(top)[
      #box(width: 1.55em, height: 1.55em, radius: 50%, fill: orange)[
        #align(center + horizon)[
          #text(font: fs, size: 7.5pt, weight: "bold", fill: white)[#str(n)]
        ]
      ]
    ],
    align(top, par(spacing: 0em, body))
  )
  v(0.45em)
}
```

**Usage pattern:**
```typst
#step(1)[*Bold label.* Supporting explanation in plain text.]
#step(2)[*Next action.* Detail here.]
#step(3)[*Final step.* What happens after.]
```

---

## Step 7 — Two-Column Comparison Grid

Use for: Lifecycle vs Pulse, Feature A vs Feature B, before/after comparisons.

```typst
#grid(
  columns: (1fr, 1fr),
  gutter: 1em,
  block(
    fill: ghost,
    radius: 6pt,
    inset: (x: 1.1em, y: 0.9em),
    width: 100%,
    stroke: (top: 2.5pt + muted)
  )[
    #text(font: fs, weight: "bold", fill: navy, size: 11pt)[Left Column Title]
    #v(0.28em)
    Body text for the left column.
  ],
  block(
    fill: navy,
    radius: 6pt,
    inset: (x: 1.1em, y: 0.9em),
    width: 100%,
    stroke: (top: 2.5pt + orange)
  )[
    #text(font: fs, weight: "bold", fill: orange, size: 11pt)[Right Column Title]
    #v(0.28em)
    #text(fill: white)[Body text for the right column — white text on navy.]
  ]
)
```

**Rule:** The "featured" or preferred option always goes on the right column (navy background, orange title, white text). The neutral or lesser option goes on the left (ghost background, muted top rule).

---

## Step 8 — Page Break and Closing Page

Use `#pagebreak()` between pages. No blank lines needed around it.

The closing page pattern (always the final page):

```typst
#pagebreak()

// ── Closing page — no page footer ────────────────────────────────────────────
#set page(footer: none)
#v(1fr)

#align(center)[
  #stack(
    dir: ttb,
    spacing: 6pt,
    text(font: fs, size: 46pt, weight: "bold", fill: dark)[Thank You],
    align(center)[#rect(width: 3.2cm, height: 3pt, fill: orange, radius: 1.5pt)]
  )
  #v(0.6em)
  #text(font: fs, size: 10pt, fill: muted)[
    Contact Vantage Circle support for any questions or assistance · #text(fill: orange)[support\@vantagecircle.com]
  ]
]

#v(1fr)

// Stats block — full bleed
#pad(x: -2.5cm, bottom: -2.8cm)[
#block(
  fill: navy,
  radius: 0pt,
  width: 100%,
  inset: (x: 2.5cm, top: 2em, bottom: 2.2em),
  stroke: (top: 3pt + orange)
)[
  #align(center)[
    #text(font: fs, size: 18pt, weight: "bold", fill: white)[Our global capabilities]
    #v(0.35em)
    #text(font: fs, size: 9pt, fill: rgb("#8888AA"))[
      Delivering simple yet effective employee engagement solutions globally.
    ]
  ]
  #v(1.6em)
  #line(length: 100%, stroke: 0.5pt + rgb("#FFFFFF15"))
  #v(1.4em)
  #grid(
    columns: (1fr, 1fr, 1fr, 1fr, 1fr),
    gutter: 0em,
    align(center)[
      #pad(y: 0.8em)[
        #text(font: fs, size: 26pt, weight: "bold", fill: orange)[100+]
        #v(0.3em)
        #text(font: fs, size: 8pt, fill: rgb("#CCCCDD"))[Countries]
      ]
    ],
    block(width: 100%, stroke: (left: 0.5pt + rgb("#FFFFFF22")))[
      #align(center)[
        #pad(y: 0.8em)[
          #text(font: fs, size: 26pt, weight: "bold", fill: orange)[35+]
          #v(0.3em)
          #text(font: fs, size: 8pt, fill: rgb("#CCCCDD"))[Pre-built Questions]
        ]
      ]
    ],
    block(width: 100%, stroke: (left: 0.5pt + rgb("#FFFFFF22")))[
      #align(center)[
        #pad(y: 0.8em)[
          #text(font: fs, size: 26pt, weight: "bold", fill: orange)[10+]
          #v(0.3em)
          #text(font: fs, size: 8pt, fill: rgb("#CCCCDD"))[Engagement\ Categories]
        ]
      ]
    ],
    block(width: 100%, stroke: (left: 0.5pt + rgb("#FFFFFF22")))[
      #align(center)[
        #pad(y: 0.8em)[
          #text(font: fs, size: 26pt, weight: "bold", fill: orange)[700+]
          #v(0.3em)
          #text(font: fs, size: 8pt, fill: rgb("#CCCCDD"))[Companies]
        ]
      ]
    ],
    block(width: 100%, stroke: (left: 0.5pt + rgb("#FFFFFF22")))[
      #align(center)[
        #pad(y: 0.8em)[
          #text(font: fs, size: 26pt, weight: "bold", fill: orange)[3.2M+]
          #v(0.3em)
          #text(font: fs, size: 8pt, fill: rgb("#CCCCDD"))[Users]
        ]
      ]
    ],
  )
  #v(1.4em)
  #line(length: 100%, stroke: 0.5pt + rgb("#FFFFFF15"))
  #v(0.8em)
  #grid(
    columns: (1fr, auto),
    align(left + horizon)[
      #text(font: fs, size: 7pt, fill: rgb("#8888AA"))[
        #text(weight: "bold")[Vantage Circle.] 2026 All rights reserved.
      ]
    ],
    align(right + horizon)[
      #text(font: fs, size: 6.5pt, fill: rgb("#8888AA"))[
        DPDP | GDPR | Security | Terms and Conditions | Privacy Policy | Cookie Policy | Image Copyright
      ]
    ]
  )
]
]
```

**Rules for the closing page:**
- Always `#set page(footer: none)` before the closing page — the standard footer must not appear here
- The `#v(1fr)` above and below the "Thank You" block centers it vertically
- The `#pad(x: -2.5cm, bottom: -2.8cm)` counteracts the page margins to achieve full-bleed on the stats footer — the x value must match `margin.left`/`margin.right`, the bottom value must match `margin.bottom`
- Never change the five stats (100+, 35+, 10+, 700+, 3.2M+) — these are verified

---

## Step 9 — Spacing and Layout Conventions

| Element | Spacing |
|---------|---------|
| After H1 | `#v(0.45em)` (built into heading style) |
| Before H2 | `#v(0.9em)` (built into heading style) |
| Between paragraphs | `#set par(spacing: 1.6em)` (global) |
| Between bullet points | `#set list(spacing: 0.5em)` (global) |
| After a screenshot `shot()` | `#v(0.55em)` (built into shot) |
| After a `step()` | `#v(0.45em)` (built into step) |
| Between callout and next section | `#v(0.5em)` |
| Space push (whitespace) | `#v(Xcm)` or `#v(Xem)` |

**Do not add manual `#v()` calls above H2 headings** — the heading show rule already adds `#v(0.9em)`.

---

## Step 10 — Content Rules for Collaterals

These apply to all body copy in `.typ` files:

- **Be concise.** Collaterals are read by sales prospects in 2–5 minutes. Every sentence must earn its place.
- **Use bold inline text for labels.** `*Bold label.* Plain explanation.` — this is the step pattern, also use it in bullet lists.
- **Lead with the outcome, not the mechanism.** "Spot onboarding friction early" not "The system tracks tenure milestones."
- **No em-dashes** in body copy. Use a period or a comma.
- **No stats that aren't in CLAUDE.md.** If a number isn't verified in CLAUDE.md, don't include it.
- **Feature names must match the UI exactly.** Cross-check against CLAUDE.md and `VANTAGE_PULSE_FEATURE_LIST.md`.
- **Callouts are for constraints, Q&A, and important caveats** — not for general body copy. Max 1–2 per page.
- **Screenshots go after the H2 heading** or after the first 1–2 sentences of context — never at the end of a section.
- **Page 1 must contain the "why it matters" pitch** — benefits framed from the HR leader's perspective.

---

## Step 11 — File Naming and Paths

| Item | Convention |
|------|-----------|
| Typst source | `collaterals/[feature-name].typ` — hyphenated, lowercase |
| Compiled PDF | Same path, same name, `.pdf` extension |
| Screenshot path | `../Pulse Screenshots/[filename]` (relative from `collaterals/`) |
| Logo path | `../logos/[filename]` (relative from `collaterals/`) |

**Never use absolute paths in `.typ` files** — they break on other machines.

---

## Step 12 — Compile

After writing or editing the `.typ` file:

```bash
typst compile collaterals/[filename].typ collaterals/[filename].pdf
```

Run from `/Users/sahil/Desktop/marketing/`. Typst binary is at `/opt/homebrew/bin/typst`.

If the compile fails:
1. Read the error — Typst errors point to the exact line
2. The most common errors: missing image file (check path), unwrapped page counter (add `#context`), incorrect `#pad` bleed math

Always verify the PDF opens and renders correctly after compiling. If images are missing or layout breaks, fix before reporting done.

---

## Step 13 — Output

When the task is complete, report:

1. **File written:** `collaterals/[filename].typ`
2. **PDF compiled:** `collaterals/[filename].pdf`
3. **Pages:** list each page title and what it contains
4. **Screenshots used:** list which `/Pulse Screenshots/` files are embedded
5. **Stats used:** list any numbers from CLAUDE.md that appear in the doc, with their source

---

## Quick Reference — What Goes Where

| Content type | Component to use |
|--------------|-----------------|
| Product screenshot | `shot()` |
| How-to steps | `step(n)` |
| Warning / tip / Q&A | `callout()` |
| Two options compared | Two-column grid (ghost left, navy right) |
| Section header | `==` H2 |
| Document title | `=` H1 (once, Page 1 only) |
| Final page | Closing page template (Step 8) |
| Inline emphasis | `*bold*` or `_italic_` — not both together |

---

## Canonical Reference File

`collaterals/automated-lifecycle-surveys.typ` is the template to study before writing any new doc. When in doubt about spacing, component usage, or layout — read that file.
