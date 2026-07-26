export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fear, memory, thought } = req.body;

    if (!fear || !memory || !thought) {
      return res.status(400).json({ error: 'All inputs are required' });
    }

    let generatedStory = "";

    // Check if OpenAI key is valid/present
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your-openai-key')) {
      // Use Mock Nightmare Engine
      const mockStories = [
        `You are back in the ${memory}. But the walls are made of ${fear}. Every time you think of ${thought}, the ceiling lowers by an inch. You are not alone.`,
        `The ${thought} is no longer a whisper. It has a face, and it looks like a twisted version of your ${memory}. It knows your fear of ${fear} is the key to the door.`,
        `In the center of the ${memory}, there is a box. Inside is your ${fear}. You try to scream, but only the words "${thought}" come out. The box is opening.`,
        `You find yourself in ${memory} again. The ${fear} surrounds you like a living thing. "${thought}" echoes through the darkness, growing louder with each breath.`,
        `The walls of ${memory} are breathing. They whisper your deepest fear: ${fear}. Your only thought is "${thought}", and it's becoming real.`
      ];
      generatedStory = mockStories[Math.floor(Math.random() * mockStories.length)];
    } else {
      try {
        const OpenAI = require('openai').default;
        const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });

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
      } catch (error) {
        // Fallback to mock if OpenAI fails
        const mockStories = [
          `You are back in the ${memory}. But the walls are made of ${fear}. Every time you think of ${thought}, the ceiling lowers by an inch. You are not alone.`,
          `The ${thought} is no longer a whisper. It has a face, and it looks like a twisted version of your ${memory}. It knows your fear of ${fear} is the key to the door.`,
          `In the center of the ${memory}, there is a box. Inside is your ${fear}. You try to scream, but only the words "${thought}" come out. The box is opening.`
        ];
        generatedStory = mockStories[Math.floor(Math.random() * mockStories.length)];
      }
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

    res.status(201).json(dreamData);
  } catch (error) {
    console.error('Error generating nightmare:', error);
    res.status(500).json({ error: 'The void is unstable. Try again.' });
  }
}
