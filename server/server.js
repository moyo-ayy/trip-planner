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


app.get('/api/:city1/:city2/', (req, res) => {
    // res.json({ message: "Hello from the backend!" });

    const getResponse = async () => {
        const chatCompletion = await openai.chat.completions.create({
            "model": "gpt-4",
            "messages": [
              {
                "role": "system",
                "content": "Strictly the latitude and longitude coordinates of the city inputted located excluding the starting and ending cities themselves. Your response should be succinct and well-organized. Your output must not include anything but the format specified"
              },
              {
                "role": "user",
                "content": `List ${req.params.city1} and ${req.params.city2} and provide their latitude and longitude in the format (lat1, long1),(lat2, lon2) with float values.`
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