const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

// Configure OpenAI client to use OpenRouter instead of DeepSeek directly
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // Make sure to update your .env file
  defaultHeaders: {
    "HTTP-Referer": "your-website.com", // Replace with your actual site URL
    "X-Title": "Book Recommendation App" // Replace with your app name
  }
});

router.post("/recommend", async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    console.log("Making API request to OpenRouter with query:", query);
    const completion = await openai.chat.completions.create({
      model: "mistralai/mistral-small-3.1-24b-instruct:free", // This is the model ID for OpenRouter
      messages: [
        { role: "system", content: "You are a book recommendation assistant." },
        { role: "user", content: query },
      ],
    });

    console.log("API response received");
    const recommendations = completion.choices[0].message.content.split("\n")
  .map(book => book.replace(/\*\*/g, "").trim()) // Remove **bold** formatting
  .filter(book => book.length > 0); // Remove empty lines

console.log("Cleaned Recommendations:", recommendations);

res.json({ recommendations });
  } catch (error) {
    console.error("API Error:", error.message);
    console.error("Full error:", error);
    res.status(500).json({ error: `Failed to fetch recommendations: ${error.message}` });
  }
});

module.exports = router;