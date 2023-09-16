// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')

const app = express();
const PORT = 4000;

dotenv.config({path: './config.env'})

const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(cors());

app.get('/api/:city1/:city2', (req, res) => {
    // res.json({ message: "Hello from the backend!" });

    const getResponse = async () => {
        const chatCompletion = await openai.chat.completions.create({
            "model": "gpt-4",
            "messages": [
            {    "role": "system",
                "content": "I only want cities, I do not want descriptions, I want a brief and short response not including the start and end cities, do not end output in newline"
            },
            {
            "role": "user",
            "content": `Give me 6 cities in the form of 'city1,city2,city3' between a ${req.params.city1} to ${req.params.city2} roadtrip`
            }
            ]
            });
        res.json(chatCompletion.choices[0].message.content);
    }

    getResponse()
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});