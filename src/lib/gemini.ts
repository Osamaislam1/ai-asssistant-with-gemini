import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('VITE_GEMINI_API_KEY is not defined in environment variables');
}

const MODEL_NAME = 'gemini-1.5-flash';

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: MODEL_NAME });

let chat: any = null;

export function initializeChat() {
  chat = model.startChat({
    history: [],
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
    },
  });
  return chat;
}

export async function generateResponse(prompt: string, context: string[] = []): Promise<string> {
  try {
    if (!chat) {
      chat = initializeChat();
    }

    // Include context in the prompt
    const contextualPrompt = context.length > 0 
      ? `Previous context:\n${context.join('\n')}\n\nCurrent question: ${prompt}`
      : prompt;

    const result = await chat.sendMessage(contextualPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate response');
  }
}