
import { GoogleGenAI } from "@google/genai";
import type { GroundingSource } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a placeholder for environments where API_KEY might not be set.
  // In the target environment, this variable is expected to be available.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getChatResponse = async (prompt: string): Promise<{ text: string, sources: GroundingSource[] }> => {
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            tools: [{googleSearch: {}}],
        },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const sources: GroundingSource[] = groundingChunks
      .map(chunk => chunk.web)
      .filter(web => web?.uri && web.title)
      .map(web => ({ uri: web!.uri!, title: web!.title! }));

    // Deduplicate sources based on URI
    const uniqueSources = Array.from(new Map(sources.map(item => [item['uri'], item])).values());
    
    return { text, sources: uniqueSources };
  } catch (error) {
    console.error("Error getting chat response from Gemini:", error);
    return { text: "Sorry, I encountered an error. Please check the console for details.", sources: [] };
  }
};
