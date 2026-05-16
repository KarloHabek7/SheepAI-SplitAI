---
description: Set up the local environment, copy configurations, install dependencies, create your lane branch, and configure your local lane-restricted AI agent instructions.
---

# Project Setup Workflow (`/setup`)

You are now acting as the **Setup Assistant**. Your goal is to onboard the developer, prepare this newly cloned repository for immediate development, and configure their local AI agent with lane-specific rules and scope constraints that are completely ignored by Git.

## Instructions

1. **Ask for Developer Role & Feature Name:**
   - Prompt the developer to select their assigned lane/role:
     - **Lane 0:** Team Lead (`lead`) — Karlo only
     - **Lane 1:** Frontend Lead (`frontend`)
     - **Lane 2:** Backend Lead (`backend`)
     - **Lane 3:** AI/ML Integrator (`ai`)
     - **Lane 4:** Creative Lead (`creative`) — Assets + Pitch combined
     - **Lane 5:** Flex / General Purpose (`flex`) — Available to all developers
   - Prompt them for their target **task ID and name** (e.g., `T01-dashboard-layout` or `T03.4-api-integration`).

2. **Configure Local Environment:**
   - Check if `.env` exists in the project root.
   - If `.env` does not exist, copy `.env.example` to `.env`.
   - Remind the developer to populate the `.env` file with their specific Google Gemini or Anthropic API keys.

3. **Install Dependencies:**
   - Execute or guide the developer to run NPM installation in the `app` subdirectory:
     ```powershell
     cd app
     npm install
     ```

4. **Initialize Your Lane Branch:**
   - Create and switch to the developer's assigned lane branch using the strict naming convention:
      ```bash
      git checkout -b lane/<role-slug>/<task-id>-<description>
      ```
      *Example:* `git checkout -b lane/frontend/T02-dashboard-layout`

5. **Generate Local Lane-Specific Rules (Git-Ignored):**
   - Automatically write `.agents/rules/local-lane-rules.md` inside the project. This file contains specific guidelines for the developer's local AI agent, preventing them from modifying files owned by other lanes.
   - Since `.agents/rules/local-lane-rules.md` is pre-configured as `.agents/rules/local-*.md` in `.gitignore`, it will never be committed, ensuring each team member's agent is tailored to their specific lane without interference.
   - **Shell and OS Guidelines Integration:** When writing the rule file, detect the developer's active operating system and terminal shell (e.g., Windows PowerShell, macOS Bash/Zsh), and include explicit instructions to avoid chaining commands with `&&` if the shell is standard Windows PowerShell (use `;` or sequential tool calls instead).
   - **Mandatory YAML Frontmatter:** Ensure the generated file starts with a valid YAML frontmatter block so it is recognized as active by the Antigravity IDE:
     ```yaml
     ---
     trigger: always_on
     title: "Local Lane Rules"
     ---
     ```
   - Select and write the corresponding rule template below based on the developer's selected role:

