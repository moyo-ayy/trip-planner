// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
const PORT = 4000;

// added a config folder for the .env config file; this may conflict on your local machine
dotenv.config({ path: "./config.env" });

const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());

app.get(
  "/api/:city1/:city2/:count/:food/:hobbies/:places/:other",
  (req, res) => {
    // res.json({ message: "Hello from the backend!" });
    const city1 = req.params.city1;
    const city2 = req.params.city2;
    const count = req.params.count;
    const food = req.params.food;
    const hobbies = req.params.hobbies;
    const places = req.params.places.split(",");
    const other = req.params.other;
    const getResponse = async () => {
      try {
          const chatCompletion = await openai.chat.completions.create({
              model: "gpt-4",
              messages: [
                  {
                      role: "system",
                      content: "Please provide a captivating detailed plan for each day of a road trip",
                  },
                  {
                      role: "user",
                      content: `I'm traveling from ${req.params.city1} to ${req.params.city2} for ${req.params.count} days. Plan my road trip in detailed each day, with a breakfast place, a lunch restaurant, a dinner restaurant, and 1 to 2 places to visit. Here are something about me: I love ${req.params.food} food, I love ${req.params.places} places, I like ${req.params.hobbies} and ${req.params.other}. Output a detailed personalized description of each day of my trip with a story`,
                  },
              ],
          });

          // Once the response from OpenAI is received, send it back to the client
          res.json(chatCompletion.choices[0].message.content);
      } catch (error) {
          console.error("Error fetching data from OpenAI:", error);
          res.status(500).json({ error: "Failed to fetch data from OpenAI" });
      }
  };

  getResponse();
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
