# Vercel Deployment Guide

This document provides explicit instructions on how to deploy the Hackathon application to Vercel, respecting our repository's nested architecture.

## Repository Structure Recap

Our codebase uses a structured directory layout where the React application is contained within the `app/` subdirectory:
```
/                      <-- Repository Root
├── .agents/
├── Output/
├── app/               <-- React/Vite Project Root
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
```

## Deployment Instructions

### 1. Connect Project to Vercel
1. Log into the [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** > **Project**.
3. Select your Git repository and click **Import**.

### 2. Configure Framework and Directories
The most critical step is setting the **Root Directory**. Vercel will not auto-detect the Vite configuration if this is left at the default repository root.

1. **Framework Preset**: Select `Vite`.
2. **Root Directory**: Click `Edit` and select the `app` folder, or manually type `app`.
3. Ensure "Include source files outside of the Root Directory in the Build Step" is **unchecked** (unless you have cross-referenced assets outside the folder).

### 3. Build and Output Settings
Once the Root Directory is set to `app`, verify that Vercel uses the following defaults:
- **Build Command**: `npm run build` (or `vite build`)
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Environment Variables
Before clicking Deploy, expand the **Environment Variables** section:
1. Open the `.env` (or `.env.example`) file in the project.
2. Copy and paste each required environment variable (e.g., `GEMINI_API_KEY`, `VITE_API_URL`).
3. DO NOT check secrets into Git; paste them directly here.

### 5. Verify Deployment
1. Click **Deploy**.
2. Wait for the build to complete.
3. Test the resulting `vercel.app` link to verify that assets and API calls are resolving correctly.

## Troubleshooting

- **Issue:** Build fails finding `package.json`.
  **Solution:** Ensure the "Root Directory" setting in Vercel Project Settings is explicitly set to `app`.
- **Issue:** Environment variables are not found in the UI.
  **Solution:** Vite requires client-side variables to be prefixed with `VITE_`. Ensure they are mapped correctly in the Vercel dashboard.
