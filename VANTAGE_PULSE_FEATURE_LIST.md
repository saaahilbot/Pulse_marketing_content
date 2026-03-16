# Vantage Pulse — Detailed Feature List

**Product:** Vantage Pulse (employee survey & engagement feedback platform)  
**Purpose:** Comprehensive feature list for stakeholder review (e.g. CTO).

---

## About this document

This feature list was prepared by the **Product Management** team with support from **AI-assisted analysis** of the live codebase. It is based on:

- **Backend:** Pulse and Dashboard modules (Scala/Play), including routes, controllers, services, and models (e.g. `modules/pulse/`, `modules/dashboard/.../survey/`).
- **Frontend:** Pulse experiences in the standalone Pulse app (vc-pulse), the main rewards app (vantage-web), and shared Pulse components and APIs.

The content reflects what is implemented in the repository rather than marketing or roadmap material. It is intended to give leadership an accurate, detailed view of current Vantage Pulse capabilities.

**Sharing:** This file lives in the repo. To share via link, commit and push it, then share the repository file URL (e.g. GitHub/GitLab “View file” or raw link), or copy the contents into Confluence/Notion/Google Docs and share that link.

---

## 1. Employee Experience — Taking Surveys

## 1. Employee Experience — Taking Surveys

### 1.1 Survey access & delivery
- **Get survey** — Employee receives survey (by survey ID or next available), with company branding (logo) and pop-up data.
- **Demo survey** — Unauthenticated demo survey for prospects (e.g. “Vantage Pulse Demo Survey” with sample rated, open-ended, and MCQ questions).
- **Survey without login** — Magic-link / token-based survey attempt (`processTokenForAttemptSurveyWithoutLogin`) for email/Slack-style links.
- **Device support** — Web and MS Teams; optional restriction by company (e.g. no mobile for some tenants).
- **Skip survey** — Employee can decline/skip a survey (with reason); status tracked.

### 1.2 Question types
- **Rated (scale)** — Numeric rating (e.g. 1–5 or 1–10); used for engagement/eNPS-style questions.
- **MCQ (multiple choice)** — Single-select from configurable options (2–10 options per question).
- **Open-ended** — Free-text comment; optional character limit (e.g. 1000; configurable per company).
- **Optional comment** — On rated/MCQ questions, optional follow-up comment (with mandatory option per question).
- **Skip reason** — For rated questions: not applicable, not sure, no opinion, other (localized).

### 1.3 Survey experience
- **Question flow** — One question at a time; previous/next navigation; progress indication.
- **Anonymous surveys** — Survey can be configured as anonymous (`isAnonymous`).
- **Multi-language** — Questions and categories served in employee’s preferred language when translations exist.
- **Mandatory vs optional** — Per-question: question mandatory, comment mandatory (for rated).
- **Answer submission** — Submit per question or batch; backend returns success and optional incentive (e.g. points).
- **Emoji in comments** — Encode/decode for storage and display.

### 1.4 Incentives
- **Vantage Points** — Optional points reward on survey/answer completion; configurable per survey (`hasIncentive`).
- **Incentive in response** — API returns incentive details (e.g. points) after save.

### 1.5 Entry points (where employees see/take Pulse)
- **Standalone Pulse app (vc-pulse)** — Dedicated survey-taking experience (web).
- **Vantage Web (rewards app)** — Pulse home and survey flow inside main app; Pulse survey widget on rewards home (“Take survey” / “You have a 5 min survey”); redirect to `/ng/vantagepulse?id=<surveyId>`.
- **Pulse registration flow** — Landing and registration for Pulse (e.g. first-time or consent).
- **MS Teams** — Survey available in Teams context; device check for allowed clients.

---

## 2. Survey Creation & Configuration (Admin / Dashboard)

### 2.1 Survey lifecycle
- **Create survey** — Via config/update and template flow (create from template).
- **Update survey config** — Start/end date, duration (one_time, daily, weekly, monthly, quarterly, yearly), sending frequency, repeat, sending time (e.g. 10:00).
- **Play / Pause survey** — Start or stop a survey without deleting it.
- **Clean survey** — Admin cleanup (e.g. reset or remove test data).
- **Extend end date** — Extend survey closing date.
- **Change survey timing** — Adjust schedule (e.g. sending time).
- **Remove user from survey** — Exclude specific user from a survey.

