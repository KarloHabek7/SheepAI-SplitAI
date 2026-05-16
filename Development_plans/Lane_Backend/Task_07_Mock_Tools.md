# Task 07: Mock Tool Implementations — All 6 Function-Call Tools

> **Lane:** Backend
> **Priority:** P1-High
> **Estimated Effort:** M (30-60min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Task_08
> **Depends On:** Task_01 (BFF Scaffold), Task_06 (Utility Routes)

## Objective

Create the 6 mock tool functions that Gemini's function calling will invoke. These are server-side functions (NOT HTTP endpoints) that the AI orchestration layer calls when Gemini returns a `functionCall` response. Each tool performs a mock action and returns structured data that Gemini then formats into a user-facing response.

## Context Snapshot

**Read these files before starting:**
- `app/src/types/index.ts` — `ParkingInfo`, `TransitInfo`, `CrowdInfo`, `EmergencyInfo`, `CivicReport`, `PazarListing` (various sections)
- `docs/architecture/ARCHITECTURE.md` — Section 3.4 (Tool Layer), tool name/input/output table

**Tool declarations from architecture:**

| Tool Name | Input | Output |
|---|---|---|
| `submit_gradsko_oko_report` | `{category, severity, location, description, imageUrl}` | `{ticketId, status, eta}` |
| `check_parking_availability` | `{zone, vehicleType}` | `{available, zones[], price, nearestGarage}` |
| `get_bus_eta` | `{lineNumber, stopName}` | `{eta, nextBuses[], alerts}` |
| `get_dir_index` | `{area}` | `{crowdLevel, suggestion, alternateRoute}` |
| `submit_pazar_listing` | `{vendor, items[], prices[], imageUrl}` | `{listingId, expiresAt}` |
| `get_emergency_info` | `{alertType, language}` | `{instructions, safetyTips, contacts}` |

## Interface Contract

**This task PRODUCES:**
- `app/src/server/tools/index.ts` — barrel export for all tools
- `app/src/server/tools/submitReport.ts` — `submit_gradsko_oko_report`
- `app/src/server/tools/checkParking.ts` — `check_parking_availability`
- `app/src/server/tools/getBusEta.ts` — `get_bus_eta`
- `app/src/server/tools/getDirIndex.ts` — `get_dir_index`
- `app/src/server/tools/submitPazarListing.ts` — `submit_pazar_listing`
- `app/src/server/tools/getEmergencyInfo.ts` — `get_emergency_info`
- `app/src/server/tools/toolRouter.ts` — function that maps tool name → tool handler

**This task CONSUMES:**
- In-memory store (for storing reports/listings)
- Utility route data patterns (for consistent responses)

## Implementation Steps

1. Create each tool as an async function: `(args: Record<string, unknown>) => Promise<Record<string, unknown>>`
2. Create `toolRouter.ts` that accepts `{toolName: string, args: Record<string, unknown>}` and routes to the correct handler
3. `submit_gradsko_oko_report`: create report in store, generate ticket ID, return confirmation
4. `check_parking_availability`: return zone-specific parking data for Split
5. `get_bus_eta`: return mock bus arrivals for Split's Promet lines
6. `get_dir_index`: return crowd data for Diocletian's Palace, Riva, Bačvice areas
7. `submit_pazar_listing`: create listing in store with 4h expiry
8. `get_emergency_info`: return multilingual emergency instructions
9. Export a `TOOL_REGISTRY` map and the `executeTool` router function

## Acceptance Criteria

- [ ] All 6 tools are implemented as individual files
- [ ] `executeTool("check_parking_availability", {zone: "zona_a"})` returns valid `ParkingInfo`-like data
- [ ] `executeTool("submit_gradsko_oko_report", {...})` stores a report and returns a ticket ID
- [ ] `toolRouter.ts` correctly dispatches any tool name to its handler
- [ ] Unknown tool names return an error object
- [ ] All tools return typed `Record<string, unknown>` objects
- [ ] `npm run build` passes

## Out of Scope (CRITICAL)

- Do NOT create Gemini function calling declarations/schemas (that's AI Lane Task 3.4)
- Do NOT modify the AI service layer
- Do NOT call external APIs

## Handoff

- Push to: `lane/backend/mock-tools`
- Notify: AI Lane (they will wire these tools into Gemini function calling at integration)
- Next task enabled: AI Lane can now integrate real tool execution

---
## Ready-to-Execute
> `/execute Development_plans/Lane_Backend/Task_07_Mock_Tools.md`
