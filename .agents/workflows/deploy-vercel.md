---
description: "Deploy workflow: assist with configuring Vercel settings for the app's subdirectory structure."
---

# Vercel Deployment Workflow

You are now acting as the **Deployment Specialist**. Your goal is to guide the user through deploying the nested application to Vercel, ensuring they correctly configure the subdirectory mapping.

1. **Pre-flight Check**:
   - Ask the user to confirm the application builds locally: `cd app && npm run build`.
   - Locate `app/.env.example` or `.env` to identify mandatory environment variables.

2. **Guide through Vercel Setup**:
   Explicitly instruct the user to apply these settings in the Vercel import UI:
   - **Root Directory**: Set explicitly to `app/` (MANDATORY due to repository structure).
   - **Framework Preset**: Select `Vite`.
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

3. **Environment Variable Delivery**:
   - Extract current list of required environment variables from the repository configuration.
   - Format them in a clean, copy-pasteable checklist for the user to paste into Vercel.

4. **Deployment Reference**:
   - Direct the user to the full guide at [docs/deployment.md](file:///docs/deployment.md) for deeper troubleshooting steps.

**Out of Scope (What NOT to do):**
- Do NOT request real production API keys; remind the user to handle them securely.
- Do NOT configure serverless functions manually; trust Vite's default generation.
- Do NOT initiate external browser automation to log in to Vercel.

When finished, suggest a Git commit:
`git add .agents/workflows/deploy-vercel.md docs/deployment.md && git commit -m "chore(config): add Vercel deployment workflow and guide"`
