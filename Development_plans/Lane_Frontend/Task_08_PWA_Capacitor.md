# Task 08: PWA Setup + Responsive Polish + Capacitor Mobile

> **Lane:** Frontend
> **Priority:** P2-Medium
> **Estimated Effort:** L (60-120min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** ON
> **Can Parallelize With:** None (runs after all other Frontend tasks)
> **Depends On:** Frontend T01–T07 (all pages must exist)

## Objective
Final polish pass: (1) configure PWA with manifest + service worker for installability, (2) responsive audit across all pages ensuring mobile-first perfection, and (3) Capacitor initialization + Android platform setup for native APK build. This task transforms the web app into an installable, native-ready product.

## Context Snapshot
**Read these files before starting:**
- `docs/architecture/ARCHITECTURE.md` — Section 11.1 (Capacitor Mobile Architecture), Section 10.1 (Frontend tech stack: PWA + Capacitor)
- All page components created by T01–T07

## Interface Contract
**This task PRODUCES:**
- `app/public/manifest.json` — PWA manifest with app name, icons, theme color
- PWA service worker configuration via `vite-plugin-pwa`
- `app/capacitor.config.ts` — Capacitor configuration
- `app/android/` — Auto-generated Android project
- Responsive CSS fixes across all pages
- Touch target improvements (minimum 44x44px)

**This task CONSUMES:**
- All existing pages and components
- `styles/tokens.css`
- App icons from Creative lane (use placeholders if not ready)

## Implementation Steps
1. **PWA Setup:**
   - Install `vite-plugin-pwa`
   - Configure in `vite.config.ts` with manifest (name: "SplitAI", short_name: "SplitAI", theme_color from tokens)
   - Add PWA icons (use placeholder 192x192 + 512x512 if Creative hasn't delivered)
   - Verify "Add to Home Screen" works in Chrome DevTools

2. **Responsive Polish:**
   - Audit each page at 375px, 768px, 1024px, 1440px widths
   - Ensure all touch targets ≥ 44x44px
   - Fix any overflow/scroll issues
   - BottomNav spacing and icon sizes on small screens
   - Admin table horizontal scroll on mobile
   - Map overlays not blocking content on small screens

3. **Capacitor Init:**
   - `npm install @capacitor/core @capacitor/cli`
   - `npx cap init "SplitAI" "com.splitai.app" --web-dir dist`
   - `npm install @capacitor/camera @capacitor/geolocation @capacitor/haptics`
   - `npx cap add android`
   - Build web app: `npm run build`
   - Sync: `npx cap sync`
   - Verify Android project generates successfully

## Acceptance Criteria
- [ ] PWA manifest loads correctly (Chrome DevTools > Application > Manifest)
- [ ] "Add to Home Screen" prompt works
- [ ] Service worker caches app shell for offline loading
- [ ] All pages render correctly at 375px width (mobile)
- [ ] All touch targets ≥ 44x44px
- [ ] No horizontal overflow on any page at any breakpoint
- [ ] Capacitor config file exists and is valid
- [ ] `android/` directory is generated
- [ ] `npm run build` passes
- [ ] `npx cap sync` completes without errors

## Out of Scope (CRITICAL)
- Do NOT build the APK (just set up the project)
- Do NOT implement push notifications
- Do NOT modify page logic — only CSS/layout fixes
- Do NOT modify files outside `app/` directory

## Handoff
- Push to: `lane/frontend/pwa-capacitor`
- Notify: Team Lead (mobile build ready for demo)
- Next task enabled: APK build (manual step by Team Lead)

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Frontend/Task_08_PWA_Capacitor.md`
