---
trigger: model_decision
title: "State & Services Architecture"
description: "Use when building Zustand stores, API services, or React custom hooks for data fetching."
---

# State & Services Architecture

> Rules for managing application state, writing external services, and bridging them to the UI using custom hooks. 

## 1. State Location Strategy

Before creating a state variable, determine where it belongs based on this hierarchy:

| State Type | Mechanism | Examples |
|---|---|---|
| **Local UI State** | `useState` / `useReducer` | Open/closed dropdown, active tab, text input value before submit. |
| **URL State** | `react-router-dom` (URL params / search params) | Active filter, search query, current page ID (`?q=sheep&page=2`). |
| **Global Client State** | `Zustand` (`stores/`) | User preferences (theme, language), client-side session data, cached app state. |
| **Server State** | `Services` + `Hooks` | Data fetched from the API (sheep health records, farm metrics). |

**Rule of Thumb:**
- If only one component needs it, use `useState`.
- If the user needs to bookmark/share it, use the URL.
- If multiple distant components need it but it doesn't come from the server, use `Zustand`.
- If it comes from an API, handle it in a service and expose it via a custom hook.

## 2. Zustand Store Patterns (`stores/`)

1. **One Store Per Domain:** Create separate stores for different domains (e.g., `useAuthStore`, `useSettingsStore`). Avoid giant monolithic stores.
2. **Action Separation:** Group state and actions together within the store slice.
3. **No Side Effects:** Store actions must be synchronous and pure. Do NOT put `fetch` or API calls inside Zustand actions. Services fetch data, hooks pass it to stores if necessary.
4. **Selective Subscriptions:** When using a store in a hook or component, always select only the state you need to avoid unnecessary re-renders.

```ts
// ✅ DO: Selective import
const theme = useSettingsStore((state) => state.theme);

// ❌ DON'T: Import whole store
const { theme } = useSettingsStore(); 
```

## 3. Service Layer Patterns (`services/`)

The `services/` directory is strictly for I/O: API calls, external SDKs, WebSocket connections.

1. **Pure Data Fetching:** Services return Promises of typed data. They never hold React state, and they never touch the DOM.
2. **Error Handling Strategy:** Services should throw standardized typed errors. Let the caller (usually a custom hook) decide how to handle the error (e.g., retry, show toast, dispatch to store).
3. **Return Type Wrapper:** All API calls must return data wrapped in the `APIResponse<T>` interface defined in `types/index.ts`.
4. **No UI Dependencies:** A service must never import anything from `components/`, `pages/`, `hooks/`, or `stores/`.

```ts
// ✅ DO: Pure service function
import { APIResponse, SheepData } from '@/types';

export async function fetchSheep(farmId: string): Promise<APIResponse<SheepData[]>> {
  const res = await fetch(`/api/farms/${farmId}/sheep`);
  if (!res.ok) throw new Error('Failed to fetch sheep data');
  return res.json();
}
```

## 4. Hook Bridging Patterns (`hooks/`)

Custom hooks are the glue between the UI layer (Components/Pages) and the Data layer (Stores/Services).

1. **Single Responsibility:** A hook should orchestrate exactly one domain feature (e.g., `useSheepHealth`, `useAuth`, `useAIGenerate`).
2. **Standardized Return Shape:** Data fetching hooks must always return an object containing `data`, `isLoading`, and `error`.
   
```ts
// ✅ DO: Standardized hook return
export function useSheep(farmId: string) {
  const [data, setData] = useState<SheepData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // orchestrate service call here
  }, [farmId]);

  return { data, isLoading, error };
}
```

3. **No JSX:** A hook must never return JSX or render UI. It strictly returns data and callbacks.
4. **Memoize Callbacks:** If a hook returns a function (e.g., a mutate or retry function), wrap it in `useCallback` to prevent child component re-renders.

## 5. Hook Dependency Chains

1. **Exhaustive Dependencies:** You MUST include all external variables used inside `useEffect`, `useMemo`, and `useCallback` in their dependency arrays. 
2. **Avoid Object Dependencies:** Do not use objects or arrays as dependencies if they are recreated on every render. Use primitive properties (e.g., `user.id` instead of `user`) or memoize the object.

### DO / DON'T

```
✅ DO: Use URL search params for search queries (?q=test)
❌ DON'T: Use a Zustand store to hold the current search query of a page

✅ DO: Services throw typed errors, hooks catch them and set error state
❌ DON'T: Services catch their own errors and return null

✅ DO: A hook returns { data, isLoading, error }
❌ DON'T: A service directly sets a Zustand loading state

✅ DO: Select specific state: useAuthStore(s => s.user)
❌ DON'T: Subscribe to everything: useAuthStore()
```
