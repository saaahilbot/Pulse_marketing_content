---
name: pulse-blog
description: >
  Write a complete Astro/Markdown-ready blog post for Vantage Pulse targeting HR
  leaders. Reads product context from CLAUDE.md, live UI from /Pulse Screenshots/,
  and feature accuracy from VANTAGE_PULSE_FEATURE_LIST.md. Enforces brand voice,
  data accuracy, HR buyer framing, correct frontmatter, and anti-slop writing
  standards on every output.
user_invocable: true
arguments:
  - name: topic_or_keyword
    description: >
      The topic or primary keyword for the blog post.
      Examples: "how to improve employee survey participation", "eNPS best practices",
      "anonymous pulse survey benefits", "AI feedback analysis for HR".
    required: true
  - name: funnel_stage
    description: "awareness (TOFU), consideration (MOFU), or decision (BOFU). Auto-detected if omitted."
    required: false
---

# pulse-blog

Write a complete Astro/Markdown-ready Vantage Pulse blog post for HR leaders.

## Usage

```
/pulse-blog "how to improve employee survey participation rates"
/pulse-blog "eNPS tracking software" bofu
/pulse-blog "what is a pulse survey" awareness
```

---

## Context Files (Read First — Every Time)

| File | What to Use |
|------|-------------|
| `CLAUDE.md` | Brand voice, approved stats, personas, product features, content principles |
| `VANTAGE_PULSE_FEATURE_LIST.md` | Feature accuracy — use exact capability names |
| `Pulse Screenshots/` | UI descriptions and screenshot references for product sections |

---

## Step 1 — Parse Topic and Detect Funnel Stage

Extract from the topic:
- **Primary keyword** — what an HR leader would type into Google
- **Pain point** — the underlying problem behind the search
- **Funnel stage** (if not specified):

| Signal | Stage |
|--------|-------|
| "what is", "how does", "why", broad engagement terms | TOFU — Awareness |
| "best way to", "how to improve", "tips for", comparisons | MOFU — Consideration |
| "software", "platform", "tool", "Vantage Pulse vs" | BOFU — Decision |

---

## Step 2 — SERP Research (Before Outlining)

Search the top 5–8 ranking pages for the target keyword. Identify:
- Common headings and angles they use
- Gaps or weak points in their coverage
- Stats or studies they cite
- Word count and structure patterns

Use this to build a stronger, more differentiated outline.

---

## Step 3 — Build the Outline

Plan the structure before writing. Present the outline to the user and confirm before drafting the full post.

```
H1: [Primary keyword — punchy, benefit-led, 8-12 words]

Introduction (3-5 sentences):
  - See Intro Rules in Step 4 — write the intro AFTER reading those rules
  - Drop the reader into something real: a situation, a tension, a specific frustration HR people actually live
  - No stat dumps, no definitions, no hypothetical scenarios ("Imagine you're an HR manager...")
  - End with a sentence that makes the reader want to keep going — not a summary of what's ahead

H2: [Why this matters — context section]
H2: [Core section 1]
  H3: [Subsection if needed]
H2: [Core section 2]
  H3: [Subsection if needed]
H2: [Core section 3]
H2: [How Vantage Pulse solves it — product section]
  → Screenshot placement here
H2: [Proof — AccessOne case study or benchmark data]
Conclusion (1 short paragraph)
CTA: "Book a Demo" or "See How It Works"
```

---

## Step 4 — Write the Blog Post

### Voice Rules (Non-Negotiable)

- Write like a smart person talking to another smart person. Not like a press release. Not like a LinkedIn influencer.
- Lead with data, follow with meaning — land what every stat means for the reader
- Short sentences. Punchy, declarative statements.
- No em-dashes. Split into two sentences instead. Maximum one em-dash per 500 words if unavoidable.
- No corporate jargon: synergy, leverage, best-in-class, revolutionize, gamification
- Maximum 2-3 natural Vantage Pulse brand mentions
- Every stat must trace to an approved source in CLAUDE.md
- One central theme per post — do not drift or repeat the same point in different words
- Deliver a strong, original viewpoint where relevant
- Only include stats when they directly support the claim and add reader value — do not stack stats for the sake of it
- If something has a downside, say it. Unearned optimism reads as corporate.

