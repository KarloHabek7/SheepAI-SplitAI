---
trigger: always_on
title: "Workflow Routing"
---

# Workflow Routing & Selection Rule

> Instructions for the agent to autonomously infer and execute the most appropriate workflow when a specific slash command is not provided by the user.

1. **Analyze the Request Intent:** If the user provides a natural language request without explicitly invoking a workflow (e.g., `/execute`, `/plan`, `/delegate`), you must first analyze the intent of the request before proceeding.

2. **Map to Available Workflows:** Determine if the request aligns with any of the established workflows in `.agents/workflows/`. Use this routing table:

   ### Lead-Only Workflows (Phase-Based)
   | User Says | Workflow | Description |
   |---|---|---|
   | "Plan the research...", "What do we need to investigate?", "Break down the research..." | `/research-plan` | Phase 0a: Research & ideation task planning |
   | "Run this research task...", "Execute research...", "Start this ideation sprint..." | `/research-execute` | Phase 0b: Execute a single research/ideation task |
   | "Let's consolidate...", "Evaluate the ideas...", "Make the decision...", "What should we build?" | `/ideate` | Phase 0c: Consolidate research & decide |
   | "Design the architecture...", "Define the types...", "System design..." | `/architect` | Phase 1: Architecture & contracts |
   | "Break this into tasks for the team...", "Create tasks for each lane..." | `/delegate` | Phase 2: Cross-lane task packages |
   | "I need to implement this in [other lane]...", "Fix the frontend myself..." | `/implement-any` | Cross-lane implementation |
   | "Time for checkpoint...", "Let's merge...", "Integration time..." | `/integrate` | Checkpoint merge protocol |
   | "Evaluate refinements...", "Review agent suggestions...", "Triage improvements...", "What did agents suggest?" | `/refine` | Vision refinement triage |
   | "Set up the branding site...", "Clone the Aura template...", "Build the landing page from Aura..." | `/brand-site` | Build and deploy the Aura-based branding website |
   | "Extract the design system...", "Generate DESIGN.md from the brand site...", "Create tokens..." | `/design-extract` | Extract design tokens from the branding site |
   | "Generate the app UI in Stitch...", "Use Stitch with our branding...", "Create the app layout..." | `/stitch-generate` | Generate app UI via Google Stitch with branding reference |

   ### In-Lane Workflows (Any Team Member)
   | User Says | Workflow | Description |
   |---|---|---|
   | "Break down this feature...", "Plan this task...", "How should I structure..." | `/plan` | In-lane task breakdown |
   | "I need to do a quick-fix...", "General purpose edit...", "Emergency patch..." | `/flex` | Multi-lane quick-fix |
   | "Start working on...", "Implement...", "Execute task..." | `/execute` | Task implementation |
   | "Review this PR...", "Check this code..." | `/review` | Code review |
   | "Write tests for...", "Test this..." | `/test` | Testing |
   | "Clean up this component...", "Refactor..." | `/refactor` | Code cleanup |
   | "Fix the bug in...", "Debug..." | `/fix` | Bug fixing |
   | "Create a new project setup..." | `/scaffold` | New project |
   | "Write documentation for..." | `/document` | Documentation |
   | "Guide me through [external tool]...", "How do I use Stitch/NanoBanana..." | `/counsel` | External tool guidance |
   | "Add this Aura component...", "Convert this Aura section...", "Replace this section with Aura..." | `/aura-component` | Cherry-pick an Aura.build component into the app |

3. **Silent Invocation:** If a strong match is found, internally invoke the corresponding workflow. Follow the steps defined in that workflow's `.md` file exactly as if the user had explicitly typed the slash command.

4. **Announce the Selected Workflow:** In your first response to the user, briefly declare which workflow you have autonomously selected and why. This ensures transparency.
   - *Example:* "Since you want to break this feature into tasks for the team, I am applying the `/delegate` workflow."

5. **Fall Back to General Behavior:** If the request is a simple question, a minor change, or does not fit any existing workflow, fall back to the standard `agent-behavior.md` rules and fulfill the request directly without forcing a workflow.