### 2.2 Questions
- **Custom questions** — Create/update custom questions (single or bulk); question text, category, type (rated, MCQ, open_ended), mandatory flags, MCQ options (2–10).
- **Question categories** — Get categories; get questions by category; categories for templates.
- **Default questions** — Translate default question set; link default/custom questions to surveys.
- **Question list by survey** — Get all questions linked to a survey.
- **MCQ options** — Get/update options by question ID.
- **Question translations** — Save/update translations by question or by ID; get custom/company translations; search language.
- **Verify survey name** — Uniqueness/validation for survey name.

### 2.3 Templates
- **Survey templates** — Create, update, delete template; get all templates (paginated); get questions by template ID; update template description.
- **Default templates** — Refactor/default template setup.
- **Custom template** — Update custom template; link template to survey config.
- **DOJ (Date of Joining) templates** — Create DOJ questions; create DOJ email templates; get DOJ templates by triggers; get DOJ emails by triggers (onboarding: Day 7/15/30/45/60/90; tenure: Year 1/2/3/5/7/10).

### 2.4 Targeting & invitations
- **Add employee manually** — Manually add users to a survey (invite list).
- **Invite for engagement survey** — Add list of emails to an engagement survey; update invite list.
- **Target segmentation** — Segment by department, location, gender, BU, BU+sub-department, experience lifecycle, employee type, grade group, nationality, parent project (dashboard services); save departments for survey.
- **Update user data in survey invites** — Sync invite records with current user/department data (company-wide or by user).

### 2.5 Company & tenant config
- **Pulse premium company** — Get company config (is Pulse premium); save or update Pulse premium company config.
- **Add company for Pulse** — Onboard a company to Pulse.
- **Company survey languages** — Add supported languages for surveys; get survey company languages; get/save question translations per language.
- **Delete user for Pulse** — Remove a user from Pulse (e.g. by login).

### 2.6 Email & communications (admin)
- **Default survey emails** — Save/update default email template; get default; delete email template by ID.
- **Trigger test email** — Send test survey email.
- **Demo survey email** — Send demo survey to an email (e.g. employee_engagement type).

### 2.7 Benchmark & reference data
- **Benchmark data** — Get benchmark data (e.g. industry/comparative scores for dashboards).

---

## 3. Feedback & Conversation (HR–Employee)

### 3.1 Comments & feedback view
- **Survey comments by company** — List feedback/comments for a survey (paginated); sort by latest; filter by segment/custom filters; total count.
- **Survey comments by question** — Filter comments by question ID (with survey, filters, sort, offset, limit).
- **Topic-wise comments** — Comments grouped by topic/category for company.
- **Comments v2** — Enhanced list with sentiment filter, segment filter, read status, filter by tags, sort (e.g. latest).
- **Category-wise feedback count** — Count feedback per category for a survey.
- **Feedback count** — Total feedback count for survey.
- **Related feedbacks** — Get feedbacks related to a given answer (e.g. same question or theme).
- **Department for company** — Get department list for company (for filters).

### 3.2 Conversation (thread on an answer)
- **Get conversation (HR)** — Thread of replies for an answer (HR side).
- **Get conversation (user)** — Thread of replies for an answer (employee side).
- **Save HR reply** — HR/manager posts a reply to an answer.
- **Save user reply** — Employee posts a reply in the thread.
- **Read state** — Mark feedback as read (set read count to true).

### 3.3 Tags
- **Feedback tags** — Save, get, update, delete feedback tags (dashboard).
- **Tags on feedback** — Get all tags for company; add custom tag for company; add tag to feedback; remove tag from feedback; remove all tags from an answer.

---

## 4. Analytics & Reporting

### 4.1 Survey list for reports
- **Get surveys for report** — Paginated list of surveys available for reporting.
- **Search surveys for report** — Search by keyword (paginated).

### 4.2 Participation & responses
- **MCQ participation** — Participation metrics for MCQ questions (by survey, question, segment); v2 API available.
- **Open-ended participation** — Participation for open-ended questions (by survey, question, segment); v2 API.
- **MCQ option responses** — Response distribution per MCQ option (survey, question).
- **Compare participation** — Compare implementations/versions for participation metrics.
- **Compare MCQ option response** — Compare implementations for MCQ response data.

