// ─────────────────────────────────────────────
// Vantage Circle — Training Effectiveness Survey
// 100 Questions Template
// Brand: Vc BrandBook 8 — Space Cadet / Pumpkin Orange / Ghost White
// ─────────────────────────────────────────────

// ── Brand Colors ──────────────────────────────
#let space-cadet = rgb("#29294C")
#let orange      = rgb("#FF6D05")
#let ghost-white = rgb("#EEEEF6")
#let lavender    = rgb("#CDCDE4")
#let white       = rgb("#FFFFFF")
#let cadet-light = rgb("#8B8BC0")
#let muted-text  = rgb("#505095")

#set text(font: "Lato", size: 9.5pt, fill: space-cadet)
#set par(leading: 0.55em, spacing: 0.8em)

// ── PAGE SETUP ────────────────────────────────
// Header hidden on page 1 (banner replaces it); shown from page 2 onward
#set page(
  paper: "a4",
  fill: white,
  margin: (top: 2cm, bottom: 1.8cm, left: 2cm, right: 2cm),
  header: context {
    if counter(page).get().first() > 1 {
      block(
        width: 100%,
        fill: space-cadet,
        inset: (x: 2cm, y: 7pt),
      )[
        #grid(
          columns: (1fr, auto),
          align: (left + horizon, right + horizon),
          text(font: "Lato", size: 7pt, fill: lavender, weight: "bold", tracking: 1.5pt)[
            100 TRAINING EFFECTIVENESS SURVEY QUESTIONS
          ],
          image("logos/new-vc-logo.png", height: 0.5cm),
        )
      ]
    }
  },
  footer: block(width: 100%)[
    #line(length: 100%, stroke: 0.5pt + lavender)
    #v(3pt)
    #grid(
      columns: (auto, 1fr, auto),
      align: (left + horizon, left + horizon, right + horizon),
      image("logos/new-vc-logo.png", height: 0.42cm),
      [],
      context text(font: "Lato", size: 7pt, fill: muted-text)[
        Page #counter(page).display()
      ],
    )
  ],
)

// ── HELPER: section header ─────────────────────
#let section-header(number, title, count, kirkpatrick) = {
  v(0.35cm)
  block(
    fill: space-cadet,
    width: 100%,
    inset: (x: 10pt, y: 8pt),
    radius: 0pt,
  )[
    #grid(
      columns: (auto, 1fr, auto),
      column-gutter: 8pt,
      align: (center + horizon, left + horizon, right + horizon),
      block(fill: orange, inset: (x: 7pt, y: 4pt), radius: 10pt)[
        #text(font: "Lato", fill: white, weight: "bold", size: 8pt)[#number]
      ],
      {
        text(font: "Lato", fill: white, weight: "bold", size: 10pt)[#title]
        h(6pt)
        text(font: "Lato", fill: lavender, size: 8pt)[(#count questions)]
      },
      text(font: "Lato", fill: cadet-light, size: 7pt, weight: "bold")[#kirkpatrick],
    )
  ]
  v(0pt)
}

// ── HELPER: question row — alternating backgrounds ──
#let q(num, question, format) = {
  let n    = int(num)
  let bg   = if calc.rem(n, 2) == 1 { ghost-white } else { white }
  let pill = if calc.rem(n, 2) == 1 { white } else { ghost-white }
  block(
    fill: bg,
    width: 100%,
    inset: (x: 10pt, y: 8pt),
  )[
    #grid(
      columns: (1.6em, 1fr, auto),
      column-gutter: 8pt,
      align: (right + top, left + top, right + top),
      text(font: "Lato", fill: muted-text, weight: "bold", size: 8.5pt)[#num.],
      text(font: "Lato", size: 9pt)[#question],
      block(
        fill: pill,
        stroke: 0.5pt + lavender,
        inset: (x: 7pt, y: 3pt),
        radius: 10pt,
      )[
        #text(font: "Lato", fill: muted-text, size: 7pt, weight: "bold")[#format]
      ],
    )
  ]
}

// ═══════════════════════════════════════════════
// PAGE 1 — BANNER + QUESTIONS
// ═══════════════════════════════════════════════

// Banner — compact header, fills to top edge via outset
// Two columns: left (title) with dotted right border | right (logo + how to use)
#block(
  width: 100%,
  fill: space-cadet,
  inset: 0pt,
  outset: (x: 2cm, top: 2cm, bottom: 0pt),
)[
  #pad(x: 2cm, top: 1cm, bottom: 1cm)[
    #grid(
      columns: (1fr, 1fr),
      column-gutter: 0pt,
      align: (left + top, left + top),

      // Left — logo + title, dotted right border acts as divider
      block(
        width: 100%,
        inset: (right: 1.4cm),
        stroke: (right: (paint: lavender, thickness: 1pt, dash: "dotted")),
      )[
        #image("logos/Negative-VPulse.png", width: 3.8cm)
        #v(0.3cm)
        #text(font: "Lato", size: 18pt, fill: white, weight: "bold", hyphenate: false)[
          100 Training Effectiveness\
          Survey Questions
        ]
      ],

      // Right — how to use
      pad(left: 1.4cm)[
        #text(font: "Lato", size: 9.5pt, fill: white, weight: "bold")[
          How to Use this Template:
        ]
        #v(0.2cm)
        #text(font: "Lato", size: 8pt, fill: lavender)[
          100 ready-to-use training effectiveness survey questions
          organized by the Kirkpatrick Model. Copy questions into
          any survey platform, or print and distribute directly.
        ]
      ],
    )
  ]
]

