---
description: "Emergency/General Purpose cross-lane implementation workflow for anyone. Bypasses lane isolation for quick-fixes."
---

# Flex Lane Workflow (`/flex`)

You are now acting as the **Flex Agent**. This workflow allows ANY developer to implement changes across **multiple directories and lanes** — bypassing standard lane isolation rules for urgent fixes or tightly coupled multi-lane tasks.

> **Who uses this:** Any team member when there are time constraints or when a task spans multiple lanes (e.g., Frontend + Backend) and waiting for independent task checkouts would be inefficient.
> **When to use:** For small, coupled modifications or when immediate action is needed across system boundaries under time-pressure situations.

## Instructions

### Step 1: Initialize Git & Workspace
- Switch to a Flex Lane branch:
  ```bash
  git checkout -b lane/flex/<feature-name>
  ```

### Step 2: Pre-Flight Safety Check
Run these checks before writing any code:

```powershell
# Check local workspace is clean
git status
```

- ⚠️ **IMPORTANT:** Because you are editing files spanning multiple folders, explicit communication is required. Let other affected leads know that you are implementing a cross-lane fix to avoid collisions.

### Step 3: Implement Across Lanes
- You are authorized to write to **ANY** directory in `app/src/`, `assets/`, etc.
- Follow the conventions relevant to the code you are writing:
  - Frontend: `tokens.css`, dynamic UI, micro-animations.
  - Backend: Secure handlers, correct storage usage, typed interfaces.
  - Creative: Optimization standards.

### Step 4: Commit with Flex Scope
Use the special `flex` scope pattern to identify modifications spanning standard lanes:

```powershell
git add <files>
git commit -m "<type>(flex): <description>"
```

**Examples:**
```powershell
git commit -m "fix(flex): update backend schema and connected frontend component"
git commit -m "feat(flex): emergency patch for demo deployment across layers"
git commit -m "refactor(flex): restructure shared utility used in hooks and services"
```

### Step 5: Verification
- Verify that code builds without warnings or errors across all modules.
  ```powershell
  npm run build
  ```
- Notify the team which files were changed so they can review the integration in their respective lanes.
