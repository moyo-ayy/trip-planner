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


app.get('/api/:city1/:city2/:count', (req, res) => {
    // res.json({ message: "Hello from the backend!" });

    const getResponse = async () => {
        const chatCompletion = await openai.chat.completions.create({
            "model": "gpt-4",
            "messages": [
              {
                "role": "system",
                "content": "Please list the latitude and longitude coordinates of all cities located between the specified starting and ending locations, excluding the starting and ending cities themselves. Your response should be succinct and well-organized."
              },
              {
                "role": "user",
                "content": `List ${req.params.count} evenly spaced cities between ${req.params.city1} and ${req.params.city2} and provide their latitude and longitude in the format "city1 (lat1, lon1), city2 (lat2, lon2), city3 (lat3, lon3)".`
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