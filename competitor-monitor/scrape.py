#!/usr/bin/env python3
"""
scrape.py — Fetches each competitor page, extracts meaningful text
(headings, feature claims, pricing signals), and saves a dated snapshot
to data/<CompetitorName>/<YYYY-MM-DD>.txt
"""

import json
import os
import re
import sys
import time
from datetime import date
from urllib.request import Request, urlopen
from urllib.error import URLError, HTTPError
from html.parser import HTMLParser

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
COMPETITORS_FILE = os.path.join(BASE_DIR, "competitors.json")
DATA_DIR = os.path.join(BASE_DIR, "data")

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/122.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}

# Tags whose text content we want to extract
EXTRACT_TAGS = {
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "li", "span", "strong", "em",
    "blockquote", "caption", "td", "th", "label", "button", "a",
    "div", "section", "main", "article", "summary", "aside"
}

# Tags to skip entirely (including their children)
SKIP_TAGS = {
    "script", "style", "noscript", "svg", "path",
    "img", "video", "audio", "iframe", "figure",
    "nav", "footer", "head", "meta", "link"
}

# Pricing-related keywords for signal extraction
PRICING_KEYWORDS = re.compile(
    r'\b(price|pricing|plan|plans|tier|tiers|per user|per month|per seat|'
    r'free trial|free forever|contact sales|request a demo|get a quote|'
    r'\$\d|\d+\/mo|enterprise|starter|professional|business|premium|'
    r'annually|monthly|billed)\b',
    re.IGNORECASE
)

# Feature-related keywords
FEATURE_KEYWORDS = re.compile(
    r'\b(survey|pulse|feedback|analytics|dashboard|report|heatmap|'
    r'eNPS|sentiment|AI|artificial intelligence|benchmark|integration|'
    r'action plan|lifecycle|onboarding|recognition|reward|manager|'
    r'anonymous|real.time|automated|workflow|notification|slack|teams|'
    r'HRIS|SSO|GDPR|compliance|mobile|kiosk|QR|template|question bank)\b',
    re.IGNORECASE
)


# Self-closing (void) tags — never emit an end tag, must not alter skip_depth
VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr"
}

class TextExtractor(HTMLParser):
    """Pulls visible text from HTML, skipping scripts/styles and nav/footer."""

    def __init__(self):
        super().__init__()
        self.text_chunks = []
        self._skip_depth = 0
        self._current_tag = None
        self._tag_stack = []

    def handle_starttag(self, tag, attrs):
        tag = tag.lower()
        # Void tags have no end tag — never push them onto the stack
        if tag in VOID_TAGS:
            return
        self._tag_stack.append(tag)
        if tag in SKIP_TAGS:
            self._skip_depth += 1
        self._current_tag = tag

    def handle_endtag(self, tag):
        tag = tag.lower()
        if tag in VOID_TAGS:
            return
        if self._tag_stack and self._tag_stack[-1] == tag:
            self._tag_stack.pop()
        if tag in SKIP_TAGS and self._skip_depth > 0:
            self._skip_depth -= 1
        self._current_tag = self._tag_stack[-1] if self._tag_stack else None

    def handle_data(self, data):
        if self._skip_depth > 0:
            return
        data = data.strip()
        if data and self._current_tag in EXTRACT_TAGS:
            self.text_chunks.append(data)

    def get_text(self):
        seen = set()
        unique = []
        for chunk in self.text_chunks:
            # Normalise whitespace
            clean = re.sub(r'\s+', ' ', chunk).strip()
            if clean and clean not in seen and len(clean) > 2:
                seen.add(clean)
                unique.append(clean)
        return unique


def fetch_page(url: str) -> str:
    req = Request(url, headers=HEADERS)
    try:
        with urlopen(req, timeout=20) as resp:
            charset = "utf-8"
            ct = resp.headers.get_content_charset()
            if ct:
                charset = ct
            return resp.read().decode(charset, errors="replace")
    except (HTTPError, URLError) as exc:
        print(f"  [ERROR] Could not fetch {url}: {exc}", file=sys.stderr)
        return ""


def extract_signals(text_lines: list) -> dict:
    """Bucket lines into feature claims, pricing signals, and other copy."""
    features = []
    pricing = []
    other = []

    for line in text_lines:
        if len(line) < 4:
            continue
        if PRICING_KEYWORDS.search(line):
            pricing.append(line)
        elif FEATURE_KEYWORDS.search(line):
            features.append(line)
        else:
            other.append(line)

    return {"features": features, "pricing": pricing, "other": other}


def save_snapshot(name: str, signals: dict, today: str):
    competitor_dir = os.path.join(DATA_DIR, name)
    os.makedirs(competitor_dir, exist_ok=True)
    snapshot_path = os.path.join(competitor_dir, f"{today}.txt")

    with open(snapshot_path, "w", encoding="utf-8") as f:
        f.write(f"# Snapshot: {name} — {today}\n\n")

        f.write("## FEATURE CLAIMS\n")
        for line in signals["features"]:
            f.write(f"- {line}\n")

        f.write("\n## PRICING SIGNALS\n")
        for line in signals["pricing"]:
            f.write(f"- {line}\n")

        f.write("\n## OTHER COPY\n")
        for line in signals["other"]:
            f.write(f"- {line}\n")

    print(f"  Saved: {snapshot_path}")
    return snapshot_path


def run():
    today = date.today().isoformat()

    with open(COMPETITORS_FILE, "r") as f:
        competitors = json.load(f)

    print(f"=== Scrape run: {today} ===\n")

    for comp in competitors:
        name = comp["name"]
        url = comp["url"]
        print(f"[{name}] Fetching {url}")

        html = fetch_page(url)
        if not html:
            print(f"  Skipping {name} — empty response.\n")
            continue

        extractor = TextExtractor()
        extractor.feed(html)
        text_lines = extractor.get_text()

        signals = extract_signals(text_lines)

        total = len(signals["features"]) + len(signals["pricing"]) + len(signals["other"])
        print(f"  Extracted {total} lines "
              f"({len(signals['features'])} features, "
              f"{len(signals['pricing'])} pricing, "
              f"{len(signals['other'])} other)")

        save_snapshot(name, signals, today)
        print()

        # Polite delay between requests
        time.sleep(2)

    print("=== Scrape complete ===")


if __name__ == "__main__":
    run()
