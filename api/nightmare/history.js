export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Return mock history since we don't have persistent storage in serverless
    const mockHistory = [
      {
        _id: 'mock1',
        fear: 'The Dark',
        memory: 'Childhood basement',
        thought: 'What if I never escape?',
        generatedStory: 'The darkness has weight. It presses down on you like an ocean. You remember the basement, the cold concrete, the sound of footsteps that stopped coming. "What if I never escape?" The question has teeth now.',
        createdAt: new Date(Date.now() - 86400000)
      },
      {
        _id: 'mock2',
        fear: 'Silence',
        memory: 'Empty hospital hallway',
        thought: 'Am I really alone?',
        generatedStory: 'The silence in the hospital hallway is so complete it becomes a sound. Your footsteps echo, but they\'re not alone. "Am I really alone?" you whisper. The echo doesn\'t repeat your words. It answers with laughter.',
        createdAt: new Date(Date.now() - 172800000)
      }
    ];

    res.status(200).json(mockHistory);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json([]);
  }
}
