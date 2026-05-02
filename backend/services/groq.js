const axios = require("axios");
require("dotenv").config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

if (!GROQ_API_KEY) console.warn("GROQ_API_KEY not set in env");

async function generatePRDescriptionWithGroq(structuredData) {
  const res = await axios.post(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "user",
          content: `You are the developer who wrote these changes, writing your own PR description. Be concise and to the point.\n\nDiff data:\n${JSON.stringify(
            structuredData,
          )}\n\nFill this exact markdown template. Rules: ...`,
        },
      ],
      max_tokens: 800,
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );

  return res.data.choices?.[0]?.message?.content || "";
}

module.exports = { generatePRDescriptionWithGroq };
