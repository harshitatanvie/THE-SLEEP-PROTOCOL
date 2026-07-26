require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const nightmareRoutes = require('./routes/nightmareRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/nightmare', nightmareRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Sleep Protocol API is running...');
});

// Database Connection & Server Start
const startServer = () => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[!] Sleep Protocol active on port ${PORT}`);
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.includes('your-openai-key')) {
      console.log('--- RUNNING IN MOCK MODE (No OpenAI Key) ---');
    }
  });
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    startServer();
  })
  .catch((err) => {
    console.warn('Database connection failed. Archiving disabled.');
    startServer();
  });
