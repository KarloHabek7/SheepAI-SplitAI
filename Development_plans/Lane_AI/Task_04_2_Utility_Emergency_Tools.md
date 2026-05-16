# Task 04.2: Utility & Emergency Tool Schemas

> **Lane:** AI
> **Priority:** P1
> **Estimated Effort:** S
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF

## Objective
Define the function calling schemas for the four "Read" tools that provide real-time city data to users.

## Target Files
- `app/src/lib/ai/toolDeclarations.ts` (Part 2)

## Tools to Define
1. **`check_parking_availability`**: Parameter: `zone`.
2. **`get_bus_eta`**: Parameters: `routeNumber`, `stopName`.
3. **`get_dir_index`**: Parameter: `location` (optional).
4. **`get_emergency_info`**: Parameter: `emergencyType`.

## Implementation Steps
1. **Map Enums:** Use `CityZone` and `EmergencyType` enums.
2. **Descriptions:** Focus on triggering for queries like "Where can I park?" or "When is the next 37 bus?".
3. **Exporting:** Combine all tools from T04.1 and T04.2 into the final `TOOL_DECLARATIONS` array.

## Acceptance Criteria
- [ ] All 4 utility tools are defined.
- [ ] Barrel export in `app/src/lib/ai/index.ts` is updated.
