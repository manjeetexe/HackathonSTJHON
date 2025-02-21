const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.APIKEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const imagesDir = path.join(__dirname, '../images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Function to process image and generate AI response
const processImage = async (req, res) => {
    const { image, dict_of_vars_str } = req.body; // Get image and variables dictionary

    if (!image) {
        return res.status(400).json({ message: 'Image data is required' });
    }

    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const filePath = path.join(imagesDir, `canvas_image_${Date.now()}.png`);

    // AI prompt
    const prompt = `You have been provided with an image that contains mathematical expressions, equations, or graphical problems... 
    - Variable Context: ${dict_of_vars_str}`;

    const imageSend = {
        inlineData: {
            data: base64Data,
            mimeType: "image/png",
        },
    };

    try {
        const result = await model.generateContent([prompt, imageSend]);
        let aiResponse = result.response.text();

        console.log("Raw AI response:", aiResponse);

        aiResponse = aiResponse.replace(/```json/g, '').replace(/```/g, '').replace(/`/g, '').trim();

        console.log("Cleaned AI response:", aiResponse);

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(aiResponse);
        } catch (jsonError) {
            console.error("Error parsing JSON:", jsonError);
            return res.status(500).json({ message: 'Invalid response format from AI', error: jsonError.message });
        }

        if (parsedResponse && Array.isArray(parsedResponse) && parsedResponse.length > 0) {
            res.status(200).json(parsedResponse[0]);
        } else {
            res.status(500).json({ message: 'No valid response generated' });
        }

    } catch (error) {
        console.error("Error generating content:", error);
        res.status(500).json({ message: 'Failed to generate content', error: error.message });
    }

    // Save the image
    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error('Error saving image:', err);
        }
    });
};

module.exports = { processImage };