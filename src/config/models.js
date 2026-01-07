export const STABLE_MODELS = [
    { name: "gemini-.5-flash", type: "generation" },
    { name: "gemini-2.5-flash-lite", type: "generation" },
    { name: "gemini-3-flash-preview", type: "generation" },
    { name: "gemini-embedding-001", type: "embedding" },
    { name: "text-embedding-004", type: "embedding" }
];

export const CANDIDATE_MODELS = [
    // Legacy / PaLM
    "text-bison", "text-bison-001", "chat-bison", "chat-bison-001",
    "code-bison", "code-bison-001", "code-gecko", "code-gecko-001",
    "textembedding-gecko", "textembedding-gecko-001", "textembedding-gecko-002",
    "multimodalembedding@001",

    // Gemini 1.0
    "gemini-1.0-pro", "gemini-1.0-pro-001", "gemini-1.0-pro-002",
    "gemini-1.0-pro-vision", "gemini-1.0-pro-vision-001",

    // Gemini 1.5
    "gemini-1.5-pro", "gemini-1.5-pro-001", "gemini-1.5-pro-002",
    "gemini-1.5-flash", "gemini-1.5-flash-001", "gemini-1.5-flash-002",

    // Gemini 2.0
    "gemini-2.0-flash", "gemini-2.0-flash-001", "gemini-2.0-flash-lite",
    "gemini-2.0-flash-lite-001", "gemini-2.0-flash-live-001",

    // Gemini 2.5
    "gemini-2.5-pro",
    "gemini-2.5-flash-image", "gemini-2.5-flash-preview",
    "gemini-2.5-flash-preview-tts", "gemini-live-2.5-flash",
    "gemini-live-2.5-flash-native-audio",

    // Gemini 3.0
    "gemini-3-pro-preview", "gemini-3-pro-image-preview",

    // Embeddings
    "text-embedding-005", "text-multilingual-embedding-002"
];
