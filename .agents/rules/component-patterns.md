---
trigger: model_decision
title: "Component Patterns"
description: "Use when creating or refactoring React components to ensure proper hierarchy and patterns."
---

# Component Patterns Rules

> Granularity, composition, and structural quality rules for all React components. These rules enforce a consistent, maintainable component architecture.

## 1. Component Hierarchy (Atomic Design)

All components MUST be categorized into one of three tiers:

| Tier | Directory | Max Size | Description | Examples |
|---|---|---|---|---|
| **Atoms** (UI primitives) | `components/ui/` | 80 lines | Single-purpose, zero business logic. Styled via `tokens.css`. Fully reusable across features. | `Button`, `Input`, `Badge`, `Spinner`, `Avatar`, `Tooltip`, `Icon` |
| **Molecules** (feature composites) | `components/<feature>/` | 150 lines | Combines 2+ atoms into a meaningful unit. May accept domain-typed props. Feature-scoped. | `MetricCard`, `ChatBubble`, `SheepRow`, `AlertBanner`, `FormField` |
| **Organisms** (page sections) | `components/<feature>/` or `components/layout/` | 200 lines | Full page sections composed of molecules. May use hooks for data. Minimal direct styling. | `DashboardGrid`, `ChatPanel`, `SheepHealthTable`, `Sidebar`, `Header` |

**Pages** (`pages/`) are NOT components in this hierarchy. They are route entry points that compose organisms.

## 2. Splitting Rules — When to Break Up a Component

You MUST split a component into smaller sub-components when ANY of these conditions is true:

1. **File exceeds its tier's line limit** (80 / 150 / 200 lines).
2. **The component renders a repeated pattern** — extract the repeated unit into its own component and use `.map()`.
3. **The component has more than 3 conditional render branches** (`if`/ternary for different states) — extract each branch into a named sub-component.
4. **The component manages more than 2 pieces of local state** — extract related state + UI into a sub-component or move state into a custom hook.
5. **The component can be reused on another page** — extract it immediately; do not wait until the second use.

## 3. Component File Structure (Mandatory Order)

Every `.tsx` component file must follow this internal order:

```tsx
// 1. Imports (external → internal → types → styles)
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui';
import type { SheepData } from '@/types';
import './sheep-card.css';

// 2. Props interface (immediately above the component)
interface SheepCardProps {
  /** The sheep data to display */
  sheep: SheepData;
  /** Called when the user clicks the detail button */
  onViewDetail: (id: string) => void;
}

// 3. Component function (named export, explicit return type)
/**
 * Displays a summary card for a single sheep with health indicators.
 */
export function SheepCard({ sheep, onViewDetail }: SheepCardProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="sheep-card">
      <h3>{sheep.name}</h3>
      <Button onClick={() => onViewDetail(sheep.id)}>
        {t('sheep.viewDetail')}
      </Button>
    </div>
  );
}
```

**Forbidden patterns:**
- Defining helper components in the SAME file below the main export (extract to separate file)
- Declaring props inline: `({ name }: { name: string })` — always use a named interface
- Arrow function components: `const Card = () => { }` — use function declarations

## 4. Props Design Rules

1. **Max 7 props per component.** If a component needs more than 7 props, you are likely violating single-responsibility. Split the component or group related props into an object.

2. **Use domain types for data props.** Never pass raw primitives when a typed object exists:
   ```tsx
   // ✅ DO
   interface SheepCardProps { sheep: SheepData; }

   // ❌ DON'T
   interface SheepCardProps { name: string; age: number; breed: string; healthScore: number; }
   ```

3. **Callbacks follow `on<Event>` naming.** All callback props must start with `on`:
   ```tsx
   // ✅ DO: onSelect, onClick, onDismiss, onSubmit
   // ❌ DON'T: handleSelect (that's the internal handler name, not the prop name)
   ```

4. **Internal handlers use `handle<Event>` naming:**
   ```tsx
   function SheepCard({ onSelect }: SheepCardProps): React.JSX.Element {
     const handleClick = () => {
       // local logic
       onSelect(sheep.id);
     };
     return <button onClick={handleClick}>...</button>;
   }
   ```

5. **Children prop for composition.** Prefer `children` for flexible slot-based composition over deeply nested prop drilling:
   ```tsx
   // ✅ DO
   <Card>
     <CardHeader>Title</CardHeader>
     <CardBody>Content</CardBody>
   </Card>

   // ❌ DON'T
   <Card title="Title" body="Content" footer={<Button />} />
   ```

## 5. Style Co-location

- **Atom styles** → May live in `styles/` if truly global, or co-located as `components/ui/button.css`.
- **Molecule/Organism styles** → MUST be co-located next to the component file:
  ```
  components/dashboard/
  ├── MetricCard.tsx
  ├── metric-card.css        ← co-located styles
  ├── DashboardGrid.tsx
  └── dashboard-grid.css
  ```