### Intro Rules (Non-Negotiable)

The intro sets the entire tone. If it reads like a textbook, a press release, or a LinkedIn post, the reader is gone. Write it last — after the body is done, you know exactly what you're setting up.

**Who you are writing for:** HR people at every level — generalists, managers, directors, CHROs. They are busy, skeptical of content that wastes their time, and they have read a thousand blog posts that promised insight and delivered definitions. Write for the person who has been in HR long enough to be tired of obvious advice and just wants someone to get to the point.

**The model to follow — conversational and earned:**

The best intros do three things in sequence:

1. Open with a plain, real observation — something the reader already knows to be true but hasn't seen said plainly. Not a stat. Not a definition. A statement that lands like "yes, exactly."
2. Build one layer of context that sharpens the observation — why it matters, why it persists, what makes it frustrating.
3. End with a sentence that frames what the post will do about it — not a summary of sections, but a direction. "Here's what actually works." "That's the problem this post addresses." "The fix is simpler than most teams make it."

The reader should finish the intro thinking: *this person gets it, and they're going to tell me something worth reading.*

**Personality the intro must have — all four, simultaneously:**
- **Sharp.** First sentence says something real. No warm-up. No easing in.
- **Warm.** Sounds like a smart colleague, not a consultant. Conversational. Uses "you" and "your team" naturally.
- **Confident.** Takes a position. Names something that isn't working. Does it without being preachy.
- **Human before data.** If a stat appears, it follows an observation — it never leads cold.

**What the intro must never do:**
- Open with a stat or data point as the very first sentence
- Sound like a definition: "A pulse survey is a short, recurring questionnaire..." — glossary entry, not an opening
- Use a hypothetical scenario: "Imagine you're an HR manager..." — condescending, readers skip it
- Run longer than 4 sentences
- Summarize what the post covers: "In this article, we'll explore..." — filler, the reader can see the headings
- Open with a scenario that explains the reader's own job back to them — e.g. "Your annual survey closed in December. Results landed in February..." — this is patronizing dressed up as empathy
- Use any banned phrases, especially: "In today's fast-paced world", "Employee engagement is crucial", "Now more than ever", "It's no secret that"

**Three worked examples — study the pattern:**