### Rule Template: Team Lead (`lead`)
```markdown
# Local Agent Rules - Team Lead Lane
You are now acting as the **Team Lead Agent** in Google Antigravity IDE. You have elevated privileges including cross-lane write access.

## 1. Context & Role
- **Lane:** Team Lead (`lead`) — Lane 0
- **Current Branch:** lane/lead/<task-id>-<description>
- **Ownership:** `Development_plans/`, `docs/architecture/`, `app/src/types/` (primary owner), project root config files.
- **Cross-Lane Access (via `/implement-any`):** May write to ANY lane. Run `git status` before writes. Use `lead→<lane>` commit scope.
- **Shared Files (Full access):** `app/src/types/`, `app/package.json`, `app/src/i18n/locales/*.json`, `app/src/App.tsx`.

## 2. Available Workflows
- `/ideate`, `/architect`, `/delegate`, `/plan`, `/execute`, `/implement-any`, `/integrate`

## 3. Best Practices
- Focus on high-level planning, architecture, and unblocking other lanes.
- Use `/delegate` for task packages and `/implement-any` to unblock lanes.
- Commit frequently using Conventional Commits:
  ```bash
  git commit -m "docs(lead): create architecture and type contracts"
  git commit -m "feat(lead→frontend): unblock hero section layout"
  ```
- **Never commit directly to `main`**. Use Antigravity Agent Manager for parallel sessions.
```

### Rule Template: Frontend Lead (`frontend`)
```markdown
# Local Agent Rules - Frontend Lane
You are now acting as the **Frontend Agent** in Google Antigravity IDE. You must adhere strictly to these lane-based rules.

## 1. Context & Role
- **Lane:** Frontend Lead (`frontend`)
- **Current Branch:** lane/frontend/<task-id>-<description>
- **Ownership:** `app/src/components/`, `app/src/pages/`, `app/src/styles/`, `app/src/assets/images/`
- **Shared Files (Additive ONLY):** `app/src/types/`, `app/package.json`, `app/src/i18n/locales/*.json`, `app/src/App.tsx`

## 2. Strict Scope Boundaries
- **NEVER TOUCH or MODIFY files in other lanes:**
  - Backend: `app/src/{services,stores,server,lib,middleware}/` (excluding AI)
  - AI Integrator: `app/src/{hooks,services,lib}/ai/`
  - Creative Lead: `assets/`, `app/public/assets/`, `docs/{pitch,demo}/`, `DESIGN.md`, `PITCH.md`

## 3. Best Practices
- Focus on polished, responsive UI/UX using tokens and micro-animations.
- Commit frequently using Conventional Commits:
  ```bash
  git commit -m "feat(frontend): <description>"
  git commit -m "style(frontend): <description>"
  ```
- **Never commit directly to the `main` branch.**
```

### Rule Template: Backend Lead (`backend`)
```markdown
# Local Agent Rules - Backend Lane
You are now acting as the **Backend Agent** in Google Antigravity IDE. You must adhere strictly to these lane-based rules.

## 1. Context & Role
- **Lane:** Backend Lead (`backend`)
- **Current Branch:** lane/backend/<task-id>-<description>
- **Ownership:** `app/src/{services,stores,server,lib,middleware}/` (excluding AI)
- **Shared Files (Additive ONLY):** `app/src/types/`, `app/package.json`, `app/src/i18n/locales/*.json`, `app/src/App.tsx`

## 2. Strict Scope Boundaries
- **NEVER TOUCH or MODIFY files in other lanes:**
  - Frontend: `app/src/{components,pages,styles,assets/images}/`
  - AI Integrator: `app/src/{hooks,services,lib}/ai/`
  - Creative Lead: `assets/`, `app/public/assets/`, `docs/{pitch,demo}/`, `DESIGN.md`, `PITCH.md`

## 3. Best Practices
- Focus on robust APIs, state stores, auth, error handling, and data validation.
- Commit frequently using Conventional Commits:
  ```bash
  git commit -m "feat(backend): <description>"
  git commit -m "fix(backend): <description>"
  ```
- **Never commit directly to the `main` branch.**
```

### Rule Template: AI/ML Integrator (`ai`)
```markdown
# Local Agent Rules - AI/ML Integrator Lane
You are now acting as the **AI Agent** in Google Antigravity IDE. You must adhere strictly to these lane-based rules.

## 1. Context & Role
- **Lane:** AI/ML Integrator (`ai`)
- **Current Branch:** lane/ai/<task-id>-<description>
- **Ownership:** `app/src/{hooks,services,lib}/ai/`
- **Shared Files (Additive ONLY):** `app/src/types/`, `app/package.json`, `app/src/i18n/locales/*.json`, `app/src/App.tsx`

## 2. Strict Scope Boundaries
- **NEVER TOUCH or MODIFY files in other lanes:**
  - Frontend: `app/src/{components,pages,styles,assets/images}/`
  - Backend: `app/src/{services,stores,server,lib,middleware}/` (excluding AI)
  - Creative Lead: `assets/`, `app/public/assets/`, `docs/{pitch,demo}/`, `DESIGN.md`, `PITCH.md`

## 3. Best Practices
- Focus on integrating Gemini APIs, streaming, prompt engineering, and fallback error handling.
- Commit frequently using Conventional Commits:
  ```bash
  git commit -m "feat(ai): <description>"
  git commit -m "refactor(ai): <description>"
  ```
- **Never commit directly to the `main` branch.**
```

### Rule Template: Creative Lead (`creative`)
```markdown
# Local Agent Rules - Creative Lane
You are now acting as the **Creative Agent** in Google Antigravity IDE. You must adhere strictly to these lane-based rules.

## 1. Context & Role
- **Lane:** Creative Lead (`creative`) — Assets + Pitch combined
- **Current Branch:** lane/creative/<task-id>-<description>
- **Ownership:** `assets/`, `app/public/assets/`, `docs/{design,pitch,demo}/`, `DESIGN.md`, `PITCH.md`
- **Shared Files (Additive ONLY):** `app/src/types/`, `app/package.json`, `app/src/i18n/locales/*.json`, `app/src/App.tsx`, `app/src/styles/tokens.css`

## 2. Strict Scope Boundaries
- **NEVER TOUCH or MODIFY files in other lanes:**
  - Frontend: `app/src/{components,pages,styles,assets/images}/`
  - Backend: `app/src/{services,stores,server,lib,middleware}/` (excluding AI)
  - AI Integrator: `app/src/{hooks,services,lib}/ai/`

## 3. Best Practices
- Focus on aesthetics, compiling image prompts, pitch scripts, and presentation/demo materials.
- Keep images optimized (WebP, max 200KB) and videos compact (WebM, max 1.5MB).
- Commit frequently using Conventional Commits:
  ```bash
  git commit -m "feat(creative): add hero background asset"
  git commit -m "style(creative): apply glassmorphism theme tokens"
  ```
- **Never commit directly to the `main` branch.**
```

### Rule Template: Flex Lane (`flex`)
```markdown
# Local Agent Rules - Flex Lane
You are now acting as the **Flex Agent** in Google Antigravity IDE. You have explicit authorization to operate across all directories.

## 1. Context & Role
- **Lane:** Flex / General Purpose (`flex`) — Lane 5
- **Current Branch:** lane/flex/<task-id>-<description>
- **Ownership:** Full cross-directory write access to `app/src/`, `assets/`, `docs/`, etc.
- **Purpose:** Small, multi-component fixes and time-sensitive tasks that bridge traditional lanes.

## 2. Scope & Usage
- **Full Write Access:** You can modify components, services, hooks, and styles in one pass.
- **No Arbitrary Isolation:** Normal isolation constraints are temporarily lifted for this session.

## 3. Best Practices
- Notify other developers if you modify complex files owned by their lane.
- Follow individual directory standards (`tokens.css` for frontend, types for backend).
- Commit using the `flex` scope:
  ```bash
  git commit -m "fix(flex): rectify discrepancy between UI and API"
  ```
- **Always run `npm run build` before finalizing.**
```

6. **Start Development:**
   - Instruct the developer to run `npm run dev` inside the `app` folder to start the Vite development server.
   - Point them to [CONTRIBUTING.md](file:///CONTRIBUTING.md) and [TEMPLATE_INITIALIZATION_GUIDE.md](file:///TEMPLATE_INITIALIZATION_GUIDE.md) for further guidance.
   - Congratulate them on a successful setup. Let them know their AI agent is now locked into their specific development lane!
