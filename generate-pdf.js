const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

function toBase64(filename) {
  const data = fs.readFileSync(path.join(__dirname, 'logos', filename));
  return `data:image/png;base64,${data.toString('base64')}`;
}

const pulseLogo = toBase64('Negative-VPulse.png');
const vcLogo    = toBase64('new-vc-logo.png');

// ── Questions data ────────────────────────────────────────────────────────────

const sections = [
  {
    num: '01', title: 'Overall Experience', kirkpatrick: 'Kirkpatrick Level 1 — Reaction',
    questions: [
      [1,  'The training met my expectations.', 'Likert'],
      [2,  'I found the training relevant to my role.', 'Likert'],
      [3,  'The length of the training was appropriate.', 'Likert'],
      [4,  'I was able to stay engaged throughout the session.', 'Likert'],
      [5,  'The training was well-organized.', 'Likert'],
      [6,  'Would you recommend this training to a colleague?', 'Yes / No'],
      [7,  'How would you rate your overall satisfaction with this training?', 'Multiple-choice'],
      [8,  'The session was worth the time I invested.', 'Likert'],
      [9,  'What did you like most about this training?', 'Open-ended'],
      [10, 'What could be improved for future sessions?', 'Open-ended'],
    ],
  },
  {
    num: '02', title: 'Learning Objectives', kirkpatrick: 'Kirkpatrick Level 2 — Learning',
    questions: [
      [11, 'The learning objectives were clearly stated.', 'Likert'],
      [12, 'The training objectives were met.', 'Likert'],
      [13, 'I understood how the content connected to the objectives.', 'Likert'],
      [14, 'The training addressed the skills I need in my job.', 'Likert'],
      [15, 'The learning objectives matched the pre-training communication.', 'Likert'],
      [16, 'Which objectives were most valuable to you?', 'Open-ended'],
      [17, 'Were there any objectives you felt were missing?', 'Open-ended'],
      [18, 'How confident are you in applying what you learned?', 'Multiple-choice'],
      [19, 'The objectives were realistic and achievable.', 'Likert'],
      [20, 'What additional skills would you like to see covered in future training?', 'Open-ended'],
    ],
  },
  {
    num: '03', title: 'Content Quality', kirkpatrick: 'Kirkpatrick Level 2 — Learning',
    questions: [
      [21, 'The training materials were clear and easy to understand.', 'Likert'],
      [22, 'The content matched my expectations.', 'Likert'],
      [23, 'The examples provided were relevant to my work.', 'Likert'],
      [24, 'The balance between theory and practice was appropriate.', 'Likert'],
      [25, 'The case studies or examples helped me learn.', 'Likert'],
      [26, 'How well did the content match your skill level?', 'Multiple-choice'],
      [27, 'The content was up to date.', 'Likert'],
      [28, 'The amount of information presented was manageable.', 'Likert'],
      [29, 'The content avoided unnecessary jargon.', 'Likert'],
      [30, 'How would you rate the usefulness of the content overall?', 'Multiple-choice'],
      [31, 'The training deepened my knowledge of the topic.', 'Likert'],
      [32, 'The training addressed real-world challenges.', 'Likert'],
      [33, 'Which content areas were most helpful to you?', 'Open-ended'],
      [34, 'Which content areas were least helpful?', 'Open-ended'],
      [35, 'What additional content should be included?', 'Open-ended'],
    ],
  },
  {
    num: '04', title: 'Trainer / Facilitator', kirkpatrick: 'Kirkpatrick Level 1 — Reaction',
    questions: [
      [36, 'The trainer explained concepts clearly.', 'Likert'],
      [37, 'The trainer was knowledgeable about the subject.', 'Likert'],
      [38, 'The trainer encouraged participation.', 'Likert'],
      [39, 'The trainer handled questions effectively.', 'Likert'],
      [40, 'The trainer kept the session engaging.', 'Likert'],
      [41, 'How approachable was the trainer?', 'Multiple-choice'],
      [42, 'The trainer used real-world examples effectively.', 'Likert'],
      [43, 'The trainer managed time well.', 'Likert'],
      [44, 'The trainer created an inclusive learning environment.', 'Likert'],
      [45, 'Any feedback for the trainer?', 'Open-ended'],
    ],
  },
  {
    num: '05', title: 'Delivery & Format', kirkpatrick: 'Kirkpatrick Level 1 — Reaction',
    questions: [
      [46, 'The training platform or room was easy to navigate.', 'Likert'],
      [47, 'The pace of delivery was appropriate.', 'Likert'],
      [48, 'The session format (online/in-person) worked well.', 'Likert'],
      [49, 'Technical issues were minimal.', 'Likert'],
      [50, 'The training allowed for interaction and discussion.', 'Likert'],
      [51, 'The visuals (slides, handouts) were clear.', 'Likert'],
      [52, 'The audio quality was clear.', 'Likert'],
      [53, 'Breaks were well-timed.', 'Likert'],
      [54, 'Which delivery method did you prefer?', 'Multiple-choice'],
      [55, 'How comfortable were you using the platform?', 'Likert'],
      [56, 'The delivery supported different learning styles.', 'Likert'],
      [57, 'The training was accessible (captions, transcripts, etc.).', 'Likert'],
      [58, 'What challenges did you face during delivery?', 'Open-ended'],
      [59, 'How could the delivery be improved?', 'Open-ended'],
      [60, 'Would you prefer a different delivery method in the future?', 'Multiple-choice'],
    ],
  },
  {
    num: '06', title: 'Application & Impact', kirkpatrick: 'Kirkpatrick Levels 3 & 4 — Behavior & Results',
    questions: [
      [61, 'I can apply what I learned immediately.', 'Likert'],
      [62, 'The training will help me perform better at work.', 'Likert'],
      [63, 'The training improved my confidence in the topic.', 'Likert'],
      [64, 'The training will positively impact my team.', 'Likert'],
      [65, 'The training supports my career development.', 'Likert'],
      [66, 'The training addressed real challenges I face at work.', 'Likert'],
      [67, 'I can already identify ways to use the training.', 'Likert'],
      [68, 'This training will help reduce errors or mistakes.', 'Likert'],
      [69, 'This training will improve customer outcomes.', 'Likert'],
      [70, 'How likely are you to use the new skills within 30 days?', 'Multiple-choice'],
      [71, 'The training filled a critical knowledge gap.', 'Likert'],
      [72, 'The training reinforced skills I already had.', 'Likert'],
      [73, 'What specific tasks will you apply this training to?', 'Open-ended'],
      [74, 'What challenges might stop you from applying it?', 'Open-ended'],
      [75, 'How can the company support you in applying it?', 'Open-ended'],
      [76, 'Did you discuss applying this training with your manager?', 'Yes / No'],
      [77, 'Do you need follow-up support?', 'Yes / No'],
      [78, 'What kind of support would help you apply the training?', 'Open-ended'],
      [79, 'Do you see this training affecting your long-term growth?', 'Yes / No / Unsure'],
      [80, 'The training will contribute to organizational goals.', 'Likert'],
    ],
  },
  {
    num: '07', title: 'Accessibility & Inclusion', kirkpatrick: 'Kirkpatrick Level 1 — Reaction',
    questions: [
      [81, 'The training was accessible to all participants.', 'Likert'],
      [82, 'I was able to fully participate without barriers.', 'Likert'],
      [83, 'The training considered diverse perspectives.', 'Likert'],
      [84, 'Accessibility features (captions, transcripts) were helpful.', 'Likert'],
      [85, 'The training environment was inclusive.', 'Likert'],
      [86, 'Were you able to request accommodations if needed?', 'Yes / No'],
      [87, 'The materials were easy to read and understand.', 'Likert'],
      [88, 'I felt respected during the session.', 'Likert'],
      [89, 'What could make the training more inclusive?', 'Open-ended'],
      [90, 'What accessibility supports were most valuable to you?', 'Open-ended'],
    ],
  },
  {
    num: '08', title: 'Post-Training Evaluation', kirkpatrick: 'Kirkpatrick Levels 3 & 4 — Behavior & Results',
    questions: [
      [91,  'What was the most valuable part of this training?', 'Open-ended'],
      [92,  'What was the least valuable part?', 'Open-ended'],
      [93,  'Did the training meet your expectations overall?', 'Yes / No'],
      [94,  'How could we improve this training for the future?', 'Open-ended'],
      [95,  'Was the timing of the training convenient?', 'Yes / No'],
      [96,  'If you could change one thing, what would it be?', 'Open-ended'],
      [97,  'Would you like more advanced training on this topic?', 'Yes / No'],
      [98,  "Are there other topics you'd like training on?", 'Open-ended'],
      [99,  'Any final comments or suggestions?', 'Open-ended'],
      [100, 'Overall, how would you rate this training?', 'Multiple-choice'],
    ],
  },
];

