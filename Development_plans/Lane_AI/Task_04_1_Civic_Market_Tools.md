# Task 04.1: Civic & Market Tool Schemas

> **Lane:** AI
> **Priority:** P1
> **Estimated Effort:** S
> **Recommended Model:** Gemini 3.0 Flash
> **Planning Mode:** OFF

## Objective
Define the function calling schemas for the two "Write" tools that allow users to submit information to the city.

## Target Files
- `app/src/lib/ai/toolDeclarations.ts` (Part 1)

## Tools to Define
1. **`submit_gradsko_oko_report`**: Parameters: `category`, `description`, `location`, `zone`, `severity`.
2. **`submit_pazar_listing`**: Parameters: `itemName`, `category`, `price`, `vendorName`.

## Implementation Steps
1. **Map Enums:** Ensure `IssueCategory` and `CityZone` are mapped to the JSON Schema `enum` field.
2. **Descriptions:** Write precise descriptions that tell Gemini to use these tools when a user describes a problem or a market deal.
3. **Requirement Logic:** Mark `category` and `description` as required for reports.

## Acceptance Criteria
- [ ] Schemas match the `app/src/types/index.ts` data models.
- [ ] Tool descriptions are effective for routing.