### 4.3 Report types (dashboard / CSV)
Reports support segments and categories; typical fields: survey name, dates, segment, category, engagement score, eNPS, participation rate, respondents, target audience, promoter/passive/detractor counts.
- **Department report** — By department.
- **Location / city report** — By location/city.
- **Gender report** — By gender.
- **BU (business unit) report** — By business unit.
- **BU + sub-department report** — By BU and sub-department.
- **Experience lifecycle report** — By tenure/experience stage.
- **Employee type report** — By employee type.
- **Grade group report** — By grade band.
- **Open-ended report** — Open-ended feedback (category, question, department, type, feedback text, score, sentiment, date).
- **Nationality (and grouping)** — By nationality or nationality grouping.
- **Parent project** — By parent project.
- **Reporting manager view** — Reporting manager and users under them (for hierarchy-based views).

### 4.4 Employee-facing Pulse analytics (rewards app)
- **Engagement score** — Score displayed on rewards home (Employee Voice).
- **eNPS** — Promoters, passives, detractors; eNPS = promoters − detractors.
- **Engagement gauge** — Visual gauge/chart for engagement.
- **View more** — Link to full Pulse dashboard (e.g. portal overview) for HR/report viewers.
- **Filters** — Org-level (and department when enabled) for eNPS/engagement data.

---

## 5. Sentiment Analysis & AI

### 5.1 Per-comment sentiment
- **Processed sentiments** — Get processed sentiments for a survey (Positive / Neutral / Negative).
- **Generate sentiments** — Generate sentiments for a company or for all companies (batch).
- **Delete sentiments** — Delete all sentiment data for a company.

### 5.2 Overall / aggregate sentiment
- **Overall sentiment by survey** — Get overall sentiment view for a survey.
- **Generate overall sentiment** — For company, for all companies, or for a single survey.
- **Overall feedback sentiments** — Get overall feedback sentiments for a survey.
- **Generate overall feedback sentiment JSON** — Company-wide overall feedback sentiment (for dashboard/export).
- **Delete overall feedback sentiments** — Remove all overall feedback sentiment data.

### 5.3 AI / GPT usage
- **GPT-based sentiment** — Classify comment sentiment (Positive, Neutral, Negative) via external AI (e.g. OpenAI).
- **Token count** — Get survey data for GPT token count (cost/usage).
- **Key highlights & recommendations** — AI-generated highest/lowest rated question highlights and improvement recommendations (in sentiment/overall flow).
- **Aggregation of summaries** — Aggregate employee feedback sentiment summaries (survey-level or company-level).

### 5.4 Word cloud
- **Generate word cloud** — Company-wise or survey-wise for a company (from open-ended comments).
- **Get word cloud image** — Retrieve word cloud image (by survey, optional question).
- **Delete word clouds** — Delete all word cloud images for a company or for a survey.

---

## 6. Localization & Accessibility

### 6.1 Languages
- **Supported languages** — Get all supported languages (i18n).
- **Survey company languages** — Get languages enabled for a company’s surveys.
- **Question translations** — Get/save/update translations per question and language; search language by key.
- **Default question translation** — Translate default question set into a language.

### 6.2 Frontend
- **Multi-language UI** — Pulse app and rewards widget use i18n (e.g. en, hi, ar, de, es, fr, etc.) for labels, skip reasons, and messages.
- **RTL** — RTL SCSS support for right-to-left languages.

---

## 7. Integrations & Channels

### 7.1 MS Teams
- **Device check** — Survey allowed on “web” and “msteams”; block mobile for specific companies if configured.
- **Redirect** — From Pulse (e.g. after survey) to MS Teams rewards home when in Teams context.

### 7.2 Kiosk
- **Kiosk-enabled company** — Flag per company (`isKioskEnabled`); API to check if kiosk is enabled.
- **Kiosk survey type** — Survey type “kiosk” for kiosk-only surveys.
- **Kiosk HR notifier email** — Email to HR with kiosk survey details (name, URL, dates, target audience count, etc.).
- **Kiosk attachment email** — Attachment template for kiosk (e.g. PDF/QR).

### 7.3 VFit (eNPS)
- **VFit questions list** — Get VFit-specific questions (separate product integration).
- **Survey type** — “vfit” for VFit surveys.

