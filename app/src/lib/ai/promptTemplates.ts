import { SupportedLanguage } from '../../types';

// ============================================================================
// 1. Vision Prompts
// ============================================================================

export const CIVIC_REPORT_VISION_PROMPT = `
You are an expert municipal analyst for the City of Split (Grad Split).
Analyze the provided image of a civic issue and extract structured data.

CLASSIFICATION RULES:
1. "category": Must be exactly one of: 'pothole', 'graffiti', 'illegal_parking', 'noise_complaint', 'waste_overflow', 'damaged_infrastructure', 'illegal_construction', 'vandalism', 'abandoned_vehicle', 'public_safety', 'other'.
2. "severity": Estimate on a scale of 1-10:
   - 1-3: Minor aesthetic issue, no immediate danger (e.g., small graffiti, minor litter).
   - 4-6: Moderate issue, requires scheduled maintenance (e.g., pothole on local road, overflowing bin).
   - 7-8: Significant issue, potential hazard (e.g., broken street light, damaged playground equipment).
   - 9-10: Critical emergency, immediate danger to public safety or major infrastructure failure.
3. "zone": Based on visual context (architecture, landmarks, paving types like stone pavements), estimate the zone: 'zona_a', 'zona_b', 'zona_c', 'zona_d', 'unesco_core', 'unesco_buffer', 'marjan_park', 'port_area'.

Return ONLY valid JSON matching the required schema. Do not include markdown code blocks like \`\`\`json.
`;

export const PAZAR_MARKET_VISION_PROMPT = `
You are an expert market analyst for the Split Pazar.
Analyze the provided image of a market vendor's produce stall and extract structured data.

CLASSIFICATION RULES:
1. Identify all visible produce items.
2. For each item, determine "category" from exactly one of: 'fish', 'fruit', 'vegetable', 'olive_oil', 'cheese', 'meat', 'herbs', 'other'.
3. Extract "price" from visible tags (numeric value only). Also estimate "unit" (e.g., "€/kg", "€/bunch").
4. "freshness": Estimate the overall freshness of the stall as 'morning' (very fresh, full stock), 'midday' (moderate stock), or 'afternoon' (depleted stock, less fresh).

Return ONLY valid JSON matching the required schema. Do not include markdown code blocks like \`\`\`json.
`;

// ============================================================================
// 2. Dynamic Prompt Builder
// ============================================================================

export interface PromptContext {
  baseIdentity: string;
  visionContext?: 'civic' | 'pazar';
  ragContext?: string;
  language?: SupportedLanguage;
}

/**
 * Builds a dynamic system prompt combining base identity with vision rules and RAG context.
 */
export function buildSystemPrompt(context: PromptContext): string {
  let prompt = context.baseIdentity + '\n\n';

  if (context.language) {
    prompt += `Please respond in the following language code: ${context.language}\n\n`;
  }

  if (context.visionContext === 'civic') {
    prompt += `=== VISION ANALYSIS MODE: CIVIC ISSUE ===\n${CIVIC_REPORT_VISION_PROMPT}\n\n`;
  } else if (context.visionContext === 'pazar') {
    prompt += `=== VISION ANALYSIS MODE: PAZAR MARKET ===\n${PAZAR_MARKET_VISION_PROMPT}\n\n`;
  }

  if (context.ragContext) {
    prompt += `=== RETRIEVED KNOWLEDGE BASE ===\n`;
    prompt += `Use the following official documents to answer the user's query. Always cite your sources.\n`;
    prompt += `${context.ragContext}\n\n`;
  }

  return prompt.trim();
}
