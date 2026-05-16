---
trigger: always_on
title: "Security And Secrets"
---

# Security & Secrets Rules

> Never expose secrets. Treat every commit as if it will be public.

1. **NEVER commit secrets.** API keys, tokens, passwords, and credentials must NEVER appear in source code, config files, or commit messages. This includes Gemini API keys, database URLs, and third-party service tokens.

2. **Use environment variables.** All secrets must be accessed via `process.env.VARIABLE_NAME` or an equivalent runtime config. Never hardcode values.

   ```ts
   // ✅ DO
   const apiKey = process.env.GEMINI_API_KEY;
   if (!apiKey) throw new Error('GEMINI_API_KEY is not configured');

   // ❌ DON'T
   const apiKey = 'AIzaSyB1234567890abcdef';
   ```

3. **Maintain `.env.example`.** The repo must contain a `.env.example` file listing every required environment variable with placeholder values and brief descriptions:
   ```env
   # AI Service Configuration
   GEMINI_API_KEY=your-gemini-api-key-here
   # Database
   DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
   ```

4. **`.env` files are gitignored.** Verify `.gitignore` includes: `.env`, `.env.local`, `.env.*.local`, `*.pem`, `*.key`. Never override this.

5. **No secrets in logs or error messages.** Never log API keys, tokens, or passwords. Sanitize error messages before displaying them to users.

   ```ts
   // ✅ DO
   console.error('Gemini API call failed:', error.message);

   // ❌ DON'T
   console.error('API call failed with key:', apiKey, error);
   ```

6. **Client-side code cannot hold secrets.** Never import server-side API keys in React components. API calls requiring secrets must go through a backend proxy/endpoint.

7. **Review before committing.** Before every commit, scan staged files for accidentally included secrets. If a secret was committed, immediately rotate the key and force-push a cleaned history.

### DO / DON'T

```
✅ DO: Store GEMINI_API_KEY in .env and access via process.env
❌ DON'T: Paste an API key directly into a service file

✅ DO: Keep .env.example updated with all required variables
❌ DON'T: Add a new env var without documenting it in .env.example

✅ DO: Call the AI API from a server endpoint, not from the React client
❌ DON'T: Import process.env.GEMINI_API_KEY in a React component
```
