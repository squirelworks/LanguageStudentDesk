# LanguageStudentDesk

Before opening, updating or merging a pull request, read and follow
`AGENTS.md`. In short: branch from the latest main, put a `Scope:` line in the
PR body, resolve your own merge conflicts by combining both sides (never
"ours"), and run `python3 .github/scripts/pr_guard.py --base origin/main --head HEAD`
before pushing.
