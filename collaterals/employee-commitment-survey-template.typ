// Employee Commitment Survey Template — Vantage Circle
// Compile: typst compile --root . collaterals/employee-commitment-survey-template.typ collaterals/employee-commitment-survey-template.pdf

// ─── TOKENS ──────────────────────────────────────────────────────────────────
#let M  = 1.5cm
#let SC = rgb("#29294C")
#let OR = rgb("#FF6D05")
#let GW = rgb("#EEEEF6")
#let LW = rgb("#CDCDE4")
#let WH = rgb("#FFFFFF")
#let MU = rgb("#6A6AAF")

// ─── PAGE ─────────────────────────────────────────────────────────────────────
#set page(paper: "a4", margin: (top: 0cm, left: 0cm, right: 0cm, bottom: 0cm), fill: GW)
#set text(font: "Lato", size: 9.5pt, fill: SC)
#set par(leading: 0.65em)

// ─── HEADER ───────────────────────────────────────────────────────────────────
#block(width: 100%, fill: SC,
  inset: (left: M, right: M, top: 0.7cm, bottom: 0.7cm)
)[
  #image("../logos/Negative-VPulse.png", height: 0.65cm)
  #v(0.5cm)
  #text(size: 21pt, weight: "bold", fill: WH)[Employee Commitment Survey]
  #v(0.12cm)
  #text(size: 8.5pt, fill: LW)[
    A structured listening tool to measure loyalty, engagement & alignment
  ]
]

// ─── INFO STRIP ───────────────────────────────────────────────────────────────
#block(width: 100%, fill: WH, inset: (left: M, right: M, top: 0.5cm, bottom: 0.5cm))[
  #grid(columns: (1fr, 1fr, 1fr), gutter: 1.5cm)[
    #text(size: 7.5pt, weight: "bold", fill: SC)[Confidential & Anonymous] \
    #v(0.05cm)
    #text(size: 7.5pt, fill: MU)[Responses are aggregated. Your identity is never shared.]
  ][
    #text(size: 7.5pt, weight: "bold", fill: SC)[Estimated Time] \
    #v(0.05cm)
    #text(size: 7.5pt, fill: MU)[10–15 min · 20 questions · Rating scale + open text]
  ][
    #text(size: 7.5pt, weight: "bold", fill: SC)[How to Respond] \
    #v(0.05cm)
    #text(size: 7.5pt, fill: MU)[Circle the number that best fits, or write in the lines below.]
  ]
]
#line(length: 100%, stroke: (paint: LW, thickness: 0.8pt))

// ─── SECTION HEADER ──────────────────────────────────────────────────────────
#let section-header(badge, title, subtitle) = {
  pad(left: M, right: M, top: 0.65cm, bottom: 0cm)[
    #grid(columns: (auto, 1fr), gutter: 0.4cm, align: left + horizon)[
      #block(width: 0.8cm, height: 0.8cm, fill: SC, radius: 8pt)[
        #align(center + horizon)[
          #text(size: 9pt, weight: "bold", fill: WH)[#badge]
        ]
      ]
    ][
      #text(size: 11pt, weight: "bold", fill: SC)[#title] \
      #v(0.04cm)
      #text(size: 7.5pt, fill: MU)[#subtitle]
    ]
    #v(0.25cm)
    #line(length: 100%, stroke: (paint: LW, thickness: 0.8pt))
  ]
}

