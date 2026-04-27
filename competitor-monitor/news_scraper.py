#!/usr/bin/env python3
"""
news_scraper.py — Competitor intelligence beyond website copy.

Sources per competitor (weekly cadence):
  1. Google News RSS      — press, partnerships, funding, awards, product launches
  2. Competitor blog/RSS  — product announcements, feature posts
  3. G2 product page      — aggregate rating and review count trends
  4. Reddit               — community mentions, complaints, recommendations
  5. Industry sites       — peoplematters.in, hrdive.com, hrtechnologist.com,
                            shrm.org, venturebeat.com, techcrunch.com,
                            businesswire.com, prnewswire.com

Output: data/<Name>/news-<YYYY-MM-DD>.json
"""

import json
import os
import re
import sys
import time
import xml.etree.ElementTree as ET
from datetime import date, datetime, timedelta
from html import unescape
from html.parser import HTMLParser
from urllib.parse import quote_plus, urlparse
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
COMPETITORS_FILE = os.path.join(BASE_DIR, "competitors.json")
DATA_DIR = os.path.join(BASE_DIR, "data")

DAYS_BACK = 9  # Full week + 2-day buffer for timezone slop

BROWSER_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/122.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

REDDIT_HEADERS = {
    "User-Agent": (
        "CompetitorMonitor/1.0 "
        "(VantageCircle marketing intelligence; sahil.khan@vantagecircle.com)"
    ),
    "Accept": "application/json",
}

INDUSTRY_SITES = [
    "peoplematters.in",
    "hrdive.com",
    "hrtechnologist.com",
    "shrm.org",
    "venturebeat.com",
    "techcrunch.com",
    "businesswire.com",
    "prnewswire.com",
    "forbes.com",
]

GENERIC_TITLE_RE = re.compile(
    r"^(archived virtual events|ondemand webcasts|tradeshow|webinar|newsletter"
    r"|upcoming events|featured content)\b",
    re.IGNORECASE,
)

# Keywords that flag an article as high-priority for the executive summary
HIGH_PRIORITY_RE = re.compile(
    r"\b(partner|partnership|integrat|acqui|merger|acquir|adopt|adopts|"
    r"funding|raises|series [A-E]|valuation|investment|"
    r"launch|announc|new feature|release|"
    r"award|named.*leader|quadrant|"
    r"expand|enterprise|contract|signed|deal|"
    r"hires|appoints|CEO|CPO|CTO|rebrands|rebrand|pivot|shutdown|"
    r"IPO|goes public|listed|rolls? out|deploys|goes live|scales)\b",
    re.IGNORECASE,
)


# ─────────────────────────────────────────────────────────────────────────────
# Utilities
# ─────────────────────────────────────────────────────────────────────────────

def fetch(url: str, headers: dict = None, timeout: int = 20) -> str:
    h = headers or BROWSER_HEADERS
    req = Request(url, headers=h)
    try:
        with urlopen(req, timeout=timeout) as resp:
            charset = resp.headers.get_content_charset() or "utf-8"
            return resp.read().decode(charset, errors="replace")
    except Exception as exc:
        print(f"    [WARN] {url[:80]} — {exc}", file=sys.stderr)
        return ""


def clean_html(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text)
    text = unescape(text)
    return re.sub(r"\s+", " ", text).strip()


def parse_date(date_str: str):
    """Try multiple date formats; return naive datetime or None."""
    for fmt in (
        "%a, %d %b %Y %H:%M:%S %Z",
        "%a, %d %b %Y %H:%M:%S %z",
        "%Y-%m-%dT%H:%M:%SZ",
        "%Y-%m-%dT%H:%M:%S%z",
        "%Y-%m-%dT%H:%M:%S",
    ):
        try:
            dt = datetime.strptime(date_str.strip(), fmt)
            return dt.replace(tzinfo=None) if dt.tzinfo else dt
        except ValueError:
            continue
    return None


def cutoff() -> datetime:
    return datetime.utcnow() - timedelta(days=DAYS_BACK)


def is_recent(date_str: str) -> bool:
    dt = parse_date(date_str)
    return dt is None or dt >= cutoff()  # Include if unparseable


def fmt_date(date_str: str) -> str:
    dt = parse_date(date_str)
    return dt.strftime("%Y-%m-%d") if dt else date_str[:10]


# ─────────────────────────────────────────────────────────────────────────────
# Source 1: Google News RSS
# ─────────────────────────────────────────────────────────────────────────────