- **CSS file naming** → `kebab-case.css`, matching the component name in lowercase.
- **CSS class naming** → Use BEM-lite: `.sheep-card`, `.sheep-card__header`, `.sheep-card--highlighted`.
- **All colors, fonts, spacing** → Must reference CSS custom properties from `tokens.css`. Never hardcode visual values.

## 6. Composition Over Configuration

Prefer composing small components together rather than building one mega-component with many config props:

```tsx
// ✅ DO — Composition
<PageContainer>
  <Header />
  <main>
    <DashboardGrid>
      <MetricCard icon={<HeartIcon />} label={t('health.score')} value={92} />
      <MetricCard icon={<MapIcon />} label={t('location.active')} value={15} />
    </DashboardGrid>
  </main>
  <Footer />
</PageContainer>

// ❌ DON'T — Mega-component
<DashboardPage
  showHeader={true}
  showFooter={true}
  metrics={[
    { icon: 'heart', label: 'Health Score', value: 92 },
    { icon: 'map', label: 'Active Locations', value: 15 },
  ]}
  gridColumns={2}
/>
```

## 7. Error & Loading State Patterns

Every component that displays async data MUST handle three states:

1. **Loading** → Show a skeleton or `<Spinner />`, never an empty div.
2. **Error** → Show an inline error message with a retry action. Use `<ErrorBoundary>` for unrecoverable errors.
3. **Empty** → Show an empty-state illustration or message, never a blank area.

```tsx
// ✅ DO
export function SheepList({ sheep, isLoading, error }: SheepListProps): React.JSX.Element {
  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;
  if (sheep.length === 0) return <EmptyState message={t('sheep.noSheep')} />;

  return <ul>{sheep.map(s => <SheepRow key={s.id} sheep={s} />)}</ul>;
}
```

## 8. Accessibility Minimum

- All interactive elements (`<button>`, `<a>`, `<input>`) MUST have accessible labels (visible text, `aria-label`, or `aria-labelledby`).
- Icon-only buttons MUST have `aria-label`.
- Form inputs MUST have associated `<label>` elements.
- Color contrast MUST meet WCAG AA (4.5:1 for normal text, 3:1 for large text).
- Focus states MUST be visible — never remove `outline` without a replacement.

### DO / DON'T

```
✅ DO: Create components/ui/Button.tsx (< 80 lines), then use it inside components/dashboard/MetricCard.tsx
❌ DON'T: Create a 300-line DashboardPage.tsx that inlines everything

✅ DO: Split a component when it exceeds its line limit or has > 3 conditional branches
❌ DON'T: Leave a 250-line component intact because "it works"

✅ DO: interface MetricCardProps { metric: Metric; onDismiss: () => void; }
❌ DON'T: ({ title, value, icon, color, size, onClick, onHover, ...rest }: any)

✅ DO: Co-locate metric-card.css next to MetricCard.tsx
❌ DON'T: Put all component CSS in one giant styles/components.css file

✅ DO: <Button aria-label={t('common.close')}><XIcon /></Button>
❌ DON'T: <button><XIcon /></button> (no accessible label)
```

## 9. Aura Component Conversion

When importing components from Aura.build's library into the app, follow this protocol:

1. **Read the Aura integration rules** at `.agents/rules/aura-integration.md` — it contains the full Tailwind → token mapping table.
2. **Convert HTML → JSX** — `class` → `className`, self-closing tags, camelCase attributes.
3. **Convert Tailwind → co-located CSS** — create a `.css` file next to the component. Map every Tailwind utility class to a CSS rule using `var(--token)` from `tokens.css`. Use BEM-lite class naming.
4. **Split by tier** — if the Aura section has multiple distinct visual blocks, split into atoms/molecules/organisms per the tier limits above.
5. **Text → i18n** — replace all hardcoded text with `t('key')` calls.
6. **Assets** — keep Aura CDN URLs for development speed; note them for production optimization (download → WebP → `app/public/assets/images/`).

```tsx
// ✅ DO — Converted from Aura
// feature-card.css uses var(--color-bg-card), var(--radius-md), etc.
import './feature-card.css';

export function FeatureCard({ title, description, icon }: FeatureCardProps): React.JSX.Element {
  const { t } = useTranslation();
  return (
    <div className="feature-card">
      <div className="feature-card__icon">{icon}</div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__description">{description}</p>
    </div>
  );
}

// ❌ DON'T — Raw Aura paste with Tailwind classes
export function FeatureCard() {
  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <h3 className="text-white text-xl font-semibold">Feature</h3>
    </div>
  );
}
```
