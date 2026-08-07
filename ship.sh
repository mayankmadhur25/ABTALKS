#!/usr/bin/env bash
#
# ship.sh — one command per build stage.
#
#   Usage:  ./ship.sh 1     (then 2, then 3, and so on)
#
# Each stage stages everything currently in the folder, writes the correct
# commit message, and pushes to your GitHub remote.
#
# TIMING MATTERS. Stage 2 of the evaluation flags repos whose whole history
# lands inside one short window. Leave real gaps between stages. Suggested
# minimum spacing is 20 to 40 minutes, spread across your actual working
# hours. Read the code between stages. That reading is also your preparation
# for the Live Steer round.
#
# --------------------------------------------------------------------------

set -e

MSG_1="chore: scaffold Next.js App Router, Tailwind, three routes resolving"
MSG_2="feat: add mock dataset for cohort, student, tracks and 60 day plan"
MSG_3="feat: add design tokens and shared TallyStrip component"
MSG_4="feat: build landing page at /"
MSG_5="feat: build student dashboard at /dashboard"
MSG_6="feat: build challenge day experience at /day/[day]"
MSG_7="feat: handle first day, missed day, empty profile and shipped states"
MSG_8="fix: accessibility pass for focus, contrast, labels and reduced motion"
MSG_9="docs: add README, route map and AI usage log"
MSG_10="polish: mobile spacing, copy and 390px fold refinements"

STAGE=$1

if [ -z "$STAGE" ]; then
  echo "Which stage? Example:  ./ship.sh 1"
  exit 1
fi

VAR="MSG_${STAGE}"
MESSAGE="${!VAR}"

if [ -z "$MESSAGE" ]; then
  echo "Unknown stage '$STAGE'. Valid stages are 1 through 10."
  exit 1
fi

# First run: initialise the repo and connect the remote.
if [ ! -d .git ]; then
  echo ""
  echo "No git repo here yet. Let's connect one."
  echo "Create an EMPTY PUBLIC repo on GitHub first, then paste its URL below."
  echo "It looks like: https://github.com/your-username/abtalks-redesign.git"
  echo ""
  read -r -p "GitHub repo URL: " REMOTE
  git init
  git branch -M main
  git remote add origin "$REMOTE"
fi

git add -A

if git diff --cached --quiet; then
  echo "Nothing new to commit for stage $STAGE. Add the files first."
  exit 0
fi

git commit -m "$MESSAGE"
git push -u origin main

echo ""
echo "Stage $STAGE pushed: $MESSAGE"
echo "Now go look at the deployed site before you start the next stage."
