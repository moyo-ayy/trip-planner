// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')

const app = express();
const PORT = 4000;

// added a config folder for the .env config file; this may conflict on your local machine
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
                {
                  "role": "system",
                  "content": "Provide a list of cities without descriptions. Exclude the starting and ending cities. The response should be concise and not end with a newline."
                },
                {
                  "role": "user",
                  "content": `List 6 evenly spaced cities between ${req.params.city1} and ${req.params.city2} in the format "city1,city2,city3".`
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