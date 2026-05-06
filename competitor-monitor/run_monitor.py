#!/usr/bin/env python3
"""Entry point called by launchd every Monday. Runs scrape → news_scraper → diff_report."""

import os
import sys
import importlib.util
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
LOG_FILE = os.path.join(BASE_DIR, "logs", "monitor.log")

os.makedirs(os.path.join(BASE_DIR, "logs"), exist_ok=True)


def log(msg):
    line = f"{msg}\n"
    sys.stdout.write(line)
    with open(LOG_FILE, "a") as f:
        f.write(line)


def run_module(name, path):
    spec = importlib.util.spec_from_file_location(name, path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    mod.run()


log("=" * 50)
log(f"Run started: {datetime.now()}")
log("=" * 50)

for module_name, filename in [
    ("scrape", "scrape.py"),
    ("news_scraper", "news_scraper.py"),
    ("diff_report", "diff_report.py"),
]:
    log(f"\n--- {filename} ---")
    try:
        run_module(module_name, os.path.join(BASE_DIR, filename))
    except Exception as e:
        log(f"[ERROR] {filename} failed: {e}")

log(f"\nRun finished: {datetime.now()}\n")
