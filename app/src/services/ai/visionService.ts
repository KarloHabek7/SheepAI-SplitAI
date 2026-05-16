import { z } from 'zod';
import { VisionCivicReport, ReportCreateResponse } from '../../types';
import { getGeminiClient, GEMINI_MODELS } from '../../lib/ai/geminiClient';
import { CIVIC_REPORT_VISION_PROMPT, PAZAR_MARKET_VISION_PROMPT } from '../../lib/ai/promptTemplates';
import { 
  civicReportSchema, 
  CIVIC_REPORT_RESPONSE_SCHEMA, 
  pazarListingSchema, 
  PAZAR_LISTING_RESPONSE_SCHEMA 
} from '../../lib/ai/schemas';

export type PazarListingResult = z.infer<typeof pazarListingSchema>;

export class VisionService {
  private extractBase64(imageBase64: string): { mimeType: string, data: string } {
    const match = imageBase64.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (match) {
      return { mimeType: match[1], data: match[2] };
    }
    return { mimeType: 'image/jpeg', data: imageBase64 };
  }

  /**
   * Analyzes a Pazar market listing using Vision AI.
   */
  async analyzePazarListing(imageBase64: string): Promise<PazarListingResult> {
    try {
      const { mimeType, data } = this.extractBase64(imageBase64);
      const client = getGeminiClient();
      const model = client.getGenerativeModel({
        model: GEMINI_MODELS.vision,
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: PAZAR_LISTING_RESPONSE_SCHEMA as any,
          temperature: 0.2,
        }
      });

      const result = await model.generateContent([
        PAZAR_MARKET_VISION_PROMPT,
        {
          inlineData: {
            data,
            mimeType,
          }
        }
      ]);

      const text = result.response.text();
      const parsed = JSON.parse(text);
      
      return pazarListingSchema.parse(parsed);

    } catch (error) {
      console.error('[VisionService] Failed to analyze Pazar listing image:', error);
      return {
        items: [],
        freshness: 'afternoon'
      };
    }
  }

  /**
   * Classifies a reported issue using Vision AI.
   * Uses Gemini to analyze the image.
   */
  async analyzeCivicReport(imageBase64: string): Promise<VisionCivicReport> {
    try {
      const { mimeType, data } = this.extractBase64(imageBase64);
      const client = getGeminiClient();
      const model = client.getGenerativeModel({
        model: GEMINI_MODELS.vision,
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: CIVIC_REPORT_RESPONSE_SCHEMA as any,
          temperature: 0.2,
        }
      });

      const result = await model.generateContent([
        CIVIC_REPORT_VISION_PROMPT,
        {
          inlineData: {
            data,
            mimeType,
          }
        }
      ]);

      const text = result.response.text();
      const parsed = JSON.parse(text);
      
      return civicReportSchema.parse(parsed) as VisionCivicReport;

    } catch (error) {
      console.error('[VisionService] Failed to analyze civic report image:', error);
      return {
        category: 'Other',
        severity: 'Low',
        zone: 'Other',
        department: 'Other',
        description: 'Failed to analyze image automatically.',
        confidence: 0
      };
    }
  }

  /**
   * Stub method for existing backend routes.
   * @deprecated Use analyzeCivicReport instead.
   */
  async classifyIssue(imageBuffer: Buffer): Promise<ReportCreateResponse> {
    console.log(`[VisionService] classifyIssue called. Image size: ${imageBuffer.length} bytes`);
    
    // We can call analyzeCivicReport to get real AI data
    const base64 = imageBuffer.toString('base64');
    const analysis = await this.analyzeCivicReport(base64);

    return {
      id: `rep-${Math.random().toString(36).substring(2, 11)}`,
      category: analysis.category,
      severity: analysis.severity,
      description: analysis.description,
      location: analysis.zone, // Use zone as location for the stub
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
  }
}

export const visionService = new VisionService();
