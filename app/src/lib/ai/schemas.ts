import { z } from 'zod';

/**
 * Zod schema for validating civic issue classification from Vision AI.
 * This ensures the AI output matches our internal types and Gradsko Oko requirements.
 */
export const civicReportSchema = z.object({
  category: z.enum(['Bulk Waste', 'Infrastructure', 'Green Areas', 'Graffiti', 'Other'])
    .describe('The type of civic issue detected.'),
  severity: z.enum(['Low', 'Medium', 'High', 'Critical'])
    .describe('The urgency of the issue.'),
  zone: z.enum([
    'Gripe', 'Spinut', 'Varoš', 'Meje', 'Trstenik', 'Pujanke', 
    'Sućidar', 'Split 3', 'Bačvice', 'Mejaši', 'Žnjan', 'Bol', 'Grad', 'Other'
  ]).describe('The city district/zone where the issue is located.'),
  department: z.enum([
    'Komunalno redarstvo', 'Prometno redarstvo', 'Čistoća', 
    'Parkovi i nasadi', 'Vodovod i kanalizacija', 'Other'
  ]).describe('The municipal department responsible for this issue.'),
  description: z.string()
    .describe('A concise, professional description of the issue in Croatian, suitable for an official report.'),
  confidence: z.number().min(0).max(1)
    .describe('AI confidence score for the classification (0.0 to 1.0).')
});

/**
 * JSON Schema representation for Gemini SDK's responseSchema parameter.
 * This enforces structured output directly from the LLM.
 */
export const CIVIC_REPORT_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    category: {
      type: "string",
      enum: ['Bulk Waste', 'Infrastructure', 'Green Areas', 'Graffiti', 'Other'],
      description: "The type of civic issue detected."
    },
    severity: {
      type: "string",
      enum: ['Low', 'Medium', 'High', 'Critical'],
      description: "The urgency of the issue."
    },
    zone: {
      type: "string",
      enum: [
        'Gripe', 'Spinut', 'Varoš', 'Meje', 'Trstenik', 'Pujanke', 
        'Sućidar', 'Split 3', 'Bačvice', 'Mejaši', 'Žnjan', 'Bol', 'Grad', 'Other'
      ],
      description: "The city district/zone where the issue is located."
    },
    department: {
      type: "string",
      enum: [
        'Komunalno redarstvo', 'Prometno redarstvo', 'Čistoća', 
        'Parkovi i nasadi', 'Vodovod i kanalizacija', 'Other'
      ],
      description: "The municipal department responsible for this issue."
    },
    description: {
      type: "string",
      description: "A concise, professional description of the issue in Croatian."
    },
    confidence: {
      type: "number",
      description: "AI confidence score (0.0 - 1.0)."
    }
  },
  required: ["category", "severity", "zone", "department", "description", "confidence"]
};

/**
 * Zod schema for individual Pazar market items.
 */
export const pazarItemSchema = z.object({
  name: z.string().describe('Name of the product or item (e.g., "Omiške trešnje").'),
  price: z.string().describe('Price with unit (e.g., "4 EUR/kg").'),
  category: z.string().describe('Category of the product (e.g., "Voće", "Povrće", "Riba").')
});

/**
 * Zod schema for a full Pazar market listing extracted from a photo.
 */
export const pazarListingSchema = z.object({
  items: z.array(pazarItemSchema).describe('List of products detected in the stall.'),
  freshness: z.enum(['morning', 'midday', 'afternoon'])
    .describe('The estimated freshness of the market based on visual cues and lighting.')
});

/**
 * JSON Schema for Gemini structured output for Pazar listings.
 */
export const PAZAR_LISTING_RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string", description: "Name of the item." },
          price: { type: "string", description: "Price and unit." },
          category: { type: "string", description: "Product category." }
        },
        required: ["name", "price", "category"]
      }
    },
    freshness: {
      type: "string",
      enum: ["morning", "midday", "afternoon"],
      description: "Market freshness level."
    }
  },
  required: ["items", "freshness"]
};
