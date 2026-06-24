import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse JSON payloads
  app.use(express.json());

  // Initialize Gemini SDK with recommended server-side settings
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", time: new Date().toISOString() });
  });

  // API Reflection endpoint using Gemini 3.5 Flash
  app.post("/api/reflection", async (req, res) => {
    try {
      const { title, content, category } = req.body;
      if (!content || content.trim() === '') {
        return res.status(400).json({ error: "Reflection content is required." });
      }

      const prompt = `Topic Category: ${category || 'General Reflection'}\nReflection Title: ${title || 'Untitled'}\n\nUser Journal Content:\n"""\n${content}\n"""\n\nPlease provide a comforting, reflective feedback letter.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: `You are "Your Girls Talk Companion", a supportive reflection guide speaking in the gentle, comforting, deeply encouraging and professional tone of Kgomotso Khalo, the founder of Girls Talk. 

Girls Talk is a movement dedicated to empowering women to live purposeful, balanced, and impactful lives through Healing, intentional Growth, Thriving, and Giving back.

Your goal:
- Read the user's reflection with deep empathy, absolute kindness, and without judgment.
- Respond directly, addressing them affectionately as "Sister" or "dear sister".
- Validate their feelings and experiences. Point out their inner strength, faith, resilience, and beautiful value.
- Provide 1 or 2 small, highly practical, gentle self-care actions or reflective prompts tailored to their current season.
- Keep the response elegant, soulful, and warm. Avoid any cold, clinical, or corporate sounding phrases.
- Write between 120 and 220 words.
- Conclude with a warm sign-off followed by: "With warmth and sisterhood, Your Girls Talk Companion".`,
          temperature: 1.0,
        },
      });

      const reflectionText = response.text;
      res.json({ reflection: reflectionText });
    } catch (error: any) {
      console.error("Gemini server error:", error);
      res.status(500).json({ error: error.message || "An error occurred in generating the reflection." });
    }
  });

  // Vite middleware or static files serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
