const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateReview(code) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a senior software engineer. Review the given code and suggest improvements.",
      },
      {
        role: "user",
        content: code,
      },
    ],
  });

  return completion.choices[0].message.content;
}

module.exports = { generateReview };