### 7.4 DOJ (Date of Joining) / lifecycle
- **Survey types** — Onboarding, exit, employee_engagement.
- **Triggers** — Onboarding: Day 7/15/30/45/60/90; Tenure: Year 1/2/3/5/7/10.
- **DOJ templates and emails** — Create and retrieve by trigger.

---

## 8. Notifications & Emails

### 8.1 Email templates (Pulse-specific)
- **Survey questions mailer** — Email with survey questions (e.g. invite or reminder).
- **Survey custom questions mailer** — Custom question set in email.
- **Survey conversation mailer** — Notify when there’s conversation activity (e.g. HR reply).
- **Pulse survey unattended reminder** — Reminder to complete survey (with anonymity assurance).
- **Pulse registration** — Registration/welcome for Pulse.
- **Vantage Pulse feedback notification** — Notification about new feedback or summary.
- **Kiosk survey HR notifier** — HR notification for kiosk survey (details + QR).
- **Kiosk survey attachment** — Attachment for kiosk (e.g. PDF).
- **Kiosk New PDF** — PDF variant for kiosk.

### 8.2 Reminders
- **Send reminder for Pulse** — Manual or scheduled reminder (e.g. send reminder mail for a survey by ID).

---

## 9. Data & Export

### 9.1 Answers & exports
- **Get answers by survey** — All answers for a survey.
- **Get answers by survey and user** — Answers for a given user and survey.
- **Get user answers by survey** — User’s answers for a survey (with answer IDs).
- **Get survey answered IDs** — List of answered question IDs for user/survey.
- **Update answers with user data** — Backfill department/segment on existing answers (e.g. after HRIS sync).
- **Download sample CSV** — Download sample CSV for bulk/import use.

### 9.2 Feedback JSON
- **Generate feedback JSON for company** — Export company feedback data (e.g. for BI or AI).

---

## 10. Permissions & Security

### 10.1 Access control
- **Token-based API** — Most endpoints require authenticated token (HasTokenSync).
- **Survey creation permission** — Only users with `canCreateSurvey` can create/update/play/pause surveys.
- **HR / report viewer roles** — e.g. `hrreportviewer`, `superhrreportviewer` for dashboard and “View more” to Pulse overview.

### 10.2 Data
- **Anonymous mode** — Survey can be configured so responses are not tied to identity in reporting.
- **Company scoping** — All data scoped by company ID.

---

## 11. Survey Types & Durations (Reference)

### Survey types
- **Pulse** — Standard recurring pulse.
- **Kiosk** — Kiosk-only.
- **VFit** — VFit eNPS.
- **DOJ** — Date-of-joining / lifecycle (onboarding or tenure).

### Durations
- One-time, daily, weekly, monthly, quarterly, yearly.

### Sending frequency
- Daily, weekly, fortnightly, monthly, or “all” (e.g. once per period).

---

## 12. Summary Table (High Level)

| Area | Features |
|------|----------|
| **Taking surveys** | Get/skip survey, demo, token-based link; rated, MCQ, open-ended; optional comment & skip reason; anonymous; multi-language; incentives (points). |
| **Creation & config** | Create/update/play/pause/clean survey; custom & default questions; templates; DOJ templates/emails; targeting & manual invite; company config; benchmark. |
| **Feedback & conversation** | Comments by survey/question/topic; HR–user conversation thread; tags on feedback; read state. |
| **Analytics & reporting** | Survey list/search; MCQ & open-ended participation; report types (department, location, gender, BU, experience, etc.); engagement score & eNPS on rewards app. |
| **Sentiment & AI** | Per-comment and overall sentiment; GPT-based classification; word cloud; highlights & recommendations; generate/delete by company or survey. |
| **Localization** | Supported languages; company survey languages; question translations; RTL. |
| **Integrations** | MS Teams, Kiosk, VFit, DOJ (onboarding/tenure triggers). |
| **Emails & reminders** | Survey invite/reminder/conversation/registration/kiosk emails; send reminder API. |
| **Data & export** | Get answers by survey/user; update with user data; sample CSV; feedback JSON. |
| **Security** | Token auth; canCreateSurvey; anonymous; company scoping. |

---

*Document generated from codebase analysis. For exact API contracts and query parameters, refer to `modules/pulse/conf/pulse.routes` and the controller/service implementations.*