Bad (scenario opener — explains HR's job back to them):
> Your annual engagement survey closed in December. Results landed in February. Leadership reviewed them in March. You're now making decisions about a workforce that may look nothing like it did four months ago.

Why it fails: The reader already lived this. Narrating it back feels like the writer padding before they have something to say.

---

Bad (definition opener):
> Employee engagement is one of the most important factors in organizational success. In today's competitive landscape, HR leaders need tools that help them stay connected to their workforce. Pulse surveys are one such tool.

Why it fails: No position. No tension. Sounds like every other HR blog post written in the last decade.

---

Good (drops reader into something real, earns the topic):
> Your employees know something you don't. They knew it last month too. The question is whether your feedback system is fast enough to catch it before it becomes a resignation, a disengaged team, or a problem your CEO is asking about.
>
> That's the job pulse surveys are built for.

Why it works: First sentence creates immediate stakes without explaining HR's job back to them. No scenario, no framing, no warm-up. The reader feels addressed, not lectured. The second paragraph lands the topic in one sentence and earns the read.

**The trap to avoid — the "annual surveys are late" frame:**

Even when worded sharply, intros that orbit the idea of "annual surveys give you data too late" are still the same idea in different clothes. Avoid all variations of this pattern:
- "Your annual survey closed in December. Results landed in February..."
- "Feedback that arrives three months late isn't feedback..."
- "Most HR teams find out too late..."
- "The annual survey is a snapshot. Pulse surveys are real-time..."

These feel clever but describe a problem HR already knows. They don't say anything the reader hasn't heard. Start somewhere more human — a resignation nobody saw coming, a town hall that felt off, a manager who kept saying everything was fine. The timing problem with annual surveys can be made as part of the body. It should not be the intro's entire idea.

---

### Sentence and Paragraph Rhythm

- Vary paragraph length. Not every paragraph is 3-4 sentences. Use one-sentence paragraphs when the content calls for it. Use longer paragraphs when the argument needs it.
- Vary sentence length. A string of 15-20 word sentences in a row sounds generated. Mix short and long.
- Do not lead sentences with participial phrases: "Leveraging advanced analytics, the team improved conversion" → "The team improved conversion by using better analytics."
- Do not tack on "ensuring" clauses at the end of sentences. If accuracy matters, make it its own sentence with evidence.
- Passive voice is fine when the actor doesn't matter. Name the actor when you know them.

### Length

1,500–2,500 words. Each H2 section: 150-300 words with a clear takeaway.

### Product Section

Pick 1-2 features directly relevant to the topic. Use exact in-product feature names from the screenshots. Describe what HR sees and what they can do — not how it works technically.

Match topic to screenshot:

| Topic Area | Screenshot |
|-----------|------------|
| Dashboard / engagement scores / overview | `Engagement dashboard.png` |
| Heatmap / department segmentation / critical scores | `Heatmap.png` |
| Sentiment analysis / AI feedback summary / comments | `Sentiment trend graph.png` |
| Anonymous conversations / AI-assisted HR replies | `Anonymous response interface.png` |
| Survey creation / getting started | `Survey creation dashboard.png` |
| Template library / pre-built surveys | `Template selection view.png` |
| Question bank / custom questions | `Custom survey builder2.png` |
| Category scores / performance overview | `Performance score breakdown.png` |
| Department-level insights | `Department-wise insights.png` |
| Word cloud / open-ended analysis | `Word-Cloud.png` |
| Employee survey UX / anonymity trust | `Survey attempt page.png` |
| Mobile survey experience | `Survey attempt page-mobile.png` |

Image format — use Cloudinary URL from the Product Image Manifest. Placeholder when URL is not yet known:
```markdown
![Vantage Pulse [feature description]][PULSE_SCREENSHOT: filename.png]
```

Place image **after the H2 heading** or after the first 1-2 context sentences — never at the end of a section. Do not cluster screenshots together or over-use them.

### Formatting

**Tables:** Use HTML tables, not markdown pipes.
```html
<table>
<thead><tr><th>Header 1</th><th>Header 2</th></tr></thead>
<tbody>
<tr><td>Cell 1</td><td>Cell 2</td></tr>
</tbody>
</table>
```

**Images — product screenshots:** Use the markdown image syntax with a Cloudinary URL. Get the correct URL and alt text from the Product Image Manifest at `sources/VantageCircle-ProductImage-Manifest.xlsx`.
```markdown
![Vantage Pulse [feature description]](https://res.cloudinary.com/vantagecircle/image/upload/w_auto,dpr_auto,q_auto,f_auto/[image-path].png)
```

Use a placeholder when the exact Cloudinary URL is not yet known:
```markdown
![Vantage Pulse [feature description]][PULSE_SCREENSHOT: filename.png]
```

**Callout blocks** for recommended resources:
```html
<p class="cta-callout"><b>Recommended Resource:</b> <a href="/en/blog/other-post/">Link text here</a></p>
```

**Blockquotes** for pull quotes:
```markdown
> Quote text here.
>
> – Speaker Name, Title, Company
```

---

## Step 5 — Frontmatter and SEO

### Frontmatter Block

Every post must include a complete YAML frontmatter block at the top. Output this as part of the final file:

```yaml
---
title: ""
slug: ""
date: YYYY-MM-DD
updated: YYYY-MM-DD
author: "vceditorialteam"
tags:
  - employee-engagement
type: "post"
excerpt: ""
meta_title: ""
meta_description: ""
featured_image: "https://res.cloudinary.com/vantagecircle/image/upload/w_auto,dpr_auto,q_auto,f_auto/[image-path].png"
featured: false
popup_variant: ""
podcast_guest: ""
---
```

Field guidance:
- `title` — post title, shown on page and in listings
- `slug` — hyphenated primary keyword, must match the filename without `.md`
- `date` and `updated` — use today's date for both on first publish
- `author` — use `vceditorialteam` unless a specific author slug is provided
- `tags` — choose from approved tags: `employee-engagement`, `company-culture`, `leadership`, `hr-technology`, `ai-in-hr`, `team-building`, `work-life`, and others in use across `content/en/posts/`
- `excerpt` — 140-155 chars, keyword + proof point + soft CTA. Used as meta description if `meta_description` is left empty.
- `meta_title` — leave empty to use `title`
- `meta_description` — leave empty to use `excerpt`
- `featured_image` — Cloudinary URL for the hero image
- `featured` — leave `false` unless instructed otherwise
- `podcast_guest` and `popup_variant` — leave empty for standard blog posts

### Secondary Keywords

Include 2-3 LSI terms naturally in the body. Do not force them.

### Internal Links

Link to relevant Pulse blog posts where contextually appropriate.

Format: `[anchor text](/en/blog/relevant-slug/)`

### External Links

Format: `[anchor text](https://exact-url-to-source.com)`

Only link when the source directly supports the specific claim. Do not add links just to have them.

**NEVER link to competitor sites:** CultureMonkey, CultureAmp, Qualtrics, Lattice, SurveyMonkey, Typeform, Culture Amp, Leapsome, 15Five, Workday, or any HR tech vendor that competes with Vantage Circle products.

### Stat Sourcing Rules (CRITICAL)

Every statistic used in a post must meet all four of these requirements:

**1. Real and verified.** The stat must exist at the source. Do not paraphrase a number into a stat, do not round aggressively, do not reconstruct a stat from a summary. If you cannot confirm the exact number at the source, do not use the stat.

**2. From an approved source type.** Acceptable sources:
- Peer-reviewed academic journals (e.g. Journal of Applied Psychology, Harvard Business Review research papers)
- Government and institutional bodies (e.g. U.S. Bureau of Labor Statistics, OECD, WHO, ILO)
- Established independent research organizations (e.g. Gallup, McKinsey Global Institute, Deloitte Insights, PwC, SHRM, MIT Sloan Management Review)
- University research centers and published studies

**Banned source types — never use stats from:**
- Competitor survey tools or HR tech vendors: SurveyMonkey, Qualtrics, Culture Amp, Leapsome, 15Five, Glint, Lattice, Workday, Medallia, or any company that sells employee engagement, survey, or HR software
- Self-published vendor "reports" or "state of the industry" white papers from software companies — these are marketing, not research
- Press releases, blog posts, or infographics without a cited primary study behind them
- Social media posts or LinkedIn articles
- Any source that cannot be independently verified

**3. Linked to the exact page.** The URL must go directly to the report, study, or page where the stat appears — not to a homepage, a press release, or a landing page. If the stat is from a PDF, link to the PDF. If it is on a specific page of a report, link to that page. A reader clicking the link must be able to find the number without searching.

**4. Used in context.** Do not strip caveats from a stat to make it sound stronger. If Gallup says "up to 23% more profitable," do not write "23% more profitable." If a study is from 2018, consider whether it is still current enough to use.

---

## Step 6 — Output Order

1. **Complete `.md` file** — frontmatter block followed by the full post body, ready to drop into `content/en/posts/[slug].md`
2. **Screenshot placement notes** — list each `[PULSE_SCREENSHOT: filename.png]` placeholder with the recommended alt text and a note to look up the Cloudinary URL in the Product Image Manifest

---

## Approved Proof Points

### AccessOne (Primary Case Study)
- **67% participation rate** in month one (industry benchmark: 30–50%)
- **eNPS 45** (industry average: 10–30) — Promoters 58%, Passives 29%, Detractors 13%
- Critical alert example: Customer Success dept — Relationship with Peers: **20** (red)
- **Approved quote:** "Seeing honest feelings in real numbers? Priceless. We could actually watch morale lift after each change." — Cassidi Ross, HR Coordinator, AccessOne

### Platform Scale
- 700+ clients · 3.2M+ users · 100+ countries

### Industry Stats

Stats may only be used if they meet the sourcing rules in Step 5. Every stat must have a direct URL to the exact page or document where the number appears.

The three stats below are approved in principle but **must be verified and linked before use**. Before including any of them in a post, confirm the exact number at the source URL and use that URL as the inline link. If the source page has moved, the stat has changed, or you cannot locate the exact figure, do not use the stat.

| Stat | Source | Action required |
|------|--------|-----------------|
| Employees who feel heard are nearly **5x more likely** to feel empowered | Salesforce "State of the Connected Customer" report | Find the exact report edition and page. Link directly to the PDF or report page. |
| **83% of employees** would participate in a listening program | IBM Smarter Workforce Institute | Find the exact study. Link directly to the study or its IBM landing page. |
| **$483B–$605B/year** lost to disengagement | Gallup "State of the Global Workplace" report | Find the exact report year and page. Link to the Gallup report page or PDF. |

When adding new stats beyond these three, follow the same process: confirm the number, confirm the source qualifies, get the direct URL, then use it.

### Approved Pull Quotes (Use Verbatim)
- "You can't fix what you don't hear in time."
- "Other Tools Give You Dashboards. We Give You Decisions."
- "Inaction isn't neutral — it's expensive."

---

## DISALLOWED Terms and Phrases

Never use any of the following under any circumstance. No exceptions.

### Pulse-specific bans
They aren't just / They don't just / It isn't / The real shift /
This is about / This isn't / it's not / "fluff" /
"Here's the kicker." / "void" /
"It's not about X. It's about Y." / "Not X. Y." / "This isn't X — it's Y." /
"Don't think of it as X. Think of it as Y." / "It's not just X." /
"Here's the truth" / "Let's be honest" / "Join us" /
"beacon" / "operational efficiency" / "crickets" / "authentic" /
"vanity metrics" / "pitch-slapped" / "through the noise" / "superpower(s)" /
"strike gold" / "secret weapon/arsenal" / "thrive" /
"skyrocket" / "soar" / "forget" / "evolve" /
"unleash" / "gamification"

### Universal AI-slop bans
delve / moreover / furthermore / albeit / indeed / utilize / leverage (verb) /
facilitate / robust / seamless / comprehensive / cutting-edge / holistic /
synergy / paradigm / innovative / transformative / empower / realm /
tapestry / landscape (metaphorical) / multifaceted / nuanced / underscore /
testament / myriad / plethora / illuminate / foster / cultivate / spearhead /
bolster / pivotal / embark / navigate (metaphorical) / stakeholder / bandwidth /
actionable / ecosystem / craft (verb) / curate / resonate / streamline /
elevate / harness / unlock / tailor / journey / compelling / powerful /
impactful / crucial / significant / ensure/ensuring / optimal / drives (as in "drives results") /
enables / aligned/aligns with / key (adj.) / space (as in "the AI space") /
stands out / double down / deep dive / circle back / unpack /
shed light on / pave the way / set the stage / raise the bar / move the needle /
revolutionize / embrace / "here's the thing" / "Let me explain" / "Honestly?" /
"nevertheless" / "nonetheless" / "notwithstanding" / "game-changer" /
"Delve" / "embark"

### Banned throat-clearing phrases (delete entirely — start with the point)
- "It's important to note that..."
- "It's worth mentioning that..."
- "It goes without saying..."
- "In today's [X] landscape..."
- "Let's dive/delve into..."
- "Without further ado..."
- "In this article, we will..."
- "As we all know..."
- "Let's break it down"
- "Let's unpack this"

### Banned empty hedges
- "To be fair..." / "To be honest..."
- "At the end of the day..."
- "When it comes to..."
- "In terms of..."
- "With respect to..."
- "It's crucial/critical/essential to..."
- "It's no secret that..."
- "It's clear that..." / "It's evident that..."
- "It's no surprise that..."
- "Needless to say..."

### Banned fake-casual honesty markers
- "And honestly?" / "Honestly,"
- "I'll be honest..."
- "If I'm being honest..."
- "Candidly," / "Frankly,"
- "Real talk:"
- "The truth is..."
- "I won't sugarcoat it..."

### Banned AI enthusiasm
- "This is a game-changer"
- "...and that's a good thing!"
- "Here's the thing:"
- "The good news is..."
- "The beauty of this is..."
- "What's exciting is..."
- "Excited to share..."
- "Thrilled to announce..."

### Banned lazy closers
- "In conclusion..." / "To sum up..." / "To wrap up..."
- "Only time will tell..."
- "Remains to be seen..."
- "The future of X is Y"
- "Feel free to reach out" / "Don't hesitate to..."
- "Food for thought"
- "What do you think?" (as a tag-on closer)

### Banned corporate filler
| Kill | Use instead |
|------|-------------|
| Moving forward | (delete) |
| Going forward | (delete) |
| At this point in time | now |
| Due to the fact that | because |
| In order to | to |
| Has the ability to | can |
| Prior to | before |
| Subsequent to | after |
| In close proximity to | near |
| A large number of | many |
| In the event that | if |
| On a daily basis | daily, every day |
| With regard to | about |
| For the purpose of | to, for |
| In light of the fact that | because, since |

### Banned empty transitions
- "With that in mind..."
- "Building on this foundation..."
- "Taking this a step further..."
- "That being said..."
- "Having said that..."
- "With that said..."
- "On a related note..."

### Banned hook openers
- "Imagine a world where..."
- "Picture this:"
- "What if I told you..."
- "Have you ever wondered..."
- "Whether you're a [X] or a [Y]..."
- "Here are X things you need to know about Y"
- "First and foremost..."
- "At its core..."

### Banned sentence starters
- "So," (unless answering a direct question)
- "Well,"
- "Now," (unless actually about timing)
- "Look," / "Listen,"
- "Basically," / "Essentially,"
- "Certainly," / "Surely,"
- "Interestingly," / "Fascinatingly,"

---

## Additional Content Rules (CRITICAL)

### Structure bans

**No "it's not X, it's Y" constructions.** Never define something by negating a lesser version of it. This pattern is one of the most common forms of empty writing — it sounds like a revelation but contains no information. Apply this ban to every variation of the pattern.

Banned patterns (all forms):
- "It's not X, it's Y." / "It isn't X. It's Y."
- "This isn't just a tool — it's a complete solution."
- "Not a survey. A strategy."
- "Don't think of it as feedback. Think of it as data."
- "It's not about the numbers. It's about the people."
- "This isn't X. This is Y."
- "We're not just a survey tool. We're a better way to lead." ← approved pull quote exception only
- Any sentence that defines something primarily through contrast with a weaker version of itself

Fix: state what the thing actually is or does. Drop the negation entirely.
Bad: "It's not just a dashboard — it's a decision engine."
Good: "It surfaces the decisions you'd otherwise miss."

**No rhetorical questions.** State the point directly.
Bad: "What makes this different? Everything."
Good: State the answer without the setup.

**No rule of three by default.** Vary list sizes. Use one detail, two, or four. The number should match what you actually have to say, not a pattern.
Bad: "It's fast, reliable, and easy to use."
Good: "It's fast and reliable." (if those are the two things that matter)

**No synonym stacking.** Listing near-synonyms is padding.
Bad: "a comprehensive, sophisticated, and robust platform"
Good: "a solid platform" (or describe what makes it solid)

**No dramatic fragments for false tension.**
Bad: "She waited. And waited. Nothing."
Vary sentence length because the content calls for it.

**Em dash limit: one per 500 words maximum.** When in doubt, use a comma or a period.
- Do not use em dashes as parenthetical pairs — use commas instead.
- Do not use em dashes for dramatic reveals — use a period and a new sentence.
- Never stack multiple em dashes in one sentence or paragraph.

**Colon limit: one per 300-400 words.** Colons introduce lists or direct explanations. They are not dramatic pause marks.
- Do not use colons to build to a one-word punchline: "There was only one problem: trust."
- Do not open every other paragraph with a colon-framed reveal.
- "The bottom line: this changes everything" is throat-clearing. Cut the setup.

**No excessive bold or italics.** Maximum once per 500 words. Use word choice and sentence structure for emphasis, not formatting.

**No over-formatting.** No bullet points in narrative writing — write in sentences. No section headers unless the content is long enough to need navigation. No numbered lists unless order matters.

### Over-explanation bans

- Do not explain why a fact is interesting. State the fact and let the reader decide.
- Do not narrate your own reasoning: "This means that..." / "What this tells us is..."
- Do not summarize what you just said at the end of a section or the post. When you are done, stop.
- Do not write a conclusion paragraph that restates everything. If the last real point has been made, the piece is over.

### Authority and citation rules

- Do not invoke unnamed authorities: "Research shows..." / "Studies indicate..." / "Experts agree..." without a source. Either cite the source with a direct URL or do not make the claim.
- Every stat must meet all four requirements in the Stat Sourcing Rules (Step 5): real and verified, from an approved source type, linked to the exact page, used in context.
- Do not use stats from competitor HR tech vendors or vendor-published survey reports — these are marketing, not research.
- If you cannot find a direct URL to the exact page where a stat appears, do not use the stat.

### Formatting bans specific to this skill

- No redundancy — do not say the same thing twice in different words
- One central theme per post — stay focused throughout
- No "gamification" language — that belongs to Vantage Fit, not Pulse
- Written for HR buyer (CHRO, HR Director), not employees

---

## Pre-Delivery Filter

Before submitting the post, pass every sentence through these four questions:

1. **Can I delete this word or phrase without losing meaning?** Delete it.
2. **Is this the simplest way to say this?** Simplify.
3. **Would I say this out loud to a colleague?** If not, rewrite.
4. **Does this add information or just sound impressive?** If the latter, cut it.

Also do a final read-aloud check. If any section sounds like a TED talk intro, a LinkedIn thought leader post, a press release, or a corporate memo — rewrite it.

---

## Quality Checklist (38 items)

**Research and structure**
- [ ] CLAUDE.md read before writing
- [ ] SERP research done before outlining
- [ ] Outline confirmed with user before drafting
- [ ] One central theme — no drift

**Intro quality**
- [ ] Intro written last — after the body is complete
- [ ] Opens with a real situation or tension, not a stat or a definition
- [ ] No hypothetical scenarios ("Imagine you're an HR manager...")
- [ ] No summary of what the post covers ("In this article, we'll...")
- [ ] 4 sentences maximum
- [ ] Last sentence creates forward momentum — makes continuing feel necessary

**Voice and writing quality**
- [ ] No disallowed terms (Pulse-specific and universal lists)
- [ ] No banned phrases (throat-clearing, hedges, honesty markers, enthusiasm, closers, filler, transitions, hooks)
- [ ] No rhetorical contrasts ("This isn't X, it's Y")
- [ ] No rhetorical questions
- [ ] No synonym stacking
- [ ] No rule-of-three default — list sizes vary
- [ ] No em-dash abuse — max one per 500 words
- [ ] No colon abuse — max one per 300-400 words
- [ ] No participial phrase sentence openers
- [ ] No tacked-on "ensuring" clauses
- [ ] No unnamed authority citations ("Research shows...")
- [ ] No over-explanation or self-narration
- [ ] No summary/conclusion paragraph that restates everything
- [ ] Paragraph and sentence lengths varied throughout
- [ ] No relentless positivity — downsides acknowledged where real

**Content accuracy**
- [ ] Every stat is real and verified at the source — not reconstructed or paraphrased into existence
- [ ] Every stat is from an approved source type (journal, government body, independent research org) — not from a competitor HR tech vendor or vendor white paper
- [ ] Every stat links directly to the exact page or document where the number appears — not a homepage or landing page
- [ ] No stat is stripped of its original caveats to sound stronger
- [ ] Feature names match exact in-product UI labels
- [ ] Written for HR buyer (CHRO, HR Director), not employees
- [ ] No "gamification" language — that's Vantage Fit, not Pulse
- [ ] AccessOne quote attributed correctly (Cassidi Ross, HR Coordinator, AccessOne)
- [ ] Maximum 2-3 brand mentions

**Formatting and SEO**
- [ ] Tables use HTML — not markdown pipes
- [ ] Screenshots use Cloudinary markdown format (or placeholder) — not clustered, not salesy
- [ ] 1,500–2,500 words
- [ ] Frontmatter block complete — title, slug, date, author, tags, excerpt, featured_image all filled
- [ ] Slug matches filename (without .md)
- [ ] Excerpt is 140-155 chars
- [ ] CTA at end of post
- [ ] Internal links use `/en/blog/slug/` format
- [ ] No competitor links
