---
trigger: model_decision
title: "Terminal and Command Guidelines"
description: "Use when proposing terminal commands or running shell scripts."
---

# Terminal & Command Execution Rules

> Guidelines for proposing and running terminal commands in the Google Antigravity IDE across different operating systems and shell environments.

## 1. Shell and OS Awareness
Before proposing or running any terminal command, verify the operating system and active shell environment:
- **Windows PowerShell:**
  - Do **NOT** use `&&` to chain commands (it throws a parser error). Use `;` to separate statements or run commands as separate tool calls.
  - Correct: `git add -A; git commit -m "feat: description"` or run `git add -A` then `git commit` sequentially.
- **Unix-like shells (bash/zsh on macOS/Linux):**
  - Chaining with `&&` is fully supported and recommended for multi-step dependent execution.
- **Paths:** Use forward slashes `/` for cross-platform Git commands and tool parameters. Use backslashes `\` for native Windows system commands.

## 2. Never Use `cd` Commands
- Proposing or running `cd <directory>` is strictly forbidden.
- To execute a command in a different directory, always use the tool's `Cwd` parameter instead of changing the terminal's working directory.

## 3. Safe To Auto-Run Policy
Only mark commands as `SafeToAutoRun: true` when they meet all of the following:
1. **Read-Only / Non-Destructive:** No files are deleted, modified, or overwritten. Examples: `git status`, `git branch`, `npm run build` (validation), `git diff`.
2. **Deterministic:** The command is non-interactive and does not wait for user input.
- **Destructive operations** (e.g., package installation, file deletion, `git reset`, `git commit`, `git push`) **MUST** be set to `SafeToAutoRun: false` and require user approval.

## 4. Multi-Command Execution
- When executing multiple dependent commands on Windows PowerShell, propose them as separate sequential tool calls rather than a single chained string to ensure that if one step fails, subsequent steps are safely halted.

### DO / DON'T

```
✅ DO (Windows PowerShell): Proposed as two separate commands or separated with `;`
git add -A
git commit -m "feat(frontend): add login screen"

❌ DON'T (Windows PowerShell):
git add -A && git commit -m "feat(frontend): add login screen"

✅ DO (All environments): Use Cwd parameter to set the working directory
Tool Call: run_command(CommandLine="npm install", Cwd="c:/project/app")

❌ DON'T: Proposed command string containing cd
CommandLine="cd app && npm install"
```