def fetch_google_news(queries: list) -> list:
    """Fetch Google News RSS for each query. Returns deduped list of article dicts."""
    articles = []
    seen = set()

    for query in queries:
        url = (
            "https://news.google.com/rss/search"
            f"?q={quote_plus(query)}&hl=en-US&gl=US&ceid=US:en"
        )
        xml_text = fetch(url)
        if not xml_text:
            time.sleep(1)
            continue
        try:
            root = ET.fromstring(xml_text)
        except ET.ParseError:
            continue

        for item in root.iter("item"):
            title = unescape(item.findtext("title", "")).strip()
            link = item.findtext("link", "").strip()
            pub_date = item.findtext("pubDate", "").strip()
            source_el = item.find("source")
            source = source_el.text.strip() if source_el is not None else ""
            snippet = clean_html(item.findtext("description", ""))

            if not link or link in seen:
                continue
            if not is_recent(pub_date):
                continue

            seen.add(link)
            articles.append({
                "title": title,
                "url": link,
                "source": source,
                "published": fmt_date(pub_date),
                "snippet": snippet[:400],
                "high_priority": bool(
                    HIGH_PRIORITY_RE.search(title) or HIGH_PRIORITY_RE.search(snippet)
                ),
            })

        time.sleep(1.5)

    return articles


# ─────────────────────────────────────────────────────────────────────────────
# Source 2: Competitor Blog / RSS Feed
# ─────────────────────────────────────────────────────────────────────────────

class RSSLinkFinder(HTMLParser):
    """Finds RSS/Atom feed <link> tags in HTML <head>."""
    def __init__(self):
        super().__init__()
        self.feed_urls = []

    def handle_starttag(self, tag, attrs):
        if tag.lower() != "link":
            return
        d = dict(attrs)
        rel = d.get("rel", "").lower()
        typ = d.get("type", "").lower()
        href = d.get("href", "")
        if "alternate" in rel and ("rss" in typ or "atom" in typ) and href:
            self.feed_urls.append(href)


class LinkExtractor(HTMLParser):
    """Extracts <a href> pairs with meaningful anchor text from blog pages."""
    SKIP = {"script", "style", "nav", "footer", "header", "aside"}

    def __init__(self):
        super().__init__()
        self.links = []
        self._skip_depth = 0
        self._in_a = False
        self._href = ""
        self._buf = []

    def handle_starttag(self, tag, attrs):
        tag = tag.lower()
        if tag in self.SKIP:
            self._skip_depth += 1
        if tag == "a" and self._skip_depth == 0:
            d = dict(attrs)
            href = d.get("href", "")
            if href and not href.startswith(("#", "mailto:", "tel:", "javascript:")):
                self._in_a = True
                self._href = href
                self._buf = []

    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag in self.SKIP and self._skip_depth > 0:
            self._skip_depth -= 1
        if tag == "a" and self._in_a:
            self._in_a = False
            text = re.sub(r"\s+", " ", " ".join(self._buf)).strip()
            if 20 <= len(text) <= 200:
                self.links.append((text, self._href))

    def handle_data(self, data):
        if self._in_a and self._skip_depth == 0:
            self._buf.append(data.strip())


def resolve_url(href: str, base_url: str) -> str:
    if href.startswith("http"):
        return href
    parsed = urlparse(base_url)
    base = f"{parsed.scheme}://{parsed.netloc}"
    return base + href if href.startswith("/") else href


def parse_feed(xml_text: str) -> list:
    """Parse RSS 2.0 or Atom feed into list of post dicts."""
    posts = []
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError:
        return posts

    # RSS 2.0
    for item in root.iter("item"):
        title = unescape(item.findtext("title", "")).strip()
        link = item.findtext("link", "").strip()
        pub = item.findtext("pubDate", "").strip()
        if not title:
            continue
        if pub and not is_recent(pub):
            continue
        posts.append({"title": title, "url": link, "date": fmt_date(pub) if pub else ""})

    if posts:
        return posts

    # Atom
    NS = "{http://www.w3.org/2005/Atom}"
    for entry in root.iter(f"{NS}entry"):
        title = unescape(entry.findtext(f"{NS}title", "")).strip()
        link_el = entry.find(f"{NS}link[@rel='alternate']") or entry.find(f"{NS}link")
        link = link_el.attrib.get("href", "") if link_el is not None else ""
        updated = entry.findtext(f"{NS}updated", "").strip()
        if not title:
            continue
        if updated and not is_recent(updated):
            continue
        posts.append({"title": title, "url": link, "date": fmt_date(updated) if updated else ""})

    return posts


