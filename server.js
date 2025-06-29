import express from "express";
import path from "path";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// Paraphrase API endpoint
app.post("/api/paraphrase", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: "No text provided" });
    }

    const prompt = `
You are an expert human writer rewriting the following text. Your goal is to make the text sound entirely human, natural, and undetectable as AI-generated by any detection tools.

- Do NOT use markdown formatting such as bolding or italics.
- Do NOT shorten, omit, or lose any meaning or detail.
- Use varied sentence structures, natural idioms, and colloquial phrases.
- Add subtle personality and slight emotional cues without being exaggerated.
- Avoid common AI writing patterns such as repetitive phrasing, unnatural formality, and mechanical or formulaic language.
- Make sure the output flows smoothly, reads like a human wrote it, and uses natural punctuation and contractions.
- Do not explain or comment on the rewriting; return only the rewritten text.
- Avoid phrases and words that trigger AI detection like "As an AI language model," or "In conclusion," or "Therefore."

Rewrite this text:

${text}
`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mistral-small-3.2-24b-instruct:free",
        temperature: 0.8,
        top_p: 0.9,
        messages: [{ role: "user", content: [{ type: "text", text: prompt }] }],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error });
    }

    const output = data.choices?.[0]?.message?.content?.trim() || "";
    res.json({ result: output });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Serve index.html for all other requests (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.resolve("public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
