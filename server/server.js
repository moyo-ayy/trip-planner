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
    const getResponse = async () => {
        const chatCompletion = await openai.chat.completions.create({
            "model": "gpt-4",
            "messages": [
              {
                "role": "system",
                "content": "Please strictly list the latitude and longitude coordinates of all cities located between the specified starting and ending locations, excluding the starting and ending cities themselves. Your response should be succinct and well-organized. Your output must not include anything but the format specified"
              },
              {
                "role": "user",
                "content": `List ${req.params.count} fairly spaced cities between ${req.params.city1} and ${req.params.city2} and provide their latitude and longitude in the format (lat1, long1),(lat2, lon2) with float values.`
              }
            ]
            });
        res.json(chatCompletion.choices[0].message.content);
    }

    getResponse()
});

app.get('/api/trip-plan/:city1/:city2/:count/:food/:places/:hobbies/', (req, res) => {
  const getTripPlan = async () => {
      const tripCompletion = await openai.chat.completions.create({
          "model": "gpt-4",
          "messages": [
            {
              "role": "system",
              "content": "Please provide a detailed plan for each day of a road trip."
            },
            {
              "role": "user",
              "content": `The road trip will start from ${req.params.city1} and end at ${req.params.city2}, lasting for ${req.params.count} days. The plan should include a breakfast place, a lunch restaurant, a dinner restaurant, and 1 to 2 places to visit each day. To personalize the plan, please consider the following information: the traveler loves ${req.params.food} food, enjoys visiting ${req.params.places} places, and has hobbies and other interests such as ${req.params.hobbies}. It is requested to output a personalized description of each day of the trip with a narrative.`
            }
          ]
      });
      res.json(tripCompletion.choices[0].message.content);
  }

  getTripPlan();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
