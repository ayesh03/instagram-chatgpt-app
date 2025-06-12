const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/generate", async (req, res) => {
  const { topic, niche } = req.body;

  const prompt = `You are a content strategist. Suggest one trending Instagram reel idea for a creator in the ${niche} niche on the topic "${topic}". Include a reel idea, caption, 5 relevant hashtags, and a strong opening hook.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const result = response.choices[0].message.content;
    res.status(200).json({ result });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

module.exports = router;