// ── HTML builder ──────────────────────────────────────────────────────────────

function questionsHTML() {
  return sections.map(s => {
    const rows = s.questions.map(([num, q, fmt]) => {
      const odd   = num % 2 === 1;
      const rowBg = odd ? '#EEEEF6' : '#FFFFFF';
      const pilBg = odd ? '#FFFFFF' : '#EEEEF6';
      return `
        <div class="q-row" style="background:${rowBg}">
          <span class="q-num">${num}.</span>
          <span class="q-text">${q}</span>
          <span class="q-pill" style="background:${pilBg}">${fmt}</span>
        </div>`;
    }).join('');

    return `
      <div class="section-wrap">
        <div class="sec-header">
          <span class="sec-num">${s.num}</span>
          <span class="sec-title">${s.title} <span class="sec-count">(${s.questions.length} questions)</span></span>
          <span class="sec-kirk">${s.kirkpatrick}</span>
        </div>
        ${rows}
      </div>`;
  }).join('');
}

// ── Closing page ─────────────────────────────────────────────────────────────

function closingPageHTML() {
  const globeSvg = `<svg class="globe-bg" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
    <circle cx="300" cy="300" r="280" fill="none" stroke="#CDCDE4" stroke-width="0.8" opacity="0.18"/>
    <ellipse cx="300" cy="300" rx="280" ry="70"  fill="none" stroke="#CDCDE4" stroke-width="0.6" opacity="0.13"/>
    <ellipse cx="300" cy="300" rx="280" ry="140" fill="none" stroke="#CDCDE4" stroke-width="0.6" opacity="0.13"/>
    <ellipse cx="300" cy="300" rx="280" ry="210" fill="none" stroke="#CDCDE4" stroke-width="0.6" opacity="0.13"/>
    <line x1="300" y1="20"  x2="300" y2="580" stroke="#CDCDE4" stroke-width="0.6" opacity="0.13"/>
    <ellipse cx="300" cy="300" rx="70"  ry="280" fill="none" stroke="#CDCDE4" stroke-width="0.6" opacity="0.13"/>
    <ellipse cx="300" cy="300" rx="140" ry="280" fill="none" stroke="#CDCDE4" stroke-width="0.6" opacity="0.13"/>
    <ellipse cx="300" cy="300" rx="210" ry="280" fill="none" stroke="#CDCDE4" stroke-width="0.6" opacity="0.13"/>
  </svg>`;

  return `
  <div class="closing-page">
    ${globeSvg}
    <div class="closing-inner">
      <h2 class="closing-heading">
        Trusted by Industry Leaders &amp; Recognized for <span class="orange">Excellence</span>
      </h2>


      <p class="demo-sub">Take the first step to explore our platform</p>
      <div class="demo-btn">Schedule a Demo</div>

      <p class="thank-you-title">Thank You</p>
      <p class="powered-by">Powered by Vantage Circle's Global Infrastructure</p>

      <div class="stats-row">
        <div class="stat-card">
          <span class="stat-num">100+</span>
          <span class="stat-lbl">Countries</span>
        </div>
        <div class="stat-card">
          <span class="stat-num">700+</span>
          <span class="stat-lbl">Clients</span>
        </div>
        <div class="stat-card">
          <span class="stat-num">3.2M+</span>
          <span class="stat-lbl">Users</span>
        </div>
      </div>

      <p class="copyright">Vantage Circle 2025 | All Rights Reserved.</p>
    </div>
  </div>`;
}

