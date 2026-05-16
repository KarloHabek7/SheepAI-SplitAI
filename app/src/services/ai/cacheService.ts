import { GoogleAICacheManager } from '@google/generative-ai/server';
import { ContextCacheInfo } from '../../types';
import fs from 'fs/promises';
import path from 'path';

/**
 * Service to manage Gemini Context Caching for RAG.
 * Pre-loads municipal documents to provide fast, high-context responses.
 */

import { GEMINI_MODELS } from '../../lib/ai/geminiClient';

let currentCacheId: string | null = null;
let cacheReady = false;

const CACHE_DISPLAY_NAME = 'SplitAI Municipal Knowledge Base';

/**
 * Initializes the context cache by reading documents and uploading them to Gemini.
 */
export async function initializeCache(): Promise<ContextCacheInfo> {
  console.log('[CacheService] Initializing context cache...');
  
  try {
    const apiKey = import.meta.env?.VITE_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error('VITE_GEMINI_API_KEY is missing');

    const cacheManager = new GoogleAICacheManager(apiKey);
    
    // 1. Prepare contents from document excerpts
    const docsDir = path.resolve(process.cwd(), 'public/assets/docs');
    const files = ['gup_excerpt.txt', 'komunalni_red_excerpt.txt', 'emergency_protocols.txt'];
    
    let combinedContent = '';
    for (const file of files) {
      const filePath = path.join(docsDir, file);
      const content = await fs.readFile(filePath, 'utf-8');
      combinedContent += `--- DOCUMENT: ${file} ---\n${content}\n\n`;
    }

    // 2. Create the cache
    // Note: TTL is set to 1 hour (3600 seconds)
    const cacheResponse = await cacheManager.create({
      model: GEMINI_MODELS.cache,
      displayName: CACHE_DISPLAY_NAME,
      contents: [
        {
          role: 'user',
          parts: [{ text: combinedContent }]
        }
      ],
      ttlSeconds: 3600,
    });

    currentCacheId = cacheResponse.name ?? null;
    cacheReady = true;
    
    console.log(`[CacheService] Cache created successfully: ${currentCacheId}`);

    return {
      cacheId: cacheResponse.name ?? 'unknown',
      displayName: cacheResponse.displayName || CACHE_DISPLAY_NAME,
      model: cacheResponse.model ?? GEMINI_MODELS.cache,
      tokenCount: 0, // SDK might not return this immediately in create response
      createTime: cacheResponse.createTime || new Date().toISOString(),
      expireTime: cacheResponse.expireTime || new Date(Date.now() + 3600 * 1000).toISOString(),
    };
  } catch (error) {
    console.error('[CacheService] Failed to initialize cache. Orchestrator will fall back to standard RAG or no-context:', error);
    cacheReady = false;
    currentCacheId = null;
    return {
      cacheId: 'unknown',
      displayName: CACHE_DISPLAY_NAME,
      model: GEMINI_MODELS.cache,
      tokenCount: 0,
      createTime: new Date().toISOString(),
      expireTime: new Date(Date.now() + 3600 * 1000).toISOString(),
    };
  }
}

/**
 * Returns the current cache ID or null if not initialized.
 */
export function getCacheId(): string | null {
  return currentCacheId;
}

/**
 * Returns whether the cache is ready for use.
 */
export function isCacheReady(): boolean {
  return cacheReady;
}

/**
 * Invalidates the current cache, forcing a refresh.
 */
export function invalidateCache(): void {
  currentCacheId = null;
  cacheReady = false;
}
