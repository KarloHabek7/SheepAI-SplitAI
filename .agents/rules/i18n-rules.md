---
trigger: model_decision
title: "I18n Rules"
description: "Use when adding user-facing text, localization keys, or formatting internationalization strings."
---

# Internationalization (i18n) Rules

> All user-facing text must be internationalized. No hardcoded strings in components.

1. **No hardcoded user-facing strings.** Every piece of text visible to the user must use a translation function. Never write raw text in JSX.

   ```tsx
   // ✅ DO
   import { useTranslation } from 'react-i18next';
   export function WelcomeBanner(): React.JSX.Element {
     const { t } = useTranslation();
     return <h1>{t('welcome.title')}</h1>;
   }

   // ❌ DON'T
   export function WelcomeBanner(): React.JSX.Element {
     return <h1>Welcome to ShepherdAI</h1>;
   }
   ```

2. **Key naming convention:** `<page/component>.<element>.<detail>`, dot-separated, lowercase.
   - `dashboard.title`, `auth.login.button`, `common.loading`, `common.error.generic`

3. **Locale files location:** `app/src/i18n/locales/en.json` (primary) and `hr.json` (Croatian).

4. **Add keys to ALL locale files.** Use `[TODO]` prefix for untranslated placeholders.

5. **Shared locale files are additive-only.** Only ADD new keys. Never delete, rename, or reorder existing keys.

6. **Use interpolation, not concatenation.**
   ```tsx
   // ✅ DO: t('welcome.greeting', { name: user.name })
   // ❌ DON'T: t('welcome.hello') + ' ' + user.name
   ```

7. **Pluralization:** Use `_one` / `_other` suffix convention per i18next standard.

### DO / DON'T

```
✅ DO: {t('nav.home')} in JSX, with "nav.home": "Home" in en.json
❌ DON'T: <span>Home</span> directly in JSX

✅ DO: Add new keys to both en.json and hr.json
❌ DON'T: Add a key to en.json only and forget hr.json
```