// ── Footer template (Puppeteer) ───────────────────────────────────────────────

const footerTpl = `
  <div style="
    width:100%; padding: 0 20mm; box-sizing:border-box;
    font-family: Arial, sans-serif;
  ">
    <div style="
      border-top: 0.5px solid #CDCDE4; padding-top: 5px;
      display:flex; justify-content:space-between; align-items:center;
    ">
      <img src="${vcLogo}" style="height:11px;" />
      <span style="font-size:7pt; color:#505095;">
        Page <span class="pageNumber"></span>
      </span>
    </div>
  </div>`;

// ── Full HTML ─────────────────────────────────────────────────────────────────

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap" rel="stylesheet">
<style>

/* ── Reset ── */
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }

body {
  font-family: 'Lato', Arial, sans-serif;
  font-size: 9pt;
  color: #29294C;
  background: #fff;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ── Banner ── */
.banner {
  background: #29294C;
  /* bleed out of the 20mm content margins */
  padding: 28px 20mm 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  page-break-inside: avoid;
}

.banner-left {
  padding-right: 32px;
  border-right: 1px dotted #CDCDE4;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.banner-left img {
  width: 148px;
  display: block;
  margin-bottom: 16px;
}

.banner-title {
  font-size: 21pt;
  font-weight: 700;
  color: #fff;
  line-height: 1.2;
}

.banner-right {
  padding-left: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0;
}

.how-to-label {
  font-size: 9.5pt;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
}

.how-to-text {
  font-size: 8pt;
  color: #CDCDE4;
  line-height: 1.6;
}

/* ── Section wrapper ── */
.section-wrap {
  margin-top: 16px;
}

/* ── Section header ── */
.sec-header {
  background: #29294C;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 13px;
  page-break-after: avoid;
}

.sec-num {
  background: #FF6D05;
  color: #fff;
  font-weight: 700;
  font-size: 8pt;
  padding: 3px 9px;
  border-radius: 12px;
  flex-shrink: 0;
}

.sec-title {
  color: #fff;
  font-weight: 700;
  font-size: 10pt;
  flex: 1;
}

.sec-count {
  color: #CDCDE4;
  font-size: 8pt;
  font-weight: 400;
}

.sec-kirk {
  color: #8B8BC0;
  font-size: 6.5pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.6pt;
  flex-shrink: 0;
}

/* ── Question row ── */
.q-row {
  display: grid;
  grid-template-columns: 30px 1fr auto;
  gap: 10px;
  padding: 8px 13px;
  align-items: start;
  page-break-inside: avoid;
}

.q-num {
  font-size: 8.5pt;
  font-weight: 700;
  color: #505095;
  text-align: right;
  padding-top: 1px;
  flex-shrink: 0;
}

.q-text {
  font-size: 9pt;
  color: #29294C;
  line-height: 1.45;
}

.q-pill {
  font-size: 6.5pt;
  font-weight: 700;
  color: #505095;
  padding: 3px 9px;
  border: 0.5px solid #CDCDE4;
  border-radius: 10px;
  white-space: nowrap;
  align-self: start;
  margin-top: 1px;
}

/* ── Content area ── */
.content-area {
  padding: 0 20mm 4mm;
}

/* ── Closing page ── */
.closing-page {
  position: relative;
  background: #29294C;
  page-break-before: always;
  height: 277mm;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  padding: 36px 20mm 28px;
}

.globe-bg {
  position: absolute;
  bottom: -120px;
  left: 50%;
  transform: translateX(-50%);
  width: 320px;
  height: 320px;
  pointer-events: none;
  opacity: 0.6;
}

.closing-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex: 1;
  text-align: center;
}

