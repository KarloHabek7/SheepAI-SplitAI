import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI: GoogleGenerativeAI | null = null;

export const GEMINI_MODELS = {
  text: 'gemini-1.5-pro-002',
  vision: 'gemini-1.5-pro-002',
  cache: 'models/gemini-1.5-pro-002',
};

/**
 * Singleton getter for the Google Generative AI client.
 * Uses VITE_GEMINI_API_KEY from environment variables.
 */
export function getGeminiClient(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('VITE_GEMINI_API_KEY is not defined in environment variables');
    }
    
    genAI = new GoogleGenerativeAI(apiKey);
  }
  
  return genAI;
}
