# Task 02.1: AI Service Interfaces & Stubs

## Objective
Create the directory structure for AI services and define the TypeScript classes and interfaces that will act as the contract between Backend and AI lanes.

## Lane & Priority
- **Lane:** Backend
- **Priority:** P0 (Critical for unblocking)
- **Estimate:** S (15 min)

## Recommended Model
Gemini 3.1 Pro High (Planning Mode: OFF)

## Required Reading
- `app/src/types/index.ts`
- `docs/architecture/ARCHITECTURE.md`

## Target Files
- `app/src/services/ai/chatService.ts`
- `app/src/services/ai/visionService.ts`

## Implementation Steps
1. Create `app/src/services/ai/` directory.
2. Create `chatService.ts`:
   - Define a `ChatService` class.
   - Implement a method `generateResponse(message: string, history: ChatMessage[]): Promise<ChatResponse>`.
   - For now, leave the implementation as a `Promise.resolve()` with a slightly more dynamic mock than the route level.
3. Create `visionService.ts`:
   - Define a `VisionService` class.
   - Implement a method `classifyIssue(imageBuffer: Buffer): Promise<ReportCreateResponse>`.
   - Leave as a mock for now.

## Acceptance Criteria
- [ ] Directory `app/src/services/ai/` exists.
- [ ] Both services are exported and correctly typed using `app/src/types/index.ts`.
- [ ] The code compiles without errors.

## Integration Points
- Provides the service layer for Task 02.2.
- Provides the implementation target for the AI Lane.

## Out of Scope
- Real Gemini API calls (AI Lane task).
- Updating server routes (Task 02.2).
