#!/bin/bash
# setup.sh — Install the competitor monitor on any Mac.
# Run once after cloning. Re-run anytime you update the scripts.

set -e

INSTALL_DIR="$HOME/Library/Application Support/VantageCompetitorMonitor"
PLIST_SRC="$(cd "$(dirname "$0")" && pwd)/com.vantagecircle.competitor-monitor.plist"
PLIST_DEST="$HOME/Library/LaunchAgents/com.vantagecircle.competitor-monitor.plist"

echo "==> Copying scripts to Application Support..."
mkdir -p "$INSTALL_DIR/data" "$INSTALL_DIR/logs" "$INSTALL_DIR/reports"
cp scrape.py news_scraper.py diff_report.py run_monitor.py competitors.json "$INSTALL_DIR/"

echo "==> Installing launchd plist..."
cp "$PLIST_SRC" "$PLIST_DEST"

echo "==> Loading scheduler (runs every Monday at 11am)..."
launchctl unload "$PLIST_DEST" 2>/dev/null || true
launchctl load "$PLIST_DEST"

echo ""
echo "Done. The competitor monitor will run automatically every Monday at 11am."
echo "Reports will appear in: $INSTALL_DIR/reports/Competitor-Vulnerability-Report.md"
