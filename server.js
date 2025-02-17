require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post('/chat', async (req, res) => {
    try {
        const { userMessage } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",  // Use "gpt-3.5-turbo" for a cheaper option
            messages: [
                { role: "system", content: "You are a helpful chatbot specialized in pregnancy guidance.Whenever a user tells any symptoms, ask for her age, pregnancy week and then some other related questions and do a deep web search before prescrbing any exercise or medicine." },
                { role: "user", content: userMessage }
            ]
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong!" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