// ─── SCALE QUESTION ──────────────────────────────────────────────────────────
#let scale-question(num, question) = {
  pad(left: M, right: M, top: 0.28cm, bottom: 0cm)[
    #block(width: 100%, fill: WH, radius: 8pt,
      inset: (left: 0.55cm, right: 0.55cm, top: 0.45cm, bottom: 0.45cm)
    )[
      #grid(columns: (1.3cm, 1fr), gutter: 0cm, align: left + top)[
        #text(size: 8pt, weight: "bold", fill: OR)[#num]
      ][
        #text(size: 9pt, fill: SC)[#question]
      ]
      #v(0.38cm)
      #pad(left: 1.3cm)[
        #grid(columns: (1.45cm, 1.45cm, 1.45cm, 1.45cm, 1.45cm, 1fr), gutter: 0cm,
          ..for (val, lbl) in (
            ("1", "Strongly\nDisagree"), ("2", "Disagree"),
            ("3", "Neutral"), ("4", "Agree"), ("5", "Strongly\nAgree"),
          ) {(
            align(center)[
              #stack(dir: ttb, spacing: 0.1cm,
                block(width: 1.15cm, height: 1.15cm,
                  stroke: (paint: LW, thickness: 0.8pt), radius: 6pt, fill: GW
                )[
                  #align(center + horizon)[
                    #text(size: 11.5pt, weight: "bold", fill: SC)[#val]
                  ]
                ],
                align(center)[#text(size: 5.8pt, fill: MU)[#lbl]]
              )
            ],
          )},
          []
        )
      ]
    ]
  ]
}

// ─── OPEN QUESTION ───────────────────────────────────────────────────────────
#let open-question(num, question, lines: 4) = {
  pad(left: M, right: M, top: 0.28cm, bottom: 0cm)[
    #block(width: 100%, fill: WH, radius: 8pt,
      inset: (left: 0.55cm, right: 0.55cm, top: 0.45cm, bottom: 0.5cm)
    )[
      #grid(columns: (1.3cm, 1fr), gutter: 0cm, align: left + top)[
        #text(size: 8pt, weight: "bold", fill: OR)[#num]
      ][
        #text(size: 9pt, fill: SC)[#question]
      ]
      #v(0.38cm)
      #pad(left: 1.3cm)[
        #for _ in range(lines) {
          v(0.52cm)
          line(length: 100%, stroke: (paint: LW, thickness: 0.7pt))
        }
      ]
    ]
  ]
}

// ─── SECTION A ───────────────────────────────────────────────────────────────
#section-header("A", "Affective Commitment", "Emotional connection to the company's mission, values, and culture")
#scale-question("01.", "Rate your overall commitment to your job.\n(1 = Not at all committed · 5 = Fully committed)")
#scale-question("02.", "How likely are you to recommend our organisation as a great place to work?\n(1 = Very unlikely · 5 = Very likely)")
#scale-question("03.", [Rate your agreement: _"I feel a strong emotional connection to the company's values and mission."_])
#scale-question("04.", "How supported do you feel by your manager / supervisor on a day-to-day basis?\n(1 = Not supported · 5 = Fully supported)")
#scale-question("05.", "Rate your understanding of the organisation's long-term goals and vision.\n(1 = No understanding · 5 = Very clear understanding)")

// ─── SECTION B ───────────────────────────────────────────────────────────────
#section-header("B", "Role Satisfaction & Growth", "Clarity of role, career opportunities, and day-to-day experience")
#scale-question("06.", "Rate your satisfaction with your current role and responsibilities.\n(1 = Very dissatisfied · 5 = Very satisfied)")
#scale-question("07.", "Do you believe there are meaningful opportunities for professional growth and advancement?\n(1 = No, not at all · 5 = Yes, clearly defined path)")
#scale-question("08.", "How would you rate your work-life balance in this organisation?\n(1 = Very poor · 5 = Excellent)")
#scale-question("09.", "Do you feel a strong sense of teamwork and collaboration within your department?\n(1 = Not at all · 5 = Strongly agree)")
#scale-question("10.", "Rate your confidence in the leadership and direction provided by management.\n(1 = No confidence · 5 = Very high confidence)")

// ─── SECTION C ───────────────────────────────────────────────────────────────
#section-header("C", "Culture, Communication & Recognition", "How well the organisation communicates, recognises, and includes its people")
#scale-question("11.", "How effectively is information communicated within the organisation?\n(1 = Very poorly · 5 = Very effectively)")
#scale-question("12.", "Rate your satisfaction with the benefits and perks offered by the company.\n(1 = Very dissatisfied · 5 = Very satisfied)")
#scale-question("13.", "Do you feel adequately recognised and rewarded for your contributions?\n(1 = Never · 5 = Consistently)")
#scale-question("14.", "How much independence and autonomy do you have over how you do your work?\n(1 = Very little · 5 = High autonomy)")
#scale-question("15.", "How diverse and inclusive do you perceive our organisation to be?\n(1 = Not inclusive · 5 = Highly inclusive)")