def fetch_blog_posts(blog_url: str, press_url: str = "") -> list:
    """Fetch recent posts from competitor blog. Tries RSS/Atom first, then HTML."""
    posts = []
    seen_titles = set()

    def scrape(url):
        if not url:
            return []
        html = fetch(url)
        if not html:
            return []
        # Try to discover feed
        finder = RSSLinkFinder()
        try:
            finder.feed(html)
        except Exception:
            pass
        for feed_href in finder.feed_urls:
            feed_url = resolve_url(feed_href, url)
            feed_text = fetch(feed_url)
            if feed_text:
                p = parse_feed(feed_text)
                if p:
                    return p
        # HTML fallback
        extractor = LinkExtractor()
        try:
            extractor.feed(html)
        except Exception:
            pass
        result = []
        for text, href in extractor.links:
            full_url = resolve_url(href, url)
            result.append({"title": text, "url": full_url, "date": ""})
        return result[:30]

    for url in [blog_url, press_url]:
        for post in scrape(url):
            if post["title"] not in seen_titles:
                seen_titles.add(post["title"])
                posts.append(post)

    return posts


# ─────────────────────────────────────────────────────────────────────────────
# Source 3: G2 Aggregate Rating
# ─────────────────────────────────────────────────────────────────────────────

def fetch_g2_data(g2_slug: str) -> dict:
    """Scrape G2 product page for rating and review count."""
    if not g2_slug:
        return {}
    url = f"https://www.g2.com/products/{g2_slug}/reviews"
    html = fetch(url)
    if not html:
        return {}

    result = {}

    # JSON-LD structured data (most reliable)
    for m in re.finditer(
        r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        html, re.DOTALL
    ):
        try:
            data = json.loads(m.group(1))
            items = data if isinstance(data, list) else [data]
            for item in items:
                ar = item.get("aggregateRating", {})
                if ar:
                    result["rating"] = float(ar.get("ratingValue", 0) or 0)
                    result["review_count"] = int(
                        str(ar.get("reviewCount", "0")).replace(",", "") or 0
                    )
        except Exception:
            pass
        if result.get("rating"):
            break

    # Regex fallbacks
    if not result.get("rating"):
        m = re.search(r'"ratingValue"\s*[=:]\s*"?([\d.]+)"?', html)
        if m:
            result["rating"] = float(m.group(1))
        m = re.search(r'([\d.]+)\s*out of\s*5', html)
        if m and not result.get("rating"):
            result["rating"] = float(m.group(1))

    if not result.get("review_count"):
        m = re.search(r'"reviewCount"\s*[=:]\s*"?([\d,]+)"?', html)
        if m:
            result["review_count"] = int(m.group(1).replace(",", ""))
        m = re.search(r'([\d,]+)\s+reviews', html)
        if m and not result.get("review_count"):
            result["review_count"] = int(m.group(1).replace(",", ""))

    return result


# ─────────────────────────────────────────────────────────────────────────────
# Source 4: Reddit Mentions
# ─────────────────────────────────────────────────────────────────────────────

def fetch_reddit_mentions(queries: list) -> list:
    """Search Reddit for competitor mentions. Uses public JSON API.
    Filters to posts where at least one query term appears in the title."""
    mentions = []
    seen = set()
    # Build a set of lowercase terms to check relevance against post titles
    relevance_terms = {q.lower() for q in queries}

    for query in queries[:2]:  # Cap at 2 queries to respect rate limits
        url = (
            "https://www.reddit.com/search.json"
            f"?q={quote_plus(query)}&sort=new&limit=25&t=month&type=link"
        )
        text = fetch(url, headers=REDDIT_HEADERS)
        if not text:
            time.sleep(2)
            continue
        try:
            data = json.loads(text)
            for child in data.get("data", {}).get("children", []):
                post = child.get("data", {})
                created_utc = post.get("created_utc", 0)
                if created_utc:
                    dt = datetime.utcfromtimestamp(created_utc)
                    if dt < cutoff():
                        continue
                permalink = "https://reddit.com" + post.get("permalink", "")
                if permalink in seen:
                    continue

                title = post.get("title", "").strip()
                title_lower = title.lower()
                selftext_lower = post.get("selftext", "").lower()

                # Require the competitor to actually be mentioned in the post
                if not any(term in title_lower or term in selftext_lower
                           for term in relevance_terms):
                    continue

                seen.add(permalink)
                mentions.append({
                    "title": title,
                    "url": permalink,
                    "subreddit": f"r/{post.get('subreddit', '')}",
                    "score": post.get("score", 0),
                    "published": (
                        datetime.utcfromtimestamp(created_utc).strftime("%Y-%m-%d")
                        if created_utc else ""
                    ),
                    "high_priority": bool(HIGH_PRIORITY_RE.search(title)),
                })
        except (json.JSONDecodeError, KeyError):
            pass

        time.sleep(2.5)

    return mentions


