---
name: pulse-email
description: >
  Write a 3-email outbound sequence for Vantage Pulse targeting HR leaders
  (CHRO, HR Director, HR Business Partner). Follows Awareness → Nurture →
  Conversion structure. Reads approved proof points and brand voice from CLAUDE.md.
  Enforces short copy, pain-first framing, and no fabricated stats.
user_invocable: true
arguments:
  - name: angle
    description: >
      The pain point or product angle for the sequence.
      Examples: "survey participation", "anonymous employee feedback",
      "eNPS tracking", "AI sentiment analysis", "lifecycle surveys".
    required: true
  - name: persona
    description: "chro, hr-director, or hr-bp. Defaults to hr-director if omitted."
    required: false
---

# pulse-email

Write a 3-email outbound sequence for Vantage Pulse. Awareness → Nurture → Conversion.

## Usage

```
/pulse-email "low survey participation" hr-director
/pulse-email "anonymous employee feedback" chro
/pulse-email "eNPS tracking"
/pulse-email "AI feedback analysis" hr-bp
```

---

## Context Files (Read First — Every Time)

| File | What to Use |
|------|-------------|
| `CLAUDE.md` | Approved proof points, personas, pain points, brand voice rules |

---

## Step 1 — Map Persona to Pain

If persona is not specified, default to `hr-director`.

| Persona | Primary Fear | What They Need to Hear |
|---------|-------------|----------------------|
| `chro` | Can't quantify culture ROI; blind to attrition risk | $483B–$605B cost of disengagement; eNPS tied to retention; data-backed board narratives |
| `hr-director` | Manual analytics; no real-time signal; can't segment | Self-serve insights; instant alerts; no analytics overhead |
| `hr-bp` | Employees don't trust surveys; no time; low completion | Anonymous, short (2-12 min), employees feel heard and actually respond |

---

## Step 2 — Write 3 Emails

### Email 1 — Awareness (Day 1)

**Goal:** Get the open. Plant the pain. No product pitch.

**Subject line rules:**
- Under 50 characters
- Pain-led or curiosity-led
- No "Vantage Pulse" in the subject line of Email 1
- No exclamation marks

**Preview text:** 40-80 chars. Extends the subject without repeating it.

**Body rules:**
- 60-80 words maximum
- Open with the pain — a stat or a sharp observation
- One short paragraph. No bullet lists in Email 1.
- Close with a soft, low-friction question ("Worth 15 minutes?" / "Sound familiar?")
- No product name. No feature list. No CTA button.

**Example structure:**
```
[Pain stat or sharp observation — 1 sentence]

[Why this is expensive or risky — 1-2 sentences]

[Soft close question — 1 sentence]

[First name]
```

---

### Email 2 — Nurture (Day 4)

**Goal:** Introduce the approach. Build credibility. Still no hard sell.

**Subject line rules:**
- "Re:" thread format OR a specific insight question
- Under 50 characters
- Can reference the angle but not "Vantage Pulse" by name yet

**Body rules:**
- 80-100 words maximum
- Introduce the solution approach (not the product name directly)
- Use one AccessOne proof point or benchmark stat
- End with an open question that invites a reply ("Is this something you're seeing too?")
- One soft call-to-action if needed ("Happy to share how others solved this")

**Example structure:**
```
[Bridge from Email 1 — acknowledge the pain again briefly]

[The approach that works — 1-2 sentences, outcome-led]

[Proof point — AccessOne stat or industry benchmark, with attribution]

[Open question or soft CTA — 1 sentence]

[First name]
```

---

### Email 3 — Conversion (Day 8)

**Goal:** Name the product. State outcomes. Drive to a specific action.

**Subject line rules:**
- Direct and specific — clarity over cleverness
- Can name Vantage Pulse or a specific outcome
- Under 50 characters

**Body rules:**
- 60-80 words maximum
- Name Vantage Pulse explicitly
- State 1-2 concrete outcomes tied to the angle
- One hard CTA: "Book 15 min" / "See a demo" / reply to schedule
- **PS line** (mandatory): one approved proof point from the list below

**Example structure:**
```
[Direct opener — what Vantage Pulse does for this pain]

[1-2 concrete outcomes — stat or capability]

[Hard CTA — specific and low-friction]

[First name]

PS. [Proof point — AccessOne stat or platform scale]
```

---

## Approved Proof Points

Use only these. Never fabricate or extrapolate.

### AccessOne (Primary)
- 67% participation rate in month one (industry benchmark: 30–50%)
- eNPS 45 (industry average: 10–30)
- "Seeing honest feelings in real numbers? Priceless. We could actually watch morale lift after each change." — Cassidi Ross, HR Coordinator, AccessOne

### Platform Scale
- 700+ clients · 3.2M+ users · 100+ countries

### Industry Stats (Always Cite Source)
- Employees who feel heard are nearly 5x more likely to feel empowered — Salesforce
- 83% of employees would participate in an employee listening program — IBM
- $483B–$605B/year lost to disengagement — Gallup

---

## Voice Rules (All 3 Emails)

- **No** "I hope this email finds you well" or "I wanted to reach out"
- **No** em-dashes (`—`) — split into two sentences
- **No** feature lists — speak to outcomes only
- **No** exclamation marks
- **No** fabricated stats
- Short paragraphs: 1-2 sentences max per paragraph
- Confident and direct — not apologetic or over-formal

---

## Step 3 — Output

For each of the 3 emails, deliver:

```
### Email [N] — [Stage] (Day [N])

**Subject:** [subject line]
**Preview text:** [preview text]

---
[Body copy]
---

**CTA:** [CTA text] → [destination or "reply to schedule"]
```

Then a brief note on any A/B subject line variants worth testing.

---

## Quality Checklist

- [ ] CLAUDE.md read before writing
- [ ] Email 1: no product name, no feature list, 60-80 words
- [ ] Email 2: proof point included with attribution, 80-100 words
- [ ] Email 3: Vantage Pulse named, hard CTA, PS proof point
- [ ] All subject lines under 50 chars
- [ ] No "I hope this email finds you well" openers
- [ ] No em-dashes
- [ ] No exclamation marks
- [ ] No fabricated stats — every number from approved sources
- [ ] Persona pain point reflected in the angle
- [ ] PS line present in Email 3