#v(0.4cm)

// ═══════════════════════════════════════════════
// SECTION 1 — OVERALL EXPERIENCE
// ═══════════════════════════════════════════════
#section-header("01", "Overall Experience", "10", "Kirkpatrick Level 1 — Reaction")

#q("1", "The training met my expectations.", "Likert")
#q("2", "I found the training relevant to my role.", "Likert")
#q("3", "The length of the training was appropriate.", "Likert")
#q("4", "I was able to stay engaged throughout the session.", "Likert")
#q("5", "The training was well-organized.", "Likert")
#q("6", "Would you recommend this training to a colleague?", "Yes / No")
#q("7", "How would you rate your overall satisfaction with this training?", "Multiple-choice")
#q("8", "The session was worth the time I invested.", "Likert")
#q("9", "What did you like most about this training?", "Open-ended")
#q("10", "What could be improved for future sessions?", "Open-ended")

// ═══════════════════════════════════════════════
// SECTION 2 — LEARNING OBJECTIVES
// ═══════════════════════════════════════════════
#section-header("02", "Learning Objectives", "10", "Kirkpatrick Level 2 — Learning")

#q("11", "The learning objectives were clearly stated.", "Likert")
#q("12", "The training objectives were met.", "Likert")
#q("13", "I understood how the content connected to the objectives.", "Likert")
#q("14", "The training addressed the skills I need in my job.", "Likert")
#q("15", "The learning objectives matched the pre-training communication.", "Likert")
#q("16", "Which objectives were most valuable to you?", "Open-ended")
#q("17", "Were there any objectives you felt were missing?", "Open-ended")
#q("18", "How confident are you in applying what you learned?", "Multiple-choice")
#q("19", "The objectives were realistic and achievable.", "Likert")
#q("20", "What additional skills would you like to see covered in future training?", "Open-ended")

// ═══════════════════════════════════════════════
// SECTION 3 — CONTENT QUALITY
// ═══════════════════════════════════════════════
#section-header("03", "Content Quality", "15", "Kirkpatrick Level 2 — Learning")

#q("21", "The training materials were clear and easy to understand.", "Likert")
#q("22", "The content matched my expectations.", "Likert")
#q("23", "The examples provided were relevant to my work.", "Likert")
#q("24", "The balance between theory and practice was appropriate.", "Likert")
#q("25", "The case studies or examples helped me learn.", "Likert")
#q("26", "How well did the content match your skill level?", "Multiple-choice")
#q("27", "The content was up to date.", "Likert")
#q("28", "The amount of information presented was manageable.", "Likert")
#q("29", "The content avoided unnecessary jargon.", "Likert")
#q("30", "How would you rate the usefulness of the content overall?", "Multiple-choice")
#q("31", "The training deepened my knowledge of the topic.", "Likert")
#q("32", "The training addressed real-world challenges.", "Likert")
#q("33", "Which content areas were most helpful to you?", "Open-ended")
#q("34", "Which content areas were least helpful?", "Open-ended")
#q("35", "What additional content should be included?", "Open-ended")

// ═══════════════════════════════════════════════
// SECTION 4 — TRAINER / FACILITATOR
// ═══════════════════════════════════════════════
#section-header("04", "Trainer / Facilitator", "10", "Kirkpatrick Level 1 — Reaction")

#q("36", "The trainer explained concepts clearly.", "Likert")
#q("37", "The trainer was knowledgeable about the subject.", "Likert")
#q("38", "The trainer encouraged participation.", "Likert")
#q("39", "The trainer handled questions effectively.", "Likert")
#q("40", "The trainer kept the session engaging.", "Likert")
#q("41", "How approachable was the trainer?", "Multiple-choice")
#q("42", "The trainer used real-world examples effectively.", "Likert")
#q("43", "The trainer managed time well.", "Likert")
#q("44", "The trainer created an inclusive learning environment.", "Likert")
#q("45", "Any feedback for the trainer?", "Open-ended")

// ═══════════════════════════════════════════════
// SECTION 5 — DELIVERY & FORMAT
// ═══════════════════════════════════════════════
#section-header("05", "Delivery & Format", "15", "Kirkpatrick Level 1 — Reaction")

