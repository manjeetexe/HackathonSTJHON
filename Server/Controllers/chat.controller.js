const { validationResult } = require("express-validator");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.APIKEY);

module.exports.chatWithAi = async function (req, res) {
  try {
    // Validate input fields
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { message } = req.body;
    console.log("User Message:", message);

    // Send message to Gemini API
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(message);
    const aiResponse = result.response.text(); // Extract AI response

    console.log("Gemini AI Response:", aiResponse);

    // Send AI response to frontend
    res.json({ response: aiResponse });

  } catch (error) {
    console.error("Gemini AI Error:", error);
    res.status(500).json({ error: "AI service is unavailable" });
  }
};