import { GoogleGenAI, Modality } from "@google/genai";
import type { GroundingSource, ChatMessagePart } from '../types';

let ai: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
    // FIX: Use process.env.API_KEY as per the coding guidelines.
    const API_KEY = process.env.API_KEY;
    if (!API_KEY) {
        // FIX: Updated error message to reflect the correct environment variable.
        throw new Error("API_KEY environment variable not set. Gemini API calls will fail.");
    }
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: API_KEY });
    }
    return ai;
}

const mapPartsToGenAI = (parts: ChatMessagePart[]) => {
    return parts.map(part => {
        if (part.type === 'text') {
            return { text: part.text };
        }
        // Assumes part.type === 'image'
        return {
            inlineData: {
                data: part.data,
                mimeType: part.mimeType,
            },
        };
    });
};

export const getChatResponse = async (parts: ChatMessagePart[]): Promise<{ text: string, sources: GroundingSource[] }> => {
  try {
    const client = getAiClient();
    
    const contents = { parts: mapPartsToGenAI(parts) };

    const response = await client.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
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

    const uniqueSources = Array.from(new Map(sources.map(item => [item['uri'], item])).values());
    
    return { text, sources: uniqueSources };
  } catch (error) {
    console.error("Error getting chat response from Gemini:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { text: `Sorry, I encountered an error. Please check the console for details.\n\nDetails: ${errorMessage}`, sources: [] };
  }
};

export const generateImage = async (prompt: string): Promise<{ base64Image: string; mimeType: string }> => {
    try {
        const client = getAiClient();
        const response = await client.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] },
            config: {
                // FIX: Used Modality.IMAGE enum as per coding guidelines.
                responseModalities: [Modality.IMAGE],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return {
                    base64Image: part.inlineData.data,
                    mimeType: part.inlineData.mimeType,
                };
            }
        }
        throw new Error("Image data was not found in the response.");

    } catch (error) {
        console.error("Error generating image with Gemini:", error);
        throw error;
    }
};