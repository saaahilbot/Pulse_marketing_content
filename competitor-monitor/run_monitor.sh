#!/bin/bash
# run_monitor.sh — Entry point called by launchd every Monday at 8am.
# Runs scrape then diff_report, logs output to logs/monitor.log

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_DIR="$SCRIPT_DIR/logs"
LOG_FILE="$LOG_DIR/monitor.log"

mkdir -p "$LOG_DIR"

echo "========================================" >> "$LOG_FILE"
echo "Run started: $(date)" >> "$LOG_FILE"
echo "========================================" >> "$LOG_FILE"

/usr/bin/python3 "$SCRIPT_DIR/scrape.py" >> "$LOG_FILE" 2>&1
echo "" >> "$LOG_FILE"
/usr/bin/python3 "$SCRIPT_DIR/diff_report.py" >> "$LOG_FILE" 2>&1

echo "" >> "$LOG_FILE"
echo "Run finished: $(date)" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"
