---
trigger: always_on
---

# App Architecture Rules

> Canonical directory map, layer responsibilities, and data flow conventions for the Vite + React 19 + TypeScript + Zustand application. Every file you create MUST live in the correct directory per this map.

## 1. Directory Map & Responsibilities

```
app/src/
├── assets/            # Static imports (SVGs used as React components, tiny PNGs)
│   └── images/        # Raster images imported into components (prefer public/ for large files)
├── components/        # Reusable UI components (see component-patterns.md)
│   ├── ui/            # Atomic primitives: Button, Input, Badge, Spinner, etc.
│   ├── layout/        # Structural shells: AppShell, Sidebar, Header, Footer, PageContainer
│   └── <feature>/     # Feature-scoped composites: e.g., dashboard/, chat/, settings/
├── hooks/             # Custom React hooks (non-AI)
│   └── ai/            # AI-specific hooks: useChat, useGenerate, useStream (Lane 3 only)
├── i18n/              # Internationalization config & locale JSON files
│   ├── config.ts      # i18next initialization
│   └── locales/       # en.json, hr.json
├── lib/               # Pure utility modules with NO React dependency
│   └── ai/            # AI client wrappers, prompt builders (Lane 3 only)
├── middleware/         # Request/response middleware, auth guards, interceptors
├── pages/             # Route-level page components (one per route, lazy-loaded)
├── server/            # Backend API route handlers, server-side logic
├── services/          # Data-access layer: API clients, external service wrappers
│   └── ai/            # AI service clients: Gemini API, embedding service (Lane 3 only)
├── stores/            # Zustand store definitions (one store per domain)
├── styles/            # Global CSS
│   └── tokens.css     # Design token definitions (single source of truth for all visual values)
├── types/             # Shared TypeScript type definitions & interfaces
│   └── index.ts       # Barrel export: ALL shared types re-exported here
├── utils/             # Stateless helper functions with no side effects
├── App.tsx            # Root component: route definitions, providers, error boundaries
├── App.css            # App-scoped layout styles
├── main.tsx           # Vite entry point: React root, i18n init, global CSS import
└── index.css          # Global reset + CSS custom properties from tokens
```

## 2. Layer Rules — What Goes Where

| Layer | Directory | Contains | NEVER Contains |
|---|---|---|---|
| **Pages** | `pages/` | Route-level components. One file per route. Composes feature components. Handles route params. | Business logic, API calls, reusable UI elements |
| **Components** | `components/` | All reusable React UI. Receives data via props. Emits events via callbacks. | Direct API calls, store subscriptions (use hooks instead), route logic |
| **Hooks** | `hooks/` | Custom hooks that bridge stores/services to components. Encapsulates side effects. | JSX, CSS, direct DOM manipulation |
| **Stores** | `stores/` | Zustand store slices. Pure state + actions. Synchronous by default. | API calls (delegate to services), React-specific code |
| **Services** | `services/` | Async data fetching, API client methods, external integrations. Returns typed data. | React hooks, JSX, state management, UI concerns |
| **Lib** | `lib/` | Pure functions, algorithms, formatters, validators. Zero dependencies on React or stores. | Side effects, API calls, React imports |
| **Utils** | `utils/` | Tiny stateless helpers (< 50 lines). Format dates, slugify strings, clamp numbers. | Classes, state, imports from other app layers |
| **Types** | `types/` | Interfaces, type aliases, enums, Zod schemas. Importable by ALL layers. | Runtime logic, function implementations |
| **Styles** | `styles/` | `tokens.css` (design tokens), global utility classes. | Component-specific styles (co-locate those with the component) |

## 3. Data Flow Direction (Strict Layering)

```
Page → Hook → Store ←→ Service → External API
  ↓       ↗
Component
```

**Rules:**
- **Pages** call **hooks** and pass data down to **components** via props.
- **Hooks** read from **stores** and call **services**. They are the ONLY bridge between UI and data.
- **Stores** hold client state. They do NOT call services directly — hooks orchestrate that.
- **Services** perform async I/O (fetch, WebSocket, SDK calls). They return typed responses.
- **Components** are pure UI. They receive props and emit callbacks. They do NOT import stores or services directly.
- **Lib/Utils** are consumed by ANY layer but never import from hooks, stores, services, or components.

