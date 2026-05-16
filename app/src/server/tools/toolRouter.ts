import { checkParking } from './checkParking.js';
import { getBusEta } from './getBusEta.js';
import { getDirIndex } from './getDirIndex.js';
import { getEmergencyInfo } from './getEmergencyInfo.js';
import { submitReport } from './submitReport.js';
import { submitPazarListing } from './submitPazarListing.js';

type ToolHandler = (args: Record<string, unknown>) => Promise<Record<string, unknown>>;

/**
 * Registry mapping Gemini function-call tool names to their handler functions.
 * These names MUST match the tool names defined in the AI Lane's function calling schemas.
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
 * 
 * @param toolName - The name of the tool to execute
 * @param args - The arguments for the tool
 * @returns Promise<Record<string, unknown>>
 */
export async function executeTool(
  toolName: string,
  args: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const handler = TOOL_REGISTRY[toolName];
  if (!handler) {
    const availableTools = Object.keys(TOOL_REGISTRY).join(', ');
    return { 
      error: `Unknown tool: '${toolName}'. Available tools in Split municipal system: ${availableTools}` 
    };
  }

  try {
    console.log(`🛠️ Executing tool: ${toolName}`, args);
    const result = await handler(args);
    return result;
  } catch (error: any) {
    console.error(`❌ Tool execution failed: ${toolName}`, error);
    return { error: `Internal error executing tool '${toolName}': ${error.message}` };
  }
}
