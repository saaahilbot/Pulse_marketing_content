// ─── Brand tokens ──────────────────────────────────────────────────────────
#let navy     = rgb("#29294C")
#let orange   = rgb("#FF6D05")
#let ghost    = rgb("#EEEEF6")
#let muted    = rgb("#6B6B8A")
#let dark     = rgb("#1C1C3A")
#let accent-l = rgb("#FFF3EB")
#let fs       = ("Helvetica Neue", "Arial")

// ─── Page ──────────────────────────────────────────────────────────────────
#set document(title: "Automated Lifecycle Surveys", author: "Vantage Circle")
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
          Automated Lifecycle Surveys · #context counter(page).display()
        ]
      ],
      align(right + horizon)[
        #image("../logos/new-vc-logo.png", height: 0.44cm)
      ]
    )
  ]
)

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

// ─── Components ────────────────────────────────────────────────────────────

// Callout: ghost fill + left orange border
#let callout(body) = block(
  width: 100%,
  fill: ghost,
  radius: (right: 6pt, left: 0pt),
  inset: (left: 1.15em, right: 1.1em, y: 0.8em),
  stroke: (left: 3pt + orange),
  body
)

// Screenshot with macOS-style chrome bar
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

// Numbered step — orange circle badge + body
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

// ═════════════════════════════════════════════════════════════════════════
// PAGE 1
// ═════════════════════════════════════════════════════════════════════════

= Automated Lifecycle Surveys

Lifecycle surveys automatically reach employees based on tenure milestones (e.g., *7, 15, 30, 60/90 days, 6 months, 1 year* or custom date ranges). Vantage Pulse tracks each person's start date and triggers the right survey on the exact day — no manual work.

Surveys can be set to *anonymous* or *non-anonymous*, depending on the needs of the organisation. Non-anonymous surveys are particularly valuable in lifecycle feedback, as they allow you to identify specific friction points or challenges that employees may face early in their journey.

Before completing the survey, respondents are clearly informed about the survey's privacy policy — ensuring transparency, and that the decision to participate in non-anonymous surveys is fully understood. Vantage Pulse handles all data with the highest standards of security and confidentiality.

#shot(
  "../Pulse Screenshots/Survey attempt page.png",
  cap: "Employee survey experience — trust badges and a language selector greet respondents before every submission."
)

== What this enables for HR & People Leaders

- *Spot onboarding friction early.* Identify blockers by cohort (team, location, manager) before they snowball into attrition.
- *Shorten time-to-productivity.* See whether new hires have access, clarity, and support — and fix gaps fast.
- *Protect the first-year experience.* Track sentiment across 90 days → 6 months → 12 months and intervene with precision.
- *Prove what's working.* Attribute improvements to specific changes: buddy programs, revised induction, manager coaching.
- *Reduce noise for managers.* Only the right people get alerts, with the context to act — not just more data.

// ═════════════════════════════════════════════════════════════════════════
// PAGE 2
// ═════════════════════════════════════════════════════════════════════════

#pagebreak()

== How it works (once, then automated)

#step(1)[*Choose milestones* (e.g., 7 / 15 / 30 / 60 / 90 / 180 / 365 days or custom date ranges).]
#step(2)[*Select Tenure Template* — A predefined template appears based on the chosen milestone. Review and confirm, or customise before proceeding.]
#step(3)[*Finalise questions* — questions lock on publish to keep results consistent for that run.]
#step(4)[*Go live* — surveys trigger per employee, exactly on their milestone date.]
#step(5)[*Review insights* in the Lifecycle dashboard by milestone and cohort; route actions to owners.]

#shot(
  "../Pulse Screenshots/Template selection view.png",
  cap: "Template gallery — choose from pre-built lifecycle templates including Onboarding and Work Anniversary.",
  w: 72%
)

#callout[
  #text(weight: "bold", fill: orange)[Can we modify questions later?]
  #v(0.28em)
  Edits are allowed during setup. After publishing, questions are locked for that run to keep data comparable. To change them, create a *new version* for future employees.
]

#v(0.5em)

== What you'll see in Insights

- *Milestone Views:* 7 / 15 / 30 / 60 / 90 / 180 / 365-day roll-ups with trends, heatmaps, and themes.
- *Cohorts:* Compare by department, hiring month/quarter, tenure band, and manager.
- *Theme Drivers:* Identify which experience drivers — clarity, support, tools, inclusion — lift or drag scores.

== Lifecycle vs Pulse

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
    #text(font: fs, weight: "bold", fill: navy, size: 11pt)[Pulse Surveys]
    #v(0.28em)
    Company-wide snapshot, sent on a schedule or ad-hoc for rapid readouts.
  ],
  block(
    fill: navy,
    radius: 6pt,
    inset: (x: 1.1em, y: 0.9em),
    width: 100%,
    stroke: (top: 2.5pt + orange)
  )[
    #text(font: fs, weight: "bold", fill: orange, size: 11pt)[Lifecycle Surveys]
    #v(0.28em)
    #text(fill: white)[Individualised, triggered by tenure milestones to map the full employee journey.]
  ]
)

#v(0.3em)
#callout[
  #text(weight: "bold")[Use both:] Pulse for broad engagement health; Lifecycle for *experience* quality.
]

== Controls & governance

- *Audience controls:* Include or exclude specific departments from automated lifecycle runs.
- *Versioning:* Publish new versions when you want to modify or add questions; historic surveys remain intact.
- *Data integrity:* Questions lock post-publish for each run to ensure consistency.

== Implementation

- *Prerequisite:* Employee must be registered with a valid *date of joining*.
- *Go-live speed:* Import employees → select milestones → finalise questions → publish.

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
