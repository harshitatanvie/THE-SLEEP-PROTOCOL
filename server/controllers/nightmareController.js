const mongoose = require('mongoose');
const Dream = require('../models/Dream');
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateNightmare = async (req, res) => {
  try {
    const { fear, memory, thought } = req.body;

    if (!fear || !memory || !thought) {
      return res.status(400).json({ error: 'All inputs are required' });
    }

    let generatedStory = "";

    // Check if OpenAI key is valid/present
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your-openai-key')) {
      console.warn('OPENAI_API_KEY missing. Using Mock Nightmare Engine.');
      const mockStories = [
        `You are back in the ${memory}. But the walls are made of ${fear}. Every time you think of ${thought}, the ceiling lowers by an inch. You are not alone.`,
        `The ${thought} is no longer a whisper. It has a face, and it looks like a twisted version of your ${memory}. It knows your fear of ${fear} is the key to the door.`,
        `In the center of the ${memory}, there is a box. Inside is your ${fear}. You try to scream, but only the words "${thought}" come out. The box is opening.`
      ];
      generatedStory = mockStories[Math.floor(Math.random() * mockStories.length)];
    } else {
      const prompt = `Generate a short, terrifying, psychological horror nightmare story based on these elements:
      Fear: ${fear}
      Memory: ${memory}
      Thought: ${thought}
      The story should be immersive, surreal, and end with a cliffhanger. Limit to 150 words.`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
      });
      generatedStory = response.choices[0].message.content;
    }

    const mockId = Math.random().toString(36).substring(7);
    const dreamData = {
      _id: mockId,
      fear,
      memory,
      thought,
      generatedStory,
      createdAt: new Date()
    };

    // Only try to save if MongoDB is likely connected
    try {
      if (mongoose.connection.readyState === 1) {
        const newDream = new Dream(dreamData);
        await newDream.save();
      }
    } catch (dbErr) {
      console.warn('Database not connected. Dream not saved to archive.');
    }

    res.status(201).json(dreamData);
  } catch (error) {
    console.error('Error generating nightmare:', error);
    res.status(500).json({ error: 'The void is unstable. Try again.' });
  }
};

exports.getDreamHistory = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json([{ 
        _id: 'mock1', 
        fear: 'Silence', 
        generatedStory: 'The database is currently disconnected. Previous echoes are lost in the mist.',
        createdAt: new Date() 
      }]);
    }
    const dreams = await Dream.find().sort({ createdAt: -1 });
    res.json(Array.isArray(dreams) ? dreams : []);
  } catch (error) {
    res.status(500).json([]);
  }
};
