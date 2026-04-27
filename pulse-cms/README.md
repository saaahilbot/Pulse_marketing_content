# Pulse CMS

Content management system for Vantage Pulse blog portfolio — 43 articles across 7 categories.

Built with Next.js 14 + Decap CMS, deployed on Netlify.

## Features

- **Dashboard** — overview stats, high-priority posts, featured content, keyword themes
- **Blog management** — full table with search, multi-filter, sort, pagination
- **Blog detail** — SEO analysis, conversion signals, content preview, related posts, editorial notes
- **Categories** — per-category breakdown with SEO averages and status
- **Analytics** — SEO health distribution, conversion readiness, content type mix, gap analysis
- **Decap CMS Admin** (`/admin`) — GUI for editing all 43 blog markdown files via Git

## Content Structure

Each blog is a markdown file in `content/blogs/` with comprehensive frontmatter:

```yaml
title, slug, category, tags, status, priority, content_type, funnel_stage,
source_url, meta_title, meta_description, primary_keyword, secondary_keywords,
seo_score, featured, author, publish_date, last_updated, word_count_estimate,
has_product_mention, has_cta, internal_links, notes
```

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

For local CMS admin editing:
```bash
npx decap-server   # Starts local Git backend on port 8081
# Then open http://localhost:3000/admin
```

## Deploy to Netlify

1. Push this repo to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Enable **Netlify Identity** in Site Settings → Identity
6. Enable **Git Gateway** in Identity → Services
7. Invite yourself as a user

The Netlify plugin for Next.js is automatically detected. The `/admin` panel will authenticate via Netlify Identity.

## Adding New Blogs

**Via CMS Admin:** Go to `/admin` → Blogs → New Blog. Fill in all fields and publish.

**Via file:** Create `content/blogs/your-slug.md` with the frontmatter template above.

## Blog Categories

| Category | Posts |
|---|---|
| Survey Strategy & Best Practices | 9 |
| Question Banks & Templates | 16 |
| Employee Engagement | 7 |
| Feedback, Results & Action | 3 |
| Pulse Surveys & Tools | 3 |
| Retention | 3 |
| Company Culture & Climate | 2 |
