import { GoogleGenAI } from "@google/genai";
import { ENV } from "../config/env.js";

const ai = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });

export class GeminiService {

    static async testModel(modelConfig) {
        const modelName = typeof modelConfig === 'string' ? modelConfig : modelConfig.name;
        const type = typeof modelConfig === 'string' ? 'unknown' : modelConfig.type;

        try {
            if (modelName.includes('embedding') || type === 'embedding') {
                await ai.models.embedContent({
                    model: modelName,
                    contents: "Status Check",
                });
            } else {
                await ai.models.generateContent({
                    model: modelName,
                    contents: "Ping",
                });
            }
            return { name: modelName, success: true, timestamp: new Date() };
        } catch (error) {
            return { name: modelName, success: false, error: error.message, timestamp: new Date() };
        }
    }

    static async checkBatch(models) {
        const results = [];
        for (const m of models) {
            results.push(await this.testModel(m));
        }
        return results;
    }
}