**Import direction (allowed):**
```
pages → components, hooks
hooks → stores, services, lib, utils, types
stores → types (and optionally lib/utils for derived state)
services → lib, utils, types
components → lib, utils, types (and other components)
```

**Forbidden imports:**
- `components/` → `stores/`, `services/` (use hooks as intermediary)
- `stores/` → `services/`, `hooks/`, `components/`
- `services/` → `stores/`, `hooks/`, `components/`
- `utils/` or `lib/` → anything in `hooks/`, `stores/`, `services/`, `components/`

## 4. File Placement Decision Tree

When creating a new file, follow this logic:

1. **Does it define a route/page?** → `pages/`
2. **Is it a React component that renders UI?**
   - Is it a primitive (Button, Input, Modal)? → `components/ui/`
   - Is it a layout wrapper (Sidebar, Header)? → `components/layout/`
   - Is it feature-specific (DashboardCard, ChatBubble)? → `components/<feature>/`
3. **Does it use `useState`/`useEffect` and bridge data to UI?** → `hooks/` (or `hooks/ai/`)
4. **Does it call `fetch` or an external SDK?** → `services/` (or `services/ai/`)
5. **Does it hold global client state with Zustand?** → `stores/`
6. **Is it a pure function with no side effects?**
   - < 50 lines, single concern? → `utils/`
   - Larger module, multiple related functions? → `lib/`
7. **Is it a TypeScript interface or type?** → `types/`
8. **Is it a CSS file?**
   - Global tokens? → `styles/tokens.css`
   - Component-specific? → Co-locate next to the component file

## 5. Barrel Export Policy

- **`types/index.ts`** — REQUIRED barrel. All shared types must be re-exported from here. Import types as `import { MyType } from '@/types'`.
- **`components/ui/index.ts`** — REQUIRED barrel. Re-export all atomic UI primitives for clean imports: `import { Button, Input, Badge } from '@/components/ui'`.
- **`stores/index.ts`** — OPTIONAL barrel. Acceptable but not required since stores are typically imported individually.
- **All other directories** — Do NOT create barrel files. Import directly from the module path: `import { useAuth } from '@/hooks/useAuth'`.

## 6. Routing Conventions

- Use `react-router-dom` v7 with `<BrowserRouter>` in `App.tsx`.
- Define all routes in `App.tsx` using `<Routes>` and `<Route>`.
- Every page component must be **lazy-loaded** via `React.lazy()` with a `<Suspense>` fallback.
- Route paths are **kebab-case**: `/dashboard`, `/farm-overview`, `/ai-chat`.
- Nested routes use `<Outlet>` in layout components.
- Route params use camelCase: `/farm/:farmId/sheep/:sheepId`.

```tsx
// ✅ DO — in App.tsx
const Dashboard = React.lazy(() => import('@/pages/Dashboard'));

<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<AppShell />}>
      <Route index element={<Dashboard />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  </Routes>
</Suspense>
```

## 7. New Feature Checklist

When adding a feature (e.g., "sheep health monitoring"), create files in this order:

1. **Types** → `types/sheepHealth.ts` + re-export from `types/index.ts`
2. **Service** → `services/sheepHealthService.ts` (API client)
3. **Store** → `stores/sheepHealthStore.ts` (if global state needed)
4. **Hook** → `hooks/useSheepHealth.ts` (bridges store + service to UI)
5. **Components** → `components/sheep-health/SheepHealthCard.tsx` etc.
6. **Page** → `pages/SheepHealth.tsx` (composes components, uses hooks)
7. **Route** → Add lazy route in `App.tsx`
8. **i18n** → Add keys to `locales/en.json` and `locales/hr.json`

### DO / DON'T

```
✅ DO: Create components/dashboard/MetricCard.tsx for a dashboard-specific card
❌ DON'T: Create components/MetricCard.tsx (ungrouped feature component)

✅ DO: Import a Zustand store inside a hook, then pass data to a component via props
❌ DON'T: Import useAppStore directly inside a component

✅ DO: Put a pure date formatter in utils/formatDate.ts
❌ DON'T: Put a date formatter that calls an API in utils/

✅ DO: Lazy-load every page component in App.tsx
❌ DON'T: Eagerly import all pages at the top of App.tsx

✅ DO: Create components/ui/Button.tsx and re-export from components/ui/index.ts
❌ DON'T: Create a Button.tsx in the root of components/ with no grouping
```