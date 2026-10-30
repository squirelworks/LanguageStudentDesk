#!/usr/bin/env bash
# Used by the "Translation Learner corpora" workflow: commits the given paths
# and pushes them to the branch the workflow runs on (or, on main, to the
# translation-learner-corpora branch, to be merged by pull request).
#   commit_outputs.sh "<commit message>" <path>...
set -euo pipefail
message=$1
shift
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git add -- "$@"
if git diff --cached --quiet; then
  echo "Nothing changed in $*."
  exit 0
fi
du -ch "$@" | tail -1
git commit -q -m "$message (${GITHUB_SHA::7})"
branch="${GITHUB_REF_NAME}"
if [ "$branch" = "main" ]; then
  branch=translation-learner-corpora
  git push -f origin "HEAD:refs/heads/$branch"
else
  git fetch -q origin "$branch"
  git rebase -q "origin/$branch"
  git push origin "HEAD:refs/heads/$branch"
fi
echo "Committed to $branch."
