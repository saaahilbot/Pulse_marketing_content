---
name: pulse-linkedin
description: >
  Write a single LinkedIn post for Vantage Pulse targeting HR leaders. Supports
  four post types: data post, feature post, story post, and thought leadership post.
  Reads approved proof points and brand voice from CLAUDE.md. Enforces punchy
  hooks, correct line-break formatting, and screenshot recommendations.
user_invocable: true
arguments:
  - name: angle
    description: >
      The topic or angle for the post.
      Examples: "eNPS tracking", "AI-assisted HR replies", "AccessOne case study",
      "why employees don't fill in surveys", "heatmap feature".
    required: true
  - name: post_type
    description: "data, feature, story, or thought-leadership. Auto-detected if omitted."
    required: false
---

# pulse-linkedin

Write a single Vantage Pulse LinkedIn post for HR leaders.

## Usage

```
/pulse-linkedin "67% participation rate AccessOne"
/pulse-linkedin "heatmap feature" feature
/pulse-linkedin "why employees don't fill in surveys" thought-leadership
/pulse-linkedin "AI assistant for HR replies" feature
```

---

## Context Files (Read First — Every Time)

| File | What to Use |
|------|-------------|
| `CLAUDE.md` | Approved stats, pull quotes, brand voice, personas |
| `Pulse Screenshots/` | Visual recommendation for the post |

---

## Step 1 — Detect Post Type

| Signal | Post Type |
|--------|-----------|
| Stat, research finding, industry data | `data` — lead with the number |
| Product feature or capability | `feature` — lead with the outcome it produces |
| Case study or proof point (AccessOne) | `story` — lead with the result |
| Opinion, framework, or HR leadership insight | `thought-leadership` — lead with a bold claim |

---

## Step 2 — Write the Post

### Format (All Post Types)

```
[Hook — 1 punchy line. No preamble.]
(blank line)
[Context — why this matters. 1-2 sentences.]
(blank line)
[Payload — 3-5 short lines. One idea per line. Use line breaks generously.]
(blank line)
[Vantage Pulse angle — 1-2 sentences. Soft, not salesy.]
(blank line)
[Close — a specific question or bold statement. Not "What do you think?"]
(blank line)
[3-5 hashtags]
```

**Total length:** 150-300 words.

**The hook is everything.** LinkedIn shows ~2 lines before "See more." If the hook doesn't earn the click, nothing else matters. Write the hook last, after you know what the post says.

---

### Post Type Guidance

**Data post**
- Open with the number — not the source
- Good: `67% participation in month one.`
- Bad: `A recent study by IBM found that 83% of employees...`
- One stat maximum — never stat-stack
- Explain what it means for an HR leader in 1 line

**Feature post**
- Open with what the feature does for HR — not the feature name
- Good: `HR can now reply to anonymous feedback — without unmasking who sent it.`
- Bad: `Introducing the Two-Way Anonymous Conversation feature in Vantage Pulse.`
- Name the feature in the body, not the hook
- Close with a question that ties to a common HR fear

**Story post**
- Open with the result, not the setup
- Good: `AccessOne hit 67% survey participation in month one. Industry average: 30–50%.`
- Bad: `Let me tell you about one of our customers...`
- Tell it in 5-7 short lines: result → context → challenge → what changed → what it means
- Include the Cassidi Ross quote if it fits (use verbatim)

**Thought leadership post**
- Open with a bold, specific claim — not a question
- Good: `Most pulse surveys don't fail because employees are too busy. They fail because employees don't trust them.`
- Bad: `Have you ever wondered why survey participation is so low?`
- Argue a point. Take a position. Don't hedge.
- Vantage Pulse mention should feel like a natural example, not a plug

---

## Voice Rules

- No em-dashes (`—`) — use line breaks or periods instead
- No exclamation marks
- No "Excited to share..." or "Thrilled to announce..."
- No vague closes like "What do you think?" — use a specific, grounded question
- Approved pull quotes can be used verbatim (see list below)
- Maximum 1 brand mention — let the content do the work

---

## Approved Proof Points

### AccessOne
- 67% participation in month one (benchmark: 30–50%)
- eNPS 45 (industry average: 10–30)
- Promoters 58% · Passives 29% · Detractors 13%
- **Approved quote (verbatim):** "Seeing honest feelings in real numbers? Priceless. We could actually watch morale lift after each change." — Cassidi Ross, HR Coordinator, AccessOne

### Platform Scale
- 700+ clients · 3.2M+ users · 100+ countries

### Industry Stats (Always Cite Source in Post)
- Employees who feel heard are nearly 5x more likely to feel empowered — Salesforce
- 83% of employees would participate in a listening program — IBM
- $483B–$605B/year lost to disengagement — Gallup

### Approved Pull Quotes (Use Verbatim in Post Body or Close)
- "You can't fix what you don't hear in time."
- "Other Tools Give You Dashboards. We Give You Decisions."
- "Inaction isn't neutral — it's expensive."

---

## Screenshot Recommendation

Match the post angle to the best visual:

| Post Angle | Screenshot |
|-----------|------------|
| Dashboard / engagement score / overview | `Engagement dashboard.png` |
| Heatmap / critical score example | `Heatmap.png` ← highest-impact visual for ads |
| AI feedback / sentiment summary | `Sentiment trend graph.png` |
| Anonymous conversation / AI replies | `Anonymous response interface.png` |
| Survey creation / template library | `Survey creation dashboard.png` |
| Category performance / insights | `Performance score breakdown.png` |
| Employee UX / anonymity trust | `Survey attempt page.png` |

**Best-performing visual for reach:** `Heatmap.png` — the critical red score (04) makes HR leaders think "I need to know if I have one of these."

---

## Hashtags

Use 3-5 from this approved list. Match to topic:

```
#EmployeeEngagement
#PulseSurvey
#HRLeaders
#eNPS
#EmployeeFeedback
#PeopleAnalytics
#HRTechnology
#EmployeeExperience
#FutureOfWork
#HRStrategy
```

---

## Step 3 — Output

Deliver:
1. **Post copy** — ready to paste into LinkedIn
2. **Recommended screenshot** — filename + what to highlight or crop
3. **A/B hook variant** — one alternative first line worth testing

---

## Quality Checklist

- [ ] CLAUDE.md read before writing
- [ ] Hook works as a standalone line before "See more" cuts off
- [ ] 150-300 words
- [ ] One stat maximum — not stat-stacked
- [ ] Every stat from approved sources
- [ ] No em-dashes
- [ ] No exclamation marks
- [ ] No "What do you think?" close — specific question or bold statement instead
- [ ] No "Excited to share" or "Thrilled to announce"
- [ ] Vantage Pulse mentioned maximum once
- [ ] Cassidi Ross quote used verbatim if included
- [ ] 3-5 hashtags
- [ ] Screenshot recommendation included
- [ ] A/B hook variant included