# ─────────────────────────────────────────────────────────────────────────────
# Source 5: Industry Site Coverage via Google News
# ─────────────────────────────────────────────────────────────────────────────

def fetch_industry_coverage(queries: list) -> list:
    """Search industry publications for competitor coverage via Google News RSS."""
    articles = []
    seen = set()
    primary = queries[0]  # Use primary name only to avoid noise

    for site in INDUSTRY_SITES:
        q = f'site:{site} "{primary}"'
        url = (
            "https://news.google.com/rss/search"
            f"?q={quote_plus(q)}&hl=en-US&gl=US&ceid=US:en"
        )
        xml_text = fetch(url)
        if not xml_text:
            time.sleep(1)
            continue
        try:
            root = ET.fromstring(xml_text)
        except ET.ParseError:
            continue

        for item in root.iter("item"):
            title = unescape(item.findtext("title", "")).strip()
            link = item.findtext("link", "").strip()
            pub_date = item.findtext("pubDate", "").strip()
            snippet = clean_html(item.findtext("description", ""))

            if not link or link in seen:
                continue
            if not is_recent(pub_date):
                continue
            if GENERIC_TITLE_RE.match(title):
                continue

            seen.add(link)
            articles.append({
                "title": title,
                "url": link,
                "source": site,
                "published": fmt_date(pub_date),
                "snippet": snippet[:400],
                "high_priority": bool(
                    HIGH_PRIORITY_RE.search(title) or HIGH_PRIORITY_RE.search(snippet)
                ),
            })

        time.sleep(1.5)

    return articles


# ─────────────────────────────────────────────────────────────────────────────
# Snapshot I/O
# ─────────────────────────────────────────────────────────────────────────────

def save_news_snapshot(name: str, data: dict, today: str):
    competitor_dir = os.path.join(DATA_DIR, name)
    os.makedirs(competitor_dir, exist_ok=True)
    path = os.path.join(competitor_dir, f"news-{today}.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"  Saved: {path}")


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def run():
    today = date.today().isoformat()

    with open(COMPETITORS_FILE, "r") as f:
        competitors = json.load(f)

    print(f"=== News scrape run: {today} ===\n")

    for comp in competitors:
        name = comp["name"]
        queries = comp.get("news_queries", [name])
        blog_url = comp.get("blog_url", "")
        press_url = comp.get("press_url", "")
        g2_slug = comp.get("g2_slug", "")

        print(f"[{name}]")

        print("  1/5 Google News...")
        google_news = fetch_google_news(queries)
        print(f"      → {len(google_news)} articles "
              f"({sum(1 for a in google_news if a['high_priority'])} high-priority)")

        print("  2/5 Blog / press...")
        blog_posts = fetch_blog_posts(blog_url, press_url)
        print(f"      → {len(blog_posts)} posts")

        # G2 blocks automated scraping (HTTP 403). Skipped.
        g2_data = {}

        print("  4/5 Reddit...")
        reddit = fetch_reddit_mentions(queries)
        print(f"      → {len(reddit)} mentions")

        print("  5/5 Industry coverage...")
        industry = fetch_industry_coverage(queries)
        print(f"      → {len(industry)} articles "
              f"({sum(1 for a in industry if a['high_priority'])} high-priority)")

        snapshot = {
            "date": today,
            "google_news": google_news,
            "blog_posts": blog_posts,
            "g2": g2_data,
            "reddit": reddit,
            "industry_coverage": industry,
        }

        save_news_snapshot(name, snapshot, today)
        print()
        time.sleep(2)

    print("=== News scrape complete ===")


if __name__ == "__main__":
    run()
