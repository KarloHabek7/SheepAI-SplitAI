# Task 7.3: Tool Router + Barrel Export

> **Lane:** Backend
> **Priority:** P1-High
> **Estimated Effort:** S (10-15min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Depends On:** Task 7.1 (read-only tools), Task 7.2 (write tools)

## Objective

Create the `toolRouter.ts` dispatcher that maps tool names to handlers, and the `index.ts` barrel export. This is the single entry point the AI Lane uses to execute any tool.

## Required Reading

- `Development_plans/Lane_Backend/Task_07_Mock_Tools.md` — Tool name table (lines 23–30)
- `app/src/server/tools/checkParking.ts` — (created by Task 7.1)
- `app/src/server/tools/getBusEta.ts` — (created by Task 7.1)
- `app/src/server/tools/getDirIndex.ts` — (created by Task 7.1)
- `app/src/server/tools/getEmergencyInfo.ts` — (created by Task 7.1)
- `app/src/server/tools/submitReport.ts` — (created by Task 7.2)
- `app/src/server/tools/submitPazarListing.ts` — (created by Task 7.2)

## Target Files

- `app/src/server/tools/toolRouter.ts` — **CREATE**
- `app/src/server/tools/index.ts` — **CREATE**

## Implementation Steps

### 1. `toolRouter.ts`

```typescript
import { checkParking } from './checkParking.js';
import { getBusEta } from './getBusEta.js';
import { getDirIndex } from './getDirIndex.js';
import { getEmergencyInfo } from './getEmergencyInfo.js';
import { submitReport } from './submitReport.js';
import { submitPazarListing } from './submitPazarListing.js';

type ToolHandler = (args: Record<string, unknown>) => Promise<Record<string, unknown>>;

/**
 * Registry mapping Gemini function-call tool names to their handler functions.
 */
export const TOOL_REGISTRY: Record<string, ToolHandler> = {
  'check_parking_availability': checkParking,
  'get_bus_eta': getBusEta,
  'get_dir_index': getDirIndex,
  'get_emergency_info': getEmergencyInfo,
  'submit_gradsko_oko_report': submitReport,
  'submit_pazar_listing': submitPazarListing,
};

/**
 * Execute a tool by name with the given arguments.
 * Returns the tool result or an error object if the tool is unknown.
 */
export async function executeTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const handler = TOOL_REGISTRY[toolName];
  if (!handler) {
    return { error: `Unknown tool: '${toolName}'. Available tools: ${Object.keys(TOOL_REGISTRY).join(', ')}` };
  }
  return handler(args);
}
```

### 2. `index.ts` (barrel export)

```typescript
export { TOOL_REGISTRY, executeTool } from './toolRouter.js';
export { checkParking } from './checkParking.js';
export { getBusEta } from './getBusEta.js';
export { getDirIndex } from './getDirIndex.js';
export { getEmergencyInfo } from './getEmergencyInfo.js';
export { submitReport } from './submitReport.js';
export { submitPazarListing } from './submitPazarListing.js';
```

### 3. Build Verification

Run `npm run build` and confirm zero errors.

## Acceptance Criteria

- [ ] `toolRouter.ts` exports `TOOL_REGISTRY` (6 entries) and `executeTool()`
- [ ] `executeTool("check_parking_availability", {zone: "zona_a"})` resolves with parking data
- [ ] `executeTool("unknown_tool", {})` returns `{ error: "Unknown tool: ..." }`
- [ ] `index.ts` barrel re-exports all tools + router
- [ ] `npm run build` passes with zero errors
- [ ] `TOOL_REGISTRY` keys exactly match the architecture tool names:
  - `submit_gradsko_oko_report`
  - `check_parking_availability`
  - `get_bus_eta`
  - `get_dir_index`
  - `submit_pazar_listing`
  - `get_emergency_info`

## Out of Scope (CRITICAL)

- Do NOT implement the tool functions themselves (already done in 7.1 + 7.2)
- Do NOT modify `server/index.ts` — the tool router is NOT an HTTP endpoint
- Do NOT create Gemini function-call schemas (AI Lane)

## Handoff

- Push branch: `lane/backend/mock-tools`
- Notify AI Lane: tools are ready for integration at `app/src/server/tools`
- AI Lane will import `executeTool` from `@/server/tools` to wire into Gemini function calling