// ─── SECTION D ───────────────────────────────────────────────────────────────
#pagebreak(weak: true)
#section-header("D", "Alignment & Evaluation", "How well the organisation's systems support your sense of belonging and purpose")
#scale-question("16.", "Are you satisfied with the feedback and performance evaluation processes?\n(1 = Very dissatisfied · 5 = Very satisfied)")
#scale-question("17.", "To what extent do your personal values align with the organisation's values?\n(1 = No alignment · 5 = Strong alignment)")

// ─── SECTION E ───────────────────────────────────────────────────────────────
#section-header("E", "Open-Ended Feedback", "Please share anything not captured in the rating questions above")
#open-question("18.", "Is there anything else you'd like to share about your commitment to the company?", lines: 4)
#open-question("19.", "How can the company better demonstrate its commitment to inclusivity and diversity?", lines: 4)
#open-question("20.", "Any suggestions for improving employee commitment across the organisation?", lines: 4)

// ─── SCALE REFERENCE ─────────────────────────────────────────────────────────
#v(0.5cm)
#pad(left: M, right: M)[
  #block(width: 100%, fill: WH, radius: 8pt,
    stroke: (paint: LW, thickness: 0.8pt),
    inset: (left: 0.55cm, right: 0.55cm, top: 0.45cm, bottom: 0.45cm)
  )[
    #text(size: 6.5pt, weight: "bold", fill: MU, tracking: 0.8pt)[RATING SCALE REFERENCE]
    #v(0.2cm)
    #line(length: 100%, stroke: (paint: LW, thickness: 0.7pt))
    #v(0.2cm)
    #grid(columns: (1fr, 1fr, 1fr, 1fr, 1fr), gutter: 0.3cm,
      ..for (n, lbl, desc) in (
        ("1", "Strongly Disagree", "Significant concern"),
        ("2", "Disagree",          "Below expectations"),
        ("3", "Neutral",           "No strong view"),
        ("4", "Agree",             "Meets expectations"),
        ("5", "Strongly Agree",    "Exceeds expectations"),
      ) {(
        stack(dir: ttb, spacing: 0.06cm,
          text(size: 15pt, weight: "bold", fill: SC)[#n],
          text(size: 7pt, weight: "bold", fill: SC)[#lbl],
          text(size: 6.5pt, fill: MU)[#desc],
        ),
      )}
    )
  ]
]

// ─── CTA BANNER ──────────────────────────────────────────────────────────────
#v(0.5cm)
#block(width: 100%, fill: SC,
  inset: (left: M, right: M, top: 0.6cm, bottom: 0.6cm)
)[
  #grid(columns: (1fr, auto), gutter: 1.5cm, align: (left + horizon, right + horizon))[
    #text(size: 10pt, weight: "bold", fill: WH)[Want this survey automated — with real-time analytics, heatmaps & eNPS?]
    #v(0.1cm)
    #text(size: 7.5pt, fill: LW)[Vantage Pulse runs it for you. No manual analysis. No guesswork. Just decisions.]
  ][
    #block(stroke: (paint: OR, thickness: 1.2pt), radius: 21pt,
      inset: (x: 0.5cm, y: 0.28cm)
    )[
      #text(size: 8pt, weight: "bold", fill: OR)[Book a Free Demo →]
    ]
  ]
]

// ─── FOOTER ──────────────────────────────────────────────────────────────────
#block(width: 100%, fill: GW, inset: (left: M, right: M, top: 0.3cm, bottom: 0.3cm))[
  #grid(columns: (1fr, auto), align: (left + horizon, right + horizon))[
    #text(size: 6.5pt, fill: MU)[
      Vantage Circle · vantagecircle.com · ISO 27001 · GDPR · SOC 2 Type 2 · HIPAA
    ]
  ][
    #context [
      #text(size: 6.5pt, fill: MU)[
        Page #counter(page).display() of #counter(page).final().first()
      ]
    ]
  ]
]
