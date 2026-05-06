#!/usr/bin/env python3
"""
diff_report.py — Weekly competitor vulnerability report.

Combines two signal streams:
  1. Website diff   — feature claims, pricing signals, copy changes
  2. News & intel   — press coverage, partnerships, funding, blog posts,
                      G2 rating trends, Reddit mentions, industry coverage
"""

import difflib
import json
import os
import re
import sys
from datetime import date, timedelta
from pathlib import Path

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
COMPETITORS_FILE = os.path.join(BASE_DIR, "competitors.json")
DATA_DIR = os.path.join(BASE_DIR, "data")
REPORTS_DIR = os.path.join(BASE_DIR, "reports")

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
# Website snapshot helpers (unchanged from original)
# ─────────────────────────────────────────────────────────────────────────────

def get_snapshot_dates(competitor_dir: Path) -> list:
    files = sorted(competitor_dir.glob("*.txt"))
    return [f.stem for f in files if re.match(r"\d{4}-\d{2}-\d{2}", f.stem)]


def load_website_snapshot(competitor_dir: Path, date_str: str) -> dict:
    path = competitor_dir / f"{date_str}.txt"
    if not path.exists():
        return {"features": [], "pricing": [], "other": []}
    sections = {"features": [], "pricing": [], "other": []}
    current = None
    with open(path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.rstrip()
            if line == "## FEATURE CLAIMS":
                current = "features"
            elif line == "## PRICING SIGNALS":
                current = "pricing"
            elif line == "## OTHER COPY":
                current = "other"
            elif line.startswith("- ") and current:
                sections[current].append(line[2:])
    return sections


def diff_lists(old: list, new: list) -> tuple:
    old_set, new_set = set(old), set(new)
    return [l for l in new if l not in old_set], [l for l in old if l not in new_set]


def notable_changes(old: list, new: list) -> list:
    old_set, new_set = set(old), set(new)
    old_mod = [l for l in old if l not in new_set]
    new_mod = [l for l in new if l not in old_set]
    changes = []
    for new_line in new_mod:
        best_ratio, best_match = 0.0, None
        for old_line in old_mod:
            ratio = difflib.SequenceMatcher(None, old_line, new_line).ratio()
            if ratio > best_ratio and ratio >= 0.5:
                best_ratio, best_match = ratio, old_line
        if best_match:
            changes.append((best_match, new_line, round(best_ratio, 2)))
            old_mod.remove(best_match)
    return changes


# ─────────────────────────────────────────────────────────────────────────────
# News snapshot helpers
# ─────────────────────────────────────────────────────────────────────────────

def get_news_dates(competitor_dir: Path) -> list:
    files = sorted(competitor_dir.glob("news-*.json"))
    return [f.stem[5:] for f in files if re.match(r"\d{4}-\d{2}-\d{2}", f.stem[5:])]


def load_news_snapshot(competitor_dir: Path, date_str: str) -> dict:
    path = competitor_dir / f"news-{date_str}.json"
    if not path.exists():
        return {"google_news": [], "blog_posts": [], "g2": {}, "reddit": [], "industry_coverage": []}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def diff_news(old: dict, new: dict) -> dict:
    """Return new items per category not present in the previous snapshot."""
    def new_items(old_list, new_list, key="url"):
        old_keys = {item.get(key) or item.get("title", "") for item in old_list}
        return [item for item in new_list if (item.get(key) or item.get("title", "")) not in old_keys]

    return {
        "google_news": new_items(old.get("google_news", []), new.get("google_news", [])),
        "blog_posts": new_items(old.get("blog_posts", []), new.get("blog_posts", []), key="title"),
        "g2_old": old.get("g2", {}),
        "g2_new": new.get("g2", {}),
        "reddit": new_items(old.get("reddit", []), new.get("reddit", [])),
        "industry_coverage": new_items(old.get("industry_coverage", []), new.get("industry_coverage", [])),
    }


def clean_title(title: str) -> str:
    """Strip appended source names from Google News titles (e.g. '… - People Matters')."""
    return re.sub(r"\s*[-|]\s*[A-Z][^-|]{3,50}$", "", title).strip()


def collect_high_priority(name: str, news_diff: dict) -> list:
    """Return list of (name, title, source) tuples for high-priority signals.
    Only surfaces Google News and industry coverage — Reddit is too noisy for exec summary.
    Deduplicates by cleaned title so the same story isn't listed twice."""
    signals = []
    seen_titles = set()
    GENERIC_TITLES = re.compile(
        r"^(archived virtual events|ondemand webcasts|tradeshow|webinar|newsletter)\b",
        re.IGNORECASE,
    )
    for article in news_diff.get("google_news", []) + news_diff.get("industry_coverage", []):
        raw_title = article.get("title", "")
        title = clean_title(raw_title)
        if GENERIC_TITLES.match(title):
            continue
        if title in seen_titles:
            continue
        if article.get("high_priority") or HIGH_PRIORITY_RE.search(title):
            seen_titles.add(title)
            signals.append((name, title, article.get("source", "")))
    return signals


# ─────────────────────────────────────────────────────────────────────────────
# Report writers
# ─────────────────────────────────────────────────────────────────────────────

def write_news_section(f, name: str, news_diff: dict, prev_date: str, this_date: str):
    f.write("### News & Intelligence\n\n")
    f.write(f"*News comparison: `{prev_date}` → `{this_date}`*\n\n")

    # Google News
    google = news_diff.get("google_news", [])
    f.write(f"**Google News** ({len(google)} new article{'s' if len(google) != 1 else ''})\n\n")
    if google:
        for a in google:
            flag = " 🔴" if (a.get("high_priority") or HIGH_PRIORITY_RE.search(a.get("title", ""))) else ""
            f.write(f"- [{a['title']}]({a['url']}){flag}  \n")
            line2_parts = []
            if a.get("source"):
                line2_parts.append(a["source"])
            if a.get("published"):
                line2_parts.append(a["published"])
            if line2_parts:
                f.write(f"  *{' · '.join(line2_parts)}*  \n")
            if a.get("snippet"):
                f.write(f"  > {a['snippet'][:250]}\n")
            f.write("\n")
    else:
        f.write("_No new articles this week._\n\n")

    # Industry coverage
    industry = news_diff.get("industry_coverage", [])
    f.write(f"**Industry Coverage** ({len(industry)} new article{'s' if len(industry) != 1 else ''})\n\n")
    if industry:
        for a in industry:
            flag = " 🔴" if (a.get("high_priority") or HIGH_PRIORITY_RE.search(a.get("title", ""))) else ""
            f.write(f"- [{a['title']}]({a['url']}){flag}  \n")
            line2_parts = []
            if a.get("source"):
                line2_parts.append(a["source"])
            if a.get("published"):
                line2_parts.append(a["published"])
            if line2_parts:
                f.write(f"  *{' · '.join(line2_parts)}*  \n")
            if a.get("snippet"):
                f.write(f"  > {a['snippet'][:250]}\n")
            f.write("\n")
    else:
        f.write("_No new industry coverage this week._\n\n")

    # Blog posts
    blog = news_diff.get("blog_posts", [])
    f.write(f"**Blog / Press Posts** ({len(blog)} new)\n\n")
    if blog:
        for p in blog[:15]:
            date_str = f" ({p['date']})" if p.get("date") else ""
            url_part = f"[{p['title']}]({p['url']})" if p.get("url") else p["title"]
            f.write(f"- {url_part}{date_str}\n")
    else:
        f.write("_No new posts detected._\n")
    f.write("\n")

    # G2 rating
    g2_old = news_diff.get("g2_old", {})
    g2_new = news_diff.get("g2_new", {})
    f.write("**G2 Rating**\n\n")
    if g2_new.get("rating"):
        old_r = g2_old.get("rating")
        new_r = g2_new.get("rating")
        old_c = g2_old.get("review_count")
        new_c = g2_new.get("review_count")
        rating_str = f"{new_r}"
        if old_r and old_r != new_r:
            arrow = "↑" if new_r > old_r else "↓"
            rating_str += f" ({arrow} from {old_r})"
        else:
            rating_str += " (unchanged)"
        count_str = f"{new_c:,} reviews" if new_c else "unknown reviews"
        if old_c and new_c and old_c != new_c:
            diff = new_c - old_c
            arrow = "↑" if diff > 0 else "↓"
            count_str += f" ({arrow}{abs(diff)} from {old_c:,})"
        f.write(f"- Rating: {rating_str} · {count_str}\n\n")
    else:
        f.write("_G2 data unavailable._\n\n")

    # Reddit
    reddit = news_diff.get("reddit", [])
    f.write(f"**Reddit** ({len(reddit)} new mention{'s' if len(reddit) != 1 else ''})\n\n")
    if reddit:
        for r in reddit[:10]:
            flag = " 🔴" if r.get("high_priority") else ""
            score_str = f" · score {r['score']}" if r.get("score") else ""
            date_str = f" · {r['published']}" if r.get("published") else ""
            f.write(f"- [{r['subreddit']}] [{r['title']}]({r['url']}){flag}{score_str}{date_str}\n")
    else:
        f.write("_No new Reddit mentions this week._\n")
    f.write("\n")


def write_website_section(f, name: str, url: str, this_date: str, prev_date: str,
                           old_snap: dict, new_snap: dict):
    f.write(f"**Website:** {url}  \n")
    f.write(f"**Comparison:** `{prev_date}` → `{this_date}`\n\n")

    feat_added, feat_removed = diff_lists(old_snap["features"], new_snap["features"])
    price_added, price_removed = diff_lists(old_snap["pricing"], new_snap["pricing"])
    other_added, other_removed = diff_lists(old_snap["other"], new_snap["other"])
    feat_changes = notable_changes(old_snap["features"], new_snap["features"])
    price_changes = notable_changes(old_snap["pricing"], new_snap["pricing"])
    other_changes = notable_changes(old_snap["other"], new_snap["other"])
    all_changes = feat_changes + price_changes + other_changes

    f.write("### Website — New Claims\n\n")
    if feat_added:
        f.write("*Feature claims added:*\n\n")
        for line in feat_added:
            f.write(f"- {line}\n")
    if price_added:
        f.write("\n*Pricing signals added:*\n\n")
        for line in price_added:
            f.write(f"- {line}\n")
    if other_added:
        f.write("\n*New copy / messaging:*\n\n")
        for line in other_added:
            f.write(f"- {line}\n")
    if not feat_added and not price_added and not other_added:
        f.write("_No new claims detected._\n")
    f.write("\n")

    f.write("### Website — Removed Claims\n\n")
    if feat_removed:
        f.write("*Feature claims removed:*\n\n")
        for line in feat_removed:
            f.write(f"- {line}\n")
    if price_removed:
        f.write("\n*Pricing signals removed:*\n\n")
        for line in price_removed:
            f.write(f"- {line}\n")
    if other_removed:
        f.write("\n*Copy removed:*\n\n")
        for line in other_removed:
            f.write(f"- {line}\n")
    if not feat_removed and not price_removed and not other_removed:
        f.write("_No claims removed._\n")
    f.write("\n")

    f.write("### Website — Notable Changes\n\n")
    if all_changes:
        f.write("*Modified lines (similarity ≥ 50%):*\n\n")
        f.write("| Before | After | Similarity |\n")
        f.write("|--------|-------|------------|\n")
        for old_line, new_line, ratio in all_changes:
            ol = old_line.replace("|", "\\|")
            nl = new_line.replace("|", "\\|")
            f.write(f"| {ol} | {nl} | {ratio:.0%} |\n")
    else:
        f.write("_No notable changes detected._\n")
    f.write("\n")


def write_executive_summary(f, all_signals: list, today: str):
    f.write("## Executive Intelligence Summary\n\n")
    if all_signals:
        f.write("**High-Priority Signals This Week** 🔴\n\n")
        f.write("| Competitor | Signal | Source |\n")
        f.write("|------------|--------|--------|\n")
        for name, title, source in all_signals:
            title_esc = title.replace("|", "\\|")[:120]
            f.write(f"| {name} | {title_esc} | {source} |\n")
    else:
        f.write("_No high-priority signals detected this week._\n")
    f.write("\n---\n\n")


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def run():
    today = date.today().isoformat()

    with open(COMPETITORS_FILE, "r") as f:
        competitors = json.load(f)

    print(f"=== Diff report run: {today} ===\n")

    # First pass: collect all diffs so we can write the executive summary first
    comp_data = []
    all_high_priority = []

    for comp in competitors:
        name = comp["name"]
        url = comp["url"]
        competitor_dir = Path(DATA_DIR) / name

        # Website snapshots
        site_dates = get_snapshot_dates(competitor_dir) if competitor_dir.exists() else []
        if len(site_dates) >= 2:
            this_site = site_dates[-1]
            prev_site = site_dates[-2]
            old_site = load_website_snapshot(competitor_dir, prev_site)
            new_site = load_website_snapshot(competitor_dir, this_site)
        else:
            this_site = prev_site = None
            old_site = new_site = None

        # News snapshots
        news_dates = get_news_dates(competitor_dir) if competitor_dir.exists() else []
        if len(news_dates) >= 2:
            this_news = news_dates[-1]
            prev_news = news_dates[-2]
            old_news = load_news_snapshot(competitor_dir, prev_news)
            new_news = load_news_snapshot(competitor_dir, this_news)
            ndiff = diff_news(old_news, new_news)
        elif len(news_dates) == 1:
            this_news = news_dates[0]
            prev_news = None
            old_news = {"google_news": [], "blog_posts": [], "g2": {}, "reddit": [], "industry_coverage": []}
            new_news = load_news_snapshot(competitor_dir, this_news)
            ndiff = diff_news(old_news, new_news)
        else:
            this_news = prev_news = None
            ndiff = None
            new_news = None

        # Collect high-priority signals
        if ndiff:
            signals = collect_high_priority(name, ndiff)
            all_high_priority.extend(signals)
            print(f"[{name}] {len(signals)} high-priority signal(s)")

        comp_data.append({
            "comp": comp,
            "site_dates": (prev_site, this_site),
            "old_site": old_site,
            "new_site": new_site,
            "news_dates": (prev_news, this_news),
            "ndiff": ndiff,
            "new_news": new_news,
        })

    os.makedirs(REPORTS_DIR, exist_ok=True)
    report_path = os.path.join(REPORTS_DIR, "Competitor-Vulnerability-Report.md")

    with open(report_path, "w", encoding="utf-8") as f:
        f.write("# Competitor Vulnerability Report\n\n")
        f.write(f"**Generated:** {today}  \n")
        f.write(f"**Competitors monitored:** {len(competitors)}\n\n")

        write_executive_summary(f, all_high_priority, today)

        # Table of contents
        f.write("## Contents\n\n")
        for comp in competitors:
            anchor = comp["name"].lower().replace(" ", "-")
            f.write(f"- [{comp['name']}](#{anchor})\n")
        f.write("\n---\n\n")

        # Per-competitor sections
        for entry in comp_data:
            comp = entry["comp"]
            name = comp["name"]
            url = comp["url"]
            prev_site, this_site = entry["site_dates"]
            prev_news, this_news = entry["news_dates"]
            ndiff = entry["ndiff"]

            f.write(f"## {name}\n\n")

            # News section
            if ndiff is not None:
                pn = prev_news or "—"
                tn = this_news or today
                write_news_section(f, name, ndiff, pn, tn)
            else:
                f.write("### News & Intelligence\n\n")
                f.write("_No news snapshots available yet — will appear after first scrape._\n\n")

            # Website section
            if this_site and entry["old_site"] and entry["new_site"]:
                write_website_section(
                    f, name, url, this_site, prev_site,
                    entry["old_site"], entry["new_site"]
                )
            elif this_site:
                f.write("### Website\n\n")
                f.write("_Only one website snapshot available — first website diff will run next week._\n\n")
            else:
                f.write("### Website\n\n")
                f.write("_No website snapshots found._\n\n")

            f.write("---\n\n")

    print(f"\nReport: {report_path}")
    print("=== Reports complete ===")


if __name__ == "__main__":
    run()
