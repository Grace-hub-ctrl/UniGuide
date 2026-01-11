
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";

const API_KEY = process.env.API_KEY || "";

export const getGeminiResponse = async (
  prompt: string, 
  history: Message[] = [], 
  useSearch: boolean = true
) => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    const contents = [
      ...history.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      })),
      { role: 'user', parts: [{ text: prompt }] }
    ];

    const config: any = {
      systemInstruction: "You are UniGuide, a world-class college admissions consultant and student helper. Your goal is to help students find scholarships, research colleges, find internships, and write amazing essays. Be encouraging, factual, and always provide specific sources if you use Google Search.",
    };

    if (useSearch) {
      config.tools = [{ googleSearch: {} }];
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents as any,
      config: config
    });

    const text = response.text || "I'm sorry, I couldn't generate a response.";
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const analyzeEssay = async (essayContent: string) => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Please review this college application essay. Provide constructive feedback on: 1. Hook/Introduction 2. Narrative Voice 3. Specificity 4. Grammar/Style. Be encouraging but honest.\n\nEssay Content:\n${essayContent}`,
      config: {
        thinkingConfig: { thinkingBudget: 16000 }
      }
    });

    return response.text;
  } catch (error) {
    console.error("Essay Analysis Error:", error);
    throw error;
  }
};
