import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env from project root
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });

const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error('❌ VITE_GEMINI_API_KEY not found in .env');
  process.exit(1);
}

console.log('✅ API Key Found:', apiKey.substring(0, 8) + '...');

const genAI = new GoogleGenerativeAI(apiKey);

async function test() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent('Say "Connection Successful"');
    const response = await result.response;
    const text = response.text();
    console.log('🤖 AI Response:', text);
  } catch (error) {
    console.error('❌ AI Connection Failed:', error);
  }
}

test();