#q("46", "The training platform or room was easy to navigate.", "Likert")
#q("47", "The pace of delivery was appropriate.", "Likert")
#q("48", "The session format (online/in-person) worked well.", "Likert")
#q("49", "Technical issues were minimal.", "Likert")
#q("50", "The training allowed for interaction and discussion.", "Likert")
#q("51", "The visuals (slides, handouts) were clear.", "Likert")
#q("52", "The audio quality was clear.", "Likert")
#q("53", "Breaks were well-timed.", "Likert")
#q("54", "Which delivery method did you prefer?", "Multiple-choice")
#q("55", "How comfortable were you using the platform?", "Likert")
#q("56", "The delivery supported different learning styles.", "Likert")
#q("57", "The training was accessible (captions, transcripts, etc.).", "Likert")
#q("58", "What challenges did you face during delivery?", "Open-ended")
#q("59", "How could the delivery be improved?", "Open-ended")
#q("60", "Would you prefer a different delivery method in the future?", "Multiple-choice")

// ═══════════════════════════════════════════════
// SECTION 6 — APPLICATION & IMPACT
// ═══════════════════════════════════════════════
#section-header("06", "Application & Impact", "20", "Kirkpatrick Levels 3 & 4 — Behavior & Results")

#q("61", "I can apply what I learned immediately.", "Likert")
#q("62", "The training will help me perform better at work.", "Likert")
#q("63", "The training improved my confidence in the topic.", "Likert")
#q("64", "The training will positively impact my team.", "Likert")
#q("65", "The training supports my career development.", "Likert")
#q("66", "The training addressed real challenges I face at work.", "Likert")
#q("67", "I can already identify ways to use the training.", "Likert")
#q("68", "This training will help reduce errors or mistakes.", "Likert")
#q("69", "This training will improve customer outcomes.", "Likert")
#q("70", "How likely are you to use the new skills within 30 days?", "Multiple-choice")
#q("71", "The training filled a critical knowledge gap.", "Likert")
#q("72", "The training reinforced skills I already had.", "Likert")
#q("73", "What specific tasks will you apply this training to?", "Open-ended")
#q("74", "What challenges might stop you from applying it?", "Open-ended")
#q("75", "How can the company support you in applying it?", "Open-ended")
#q("76", "Did you discuss applying this training with your manager?", "Yes / No")
#q("77", "Do you need follow-up support?", "Yes / No")
#q("78", "What kind of support would help you apply the training?", "Open-ended")
#q("79", "Do you see this training affecting your long-term growth?", "Yes / No / Unsure")
#q("80", "The training will contribute to organizational goals.", "Likert")

// ═══════════════════════════════════════════════
// SECTION 7 — ACCESSIBILITY & INCLUSION
// ═══════════════════════════════════════════════
#section-header("07", "Accessibility & Inclusion", "10", "Kirkpatrick Level 1 — Reaction")

#q("81", "The training was accessible to all participants.", "Likert")
#q("82", "I was able to fully participate without barriers.", "Likert")
#q("83", "The training considered diverse perspectives.", "Likert")
#q("84", "Accessibility features (captions, transcripts) were helpful.", "Likert")
#q("85", "The training environment was inclusive.", "Likert")
#q("86", "Were you able to request accommodations if needed?", "Yes / No")
#q("87", "The materials were easy to read and understand.", "Likert")
#q("88", "I felt respected during the session.", "Likert")
#q("89", "What could make the training more inclusive?", "Open-ended")
#q("90", "What accessibility supports were most valuable to you?", "Open-ended")

// ═══════════════════════════════════════════════
// SECTION 8 — POST-TRAINING EVALUATION
// ═══════════════════════════════════════════════
#section-header("08", "Post-Training Evaluation", "10", "Kirkpatrick Levels 3 & 4 — Behavior & Results")

#q("91", "What was the most valuable part of this training?", "Open-ended")
#q("92", "What was the least valuable part?", "Open-ended")
#q("93", "Did the training meet your expectations overall?", "Yes / No")
#q("94", "How could we improve this training for the future?", "Open-ended")
#q("95", "Was the timing of the training convenient?", "Yes / No")
#q("96", "If you could change one thing, what would it be?", "Open-ended")
#q("97", "Would you like more advanced training on this topic?", "Yes / No")
#q("98", "Are there other topics you'd like training on?", "Open-ended")
#q("99", "Any final comments or suggestions?", "Open-ended")
#q("100", "Overall, how would you rate this training?", "Multiple-choice")

// ── BACK PAGE CTA ──────────────────────────────
#v(1cm)
#block(
  fill: space-cadet,
  width: 100%,
  inset: (x: 20pt, y: 18pt),
  radius: 9pt,
)[
  #grid(
    columns: (1fr, auto),
    align: (left + horizon, right + horizon),
    column-gutter: 1cm,
    [
      #text(font: "Lato", size: 11pt, fill: white, weight: "bold")[
        Want to run these surveys automatically?
      ]
      #v(0.2cm)
      #text(font: "Lato", size: 8.5pt, fill: lavender)[
        Vantage Pulse sends training surveys at 30, 60, and 90 days post-training — no manual follow-up needed.
      ]
    ],
    block(fill: orange, inset: (x: 16pt, y: 10pt), radius: 20pt)[
      #text(font: "Lato", fill: white, weight: "bold", size: 9pt)[
        Book a Free Demo →
      ]
    ],
  )
]
