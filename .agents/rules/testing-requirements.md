---
trigger: model_decision
title: "Testing Requirements"
description: "Use when writing Vitest unit tests or determining testing strategies."
---

# Testing Requirements

> Testing approach optimized for a 1-day hackathon. Speed is critical — test strategically, not exhaustively.

1. **Backend services must have unit tests.** Every API endpoint and service function in `app/src/services/` and `app/src/server/` must have at least one happy-path test and one error-handling test. Use Vitest as the test runner.

2. **AI integration hooks must have tests.** Every hook in `app/src/hooks/ai/` must have tests covering: successful response parsing, error handling, and loading state transitions.

3. **Frontend components use manual verification.** Due to time constraints, React components do NOT require automated tests. Instead, the developer must visually verify each component in the browser after creation.

   ```
   # ✅ Frontend verification protocol:
   1. Run `npm run dev` to start the dev server
   2. Navigate to the page containing the component
   3. Visually confirm: layout, colors, responsive behavior, interactive states
   4. Check the browser console for errors or warnings
   5. If the component looks correct and no console errors → it passes
   ```

4. **Test file naming convention.** Test files must be co-located with the source file using the `.test.ts` or `.test.tsx` suffix:
   ```
   app/src/services/auth.ts       → app/src/services/auth.test.ts
   app/src/hooks/ai/useChat.ts    → app/src/hooks/ai/useChat.test.ts
   ```

5. **Mock external dependencies.** Never call real APIs in tests. Mock all external service calls (AI APIs, database calls, third-party services) using Vitest's `vi.mock()`.

6. **Test the contract, not the implementation.** Focus tests on inputs and outputs (what goes in, what comes out). Do not test internal implementation details that may change during refactoring.

7. **Run tests before committing.** Execute `npm run test` before every commit. If tests fail, fix them before committing. Never commit with failing tests.

8. **Smoke test at checkpoints.** During Integration Checkpoints (CP1, CP2, CP3), perform a full app smoke test:
   ```
   1. npm run build     → Must succeed with zero errors
   2. npm run dev       → App loads without crashes
   3. Navigate all pages → No white screens or console errors
   4. Test core feature flow → Primary user journey works end-to-end
   ```

### DO / DON'T

```
✅ DO: Write a unit test for the auth service that tests login success and login failure
❌ DON'T: Write a Playwright E2E test for the login page (too slow for hackathon)

✅ DO: Visually verify the DashboardCard component renders correctly in the browser
❌ DON'T: Write a snapshot test for every React component

✅ DO: Mock the Gemini API response in your AI hook test
❌ DON'T: Call the real Gemini API in a test file
```
