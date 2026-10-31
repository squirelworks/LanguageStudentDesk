# Rules for agents working in this repo

Several agents open PRs here at the same time, and another agent merges them.
Merges have rolled back other people's work more than once, always the same
way: main was merged into a branch, a conflict was resolved to the branch's
side, and the squash-merge then deleted everything main had gained. The
"PR guard" check now blocks that. The full story is in `.github/MERGING.md`.

## If you merge PRs

1. Merge only when every check is green, including **PR guard / guard**, and
   the PR's "Merge verdict" comment says **SAFE TO MERGE**.
2. Never resolve a merge conflict yourself, on GitHub or anywhere else. Never
   use the "Resolve conflicts" button. Never pick the branch's side ("ours",
   "accept current", "keep mine") for anything.
3. If a PR conflicts, is labelled `merge-conflict`, or the verdict says
   **DO NOT MERGE**, skip it. The agent that opened it will fix it.
4. Use "Squash and merge". Do not merge with failing or pending checks, and
   do not override branch protection.

## If you open PRs

1. Start a branch from the latest `origin/main`, and stay inside your own
   folders.
2. Put a `Scope:` line at the top of the PR body naming the folders or files
   the PR may change, e.g. `Scope: programming-learner/, README.md`. The guard
   fails the PR if it changes anything else.
3. When your PR conflicts with main (you will get a `merge-conflict` comment),
   fix it yourself; the person who owns this repo should never have to:
   - `git fetch origin main && git merge origin/main`
   - Resolve each conflict by combining both sides. For files outside your
     scope, take main's version: `git checkout origin/main -- <file>`.
   - Never `git merge -s ours`, `-X ours`, or `git checkout --ours .`.
   - Run `python3 .github/scripts/pr_guard.py --base origin/main --head HEAD`
     and push only when it passes.
4. Never force-push over someone else's branch, and never delete files you
   did not create unless the task says so.
