# Task 7.1: Read-Only Mock Tools (Parking, Bus, Crowd, Emergency)

> **Lane:** Backend
> **Priority:** P1-High
> **Estimated Effort:** S (15-25min)
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF
> **Can Parallelize With:** Task 7.2
> **Depends On:** None (self-contained mock data)

## Objective

Create 4 read-only tool functions that the AI orchestration layer invokes via Gemini function calling. Each tool receives args, validates them, looks up mock data, and returns a structured result object.

## Required Reading

- `app/src/types/index.ts` — Lines 289–334 (`ParkingInfo`, `TransitInfo`, `TransitBusArrival`, `CrowdInfo`, `AlternateRoute`)
- `app/src/types/index.ts` — Lines 267–283 (`EmergencyInfo`, `EmergencyContact`, `EmergencyType`, `SupportedLanguage`)
- `app/src/server/routes/parking.ts` — Reference data patterns (zones, prices)
- `app/src/server/routes/transit.ts` — Reference bus line data
- `app/src/server/routes/crowd.ts` — Reference crowd area data
- `app/src/server/routes/emergency.ts` — Reference emergency instruction data

## Target Files

- `app/src/server/tools/checkParking.ts` — **CREATE**
- `app/src/server/tools/getBusEta.ts` — **CREATE**
- `app/src/server/tools/getDirIndex.ts` — **CREATE**
- `app/src/server/tools/getEmergencyInfo.ts` — **CREATE**

## Implementation Steps

### 1. `checkParking.ts` — `check_parking_availability`

```typescript
// Signature
export async function checkParking(args: Record<string, unknown>): Promise<Record<string, unknown>>

// Args: { zone: string, vehicleType?: string }
// 1. Validate `zone` is present, return error if missing
// 2. Look up zone in local parkingData map (copy from parking.ts patterns)
// 3. Return { available, zone, totalSpots, freeSpots, pricePerHour, currency, nearestGarage }
// 4. If zone not found, return { error: "Unknown parking zone: ..." }
```

### 2. `getBusEta.ts` — `get_bus_eta`

```typescript
// Signature
export async function getBusEta(args: Record<string, unknown>): Promise<Record<string, unknown>>

// Args: { lineNumber: string, stopName?: string }
// 1. Validate `lineNumber` is present
// 2. Look up in local mock schedule (mirror transit.ts patterns)
// 3. Generate mock ETA (2-15 min range), next 3 buses with destinations
// 4. Return { lineNumber, stopName, eta, nextBuses: [...], alerts }
// 5. If line not found, return { error: "Bus line not found: ..." }
```

### 3. `getDirIndex.ts` — `get_dir_index`

```typescript
// Signature
export async function getDirIndex(args: Record<string, unknown>): Promise<Record<string, unknown>>

// Args: { area: string }
// 1. Validate `area` is present
// 2. Look up in local crowd data (mirror crowd.ts area data for Diocletian's Palace, Riva, Bačvice, etc.)
// 3. Return { area, crowdLevel, crowdPercentage, suggestion, alternateRoutes }
// 4. If area not found, return { error: "Unknown area: ..." }
```

### 4. `getEmergencyInfo.ts` — `get_emergency_info`

```typescript
// Signature
export async function getEmergencyInfo(args: Record<string, unknown>): Promise<Record<string, unknown>>

// Args: { alertType: string, language?: string }
// 1. Validate `alertType` is present
// 2. Default language to 'en' if not provided
// 3. Look up emergency data (mirror emergency.ts instruction patterns)
// 4. Return { alertType, title, instructions, safetyTips, contacts, language }
// 5. If alertType not found, return { error: "Unknown emergency type: ..." }
```

## Acceptance Criteria

- [ ] All 4 files exist in `app/src/server/tools/`
- [ ] Each function validates required args and returns descriptive errors
- [ ] `checkParking({zone: "zona_a"})` returns ParkingInfo-shaped data
- [ ] `getBusEta({lineNumber: "2"})` returns TransitInfo-shaped data
- [ ] `getDirIndex({area: "riva"})` returns CrowdInfo-shaped data
- [ ] `getEmergencyInfo({alertType: "bura_wind"})` returns EmergencyInfo-shaped data
- [ ] No Express/Router imports — these are plain async functions
- [ ] Each function has JSDoc with `@param` and `@returns`

## Out of Scope (CRITICAL)

- Do NOT create Express routes or HTTP endpoints
- Do NOT import or modify any files in `routes/`
- Do NOT create the barrel export or toolRouter (that's Task 7.3)
- Do NOT create Gemini function-call schemas (AI Lane)
