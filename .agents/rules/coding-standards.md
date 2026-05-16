---
trigger: model_decision
title: "Coding Standards"
description: "Use when writing TypeScript, React functional components, or styling components."
---

# Coding Standards

> TypeScript/React coding conventions for this project. All code must follow these rules.

1. **TypeScript strict mode is mandatory.** All files must be `.ts` or `.tsx`. Never use `any` type — use `unknown` and narrow with type guards. Enable `"strict": true` in `tsconfig.json`.

2. **React functional components only.** Use function declarations with explicit return types. Never use class components. Always type props with an interface.

   ```tsx
   // ✅ DO
   interface DashboardCardProps {
     title: string;
     value: number;
     icon: React.ReactNode;
   }

   export function DashboardCard({ title, value, icon }: DashboardCardProps): React.JSX.Element {
     return <div className="card">{icon} {title}: {value}</div>;
   }

   // ❌ DON'T
   export default function DashboardCard(props: any) { ... }
   ```

3. **Named exports only.** Never use `export default`. All components, hooks, and utilities must use named exports for consistent imports and better refactoring support.

4. **Use path aliases.** Import with `@/` path aliases (e.g., `import { Button } from '@/components/Button'`). Never use relative paths deeper than one level (`../../` is forbidden).

5. **Hooks naming convention.** Custom hooks must start with `use` and be placed in `app/src/hooks/`. Keep hooks focused — one hook per concern.

6. **File naming conventions:**
   - Components: `PascalCase.tsx` (e.g., `DashboardCard.tsx`)
   - Hooks: `camelCase.ts` (e.g., `useAuth.ts`)
   - Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
   - Types: `camelCase.ts` in `app/src/types/`
   - Styles: `kebab-case.css` (e.g., `dashboard-card.css`)

7. **No inline styles.** Use CSS classes from `tokens.css` or component-level CSS files. Inline `style={{}}` props are prohibited except for truly dynamic values (e.g., computed positions).

8. **ESLint compliance.** All code must pass the project ESLint configuration without warnings. Fix lint issues before committing — do not add `eslint-disable` comments unless absolutely necessary (and document why).

9. **Prefer const over let.** Never use `var`. Use `const` by default; use `let` only when reassignment is required.

10. **Error boundaries.** Wrap major page sections in React Error Boundaries. Never let an unhandled error crash the entire app.

### DO / DON'T

```
✅ DO: export function UserProfile({ user }: UserProfileProps): React.JSX.Element
❌ DON'T: export default function UserProfile(props: any)

✅ DO: import { formatDate } from '@/lib/formatDate'
❌ DON'T: import { formatDate } from '../../../lib/formatDate'

✅ DO: const [count, setCount] = useState<number>(0)
❌ DON'T: let count = 0; // mutating local variable instead of state
```
