require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/ask", async (req, res) => {
  try {
    const { medicine } = req.body;

   const prompt = `Tum ek pharmacist ho. Medicine "${medicine}" ke baare mein simple Urdu mein 3 lines likho: 1) kis kaam aati hai 2) side effects 3) warning. Markdown ya ** stars bilkul use mat karna, sirf saada text likho.`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!answer) return res.status(500).json({ error: "AI ne jawab nahi diya", details: data });
    res.json({ answer });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server chal raha hai: http://localhost:5000"));