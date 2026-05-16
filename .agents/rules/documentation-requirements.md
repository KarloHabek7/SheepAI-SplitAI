---
trigger: model_decision
title: "Documentation Requirements"
description: "Use when writing JSDoc comments, updating README, or logging API endpoints."
---

# Documentation Requirements

> All code must be self-documenting with strategic inline documentation. Keep docs concise — this is a hackathon, not a textbook.

1. **JSDoc on all exported functions and components.** Every exported function, hook, and component must have a JSDoc comment with a brief description, parameter types, and return type.

   ```tsx
   // ✅ DO
   /**
    * Fetches user data from the API and manages loading/error state.
    * @param userId - The unique identifier of the user to fetch.
    * @returns User data, loading flag, and error state.
    */
   export function useUser(userId: string): UseUserResult { ... }

   // ❌ DON'T
   export function useUser(userId: string) { ... } // no documentation
   ```

2. **Comment the "why", not the "what".** Do not write comments that restate the code. Write comments that explain non-obvious business logic, workarounds, or architectural decisions.

   ```tsx
   // ✅ DO
   // Debounce AI requests by 300ms to avoid rate-limiting the Gemini API
   const debouncedGenerate = useDebouncedCallback(generate, 300);

   // ❌ DON'T
   // Set debounce to 300
   const debouncedGenerate = useDebouncedCallback(generate, 300);
   ```

3. **README.md must be kept current.** The project README must contain:
   - Project name and one-line description
   - Setup instructions (`npm install`, `npm run dev`)
   - Environment variables needed (reference `.env.example`)
   - Team members and their lane assignments

4. **DESIGN.md is the design source of truth.** Any change to the design system (colors, typography, spacing, component patterns) must be reflected in `DESIGN.md`. Frontend agents must read this file before styling.

5. **API endpoints must be documented.** Each API route must have a brief comment at the handler level specifying: HTTP method, path, request body shape, and response shape.

   ```ts
   // POST /api/chat
   // Request: { message: string, conversationId?: string }
   // Response: APIResponse<{ reply: string, tokens: number }>
   export async function handleChat(req: Request): Promise<Response> { ... }
   ```

6. **Changelog updates for features.** When completing a significant feature, add a one-line entry to `CHANGELOG.md` under the current date. Format: `- [Lane] Description of what was added`.

7. **No TODO comments without context.** If you leave a `TODO`, include your name/lane and a brief description. Bare `// TODO` comments are forbidden.

   ```ts
   // ✅ DO
   // TODO(frontend): Replace mock data with real API call after CP1

   // ❌ DON'T
   // TODO: fix this later
   ```

### DO / DON'T

```
✅ DO: Add JSDoc to your exported useAuth hook explaining what it returns
❌ DON'T: Write a 20-line essay above a simple utility function

✅ DO: Update README.md with the new environment variable your feature needs
❌ DON'T: Add an API_KEY to .env without documenting it anywhere

✅ DO: Comment why you chose a 5-second polling interval for real-time updates
❌ DON'T: Comment "this polls every 5 seconds" (the code already says that)
```
