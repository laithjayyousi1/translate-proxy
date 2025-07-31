const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

// 👇 إعدادات CORS واضحة للسماح لأي موقع بالوصول
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.post("/translate", async (req, res) => {
  const text = req.body.text;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' field in request." });
  }

  try {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=tr|en`);
    const data = await response.json();
    const translated = data.responseData.translatedText;

    res.json({ translatedText: translated });
  } catch (error) {
    console.error("Translation error:", error);
    res.status(500).json({ error: "Translation failed" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Translation proxy running on port ${port}`);
});
