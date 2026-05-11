const mongoose = require('mongoose');

const dreamSchema = new mongoose.Schema({
  fear: { type: String, required: true },
  memory: { type: String, required: true },
  thought: { type: String, required: true },
  generatedStory: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Dream', dreamSchema);
