const { GoogleGenerativeAI } = require("@google/generative-ai");

const genai = async (prompt) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
};

module.exports = genai;