.closing-heading {
  font-size: 22pt;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
  max-width: 520px;
}

.orange { color: #FF6D05; }

.clientele-label {
  font-size: 8.5pt;
  font-weight: 700;
  color: #CDCDE4;
  letter-spacing: 0.5pt;
  margin-bottom: 12px;
}

.logo-strip {
  background: #fff;
  border-radius: 10px;
  padding: 18px 28px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 22px;
}

.logo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.logo-divider {
  width: 1px;
  height: 36px;
  background: #CDCDE4;
  flex-shrink: 0;
}

.demo-sub {
  font-size: 11pt;
  color: #CDCDE4;
  margin-bottom: 0;
}

.demo-btn {
  background: #FF6D05;
  color: #fff;
  font-weight: 700;
  font-size: 12pt;
  padding: 14px 36px;
  border-radius: 28px;
  display: inline-block;
}

.thank-you-title {
  font-size: 15pt;
  font-weight: 700;
  color: #fff;
  margin-bottom: 6px;
}

.powered-by {
  font-size: 9.5pt;
  color: #CDCDE4;
}

.stats-row {
  display: flex;
  gap: 14px;
  justify-content: center;
  margin-bottom: 24px;
}

.stat-card {
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 14px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(4px);
}

.stat-num {
  font-size: 26pt;
  font-weight: 700;
  color: #FF6D05;
  line-height: 1;
}

.stat-lbl {
  font-size: 9pt;
  color: #CDCDE4;
  letter-spacing: 0.4pt;
}

.copyright {
  font-size: 7pt;
  color: #8B8BC0;
}

</style>
</head>
<body>

<div class="banner">
  <div class="banner-left">
    <img src="${pulseLogo}" alt="Vantage Pulse">
    <div class="banner-title">100 Training Effectiveness<br>Survey Questions</div>
  </div>
  <div class="banner-right">
    <div class="how-to-label">How to Use this Template:</div>
    <div class="how-to-text">
      100 ready-to-use training effectiveness survey questions
      organized by the Kirkpatrick Model. Copy questions into
      any survey platform, or print and distribute directly.
    </div>
  </div>
</div>

<div class="content-area">
  ${questionsHTML()}
</div>

${closingPageHTML()}

</body>
</html>`;

// ── Render ────────────────────────────────────────────────────────────────────

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const pg = await browser.newPage();

  await pg.setContent(html, { waitUntil: 'networkidle0' });

  await pg.pdf({
    path: path.join(__dirname, 'training-survey-template.pdf'),
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: footerTpl,
    margin: { top: '0mm', bottom: '20mm', left: '0mm', right: '0mm' },
  });

  await browser.close();
  console.log('Done → training-survey-template.pdf');
})();
