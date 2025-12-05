import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Configure CORS properly
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://trfolio.netlify.app',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;
  
  if (!mongoUri) {
    console.error('❌ MONGODB_URI not set');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ MongoDB Connected Successfully');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

connectDB();

// Schema
const likeSchema = new mongoose.Schema({
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

const Like = mongoose.model('Like', likeSchema);

// Initialize data
const initializeData = async () => {
  try {
    const count = await Like.countDocuments();
    if (count === 0) {
      await Like.create({ likes: 0, dislikes: 0 });
      console.log('✅ Initial data created');
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
};

mongoose.connection.once('open', () => {
  console.log('MongoDB connection open');
  initializeData();
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running ✅' });
});

// GET counts
app.get('/likes', async (req, res) => {
  try {
    console.log('📥 GET /likes called');
    const data = await Like.findOne();
    res.json(data || { likes: 0, dislikes: 0 });
  } catch (error) {
    console.error('Error fetching likes:', error);
    res.status(500).json({ error: 'Error fetching likes' });
  }
});

// POST like
app.post('/like', async (req, res) => {
  try {
    console.log('📥 POST /like called');
    const data = await Like.findOne();
    if (!data) {
      const newData = await Like.create({ likes: 1, dislikes: 0 });
      return res.json(newData);
    }
    data.likes += 1;
    await data.save();
    res.json(data);
  } catch (error) {
    console.error('Error updating like:', error);
    res.status(500).json({ error: 'Error updating like' });
  }
});

// POST unlike
app.post('/unlike', async (req, res) => {
  try {
    console.log('📥 POST /unlike called');
    const data = await Like.findOne();
    if (data) {
      data.likes = Math.max(0, data.likes - 1);
      await data.save();
    }
    res.json(data || { likes: 0, dislikes: 0 });
  } catch (error) {
    console.error('Error updating like:', error);
    res.status(500).json({ error: 'Error updating like' });
  }
});

// POST dislike
app.post('/dislike', async (req, res) => {
  try {
    console.log('📥 POST /dislike called');
    const data = await Like.findOne();
    if (!data) {
      const newData = await Like.create({ likes: 0, dislikes: 1 });
      return res.json(newData);
    }
    data.dislikes += 1;
    await data.save();
    res.json(data);
  } catch (error) {
    console.error('Error updating dislike:', error);
    res.status(500).json({ error: 'Error updating dislike' });
  }
});

// POST undislike
app.post('/undislike', async (req, res) => {
  try {
    console.log('📥 POST /undislike called');
    const data = await Like.findOne();
    if (data) {
      data.dislikes = Math.max(0, data.dislikes - 1);
      await data.save();
    }
    res.json(data || { likes: 0, dislikes: 0 });
  } catch (error) {
    console.error('Error updating dislike:', error);
    res.status(500).json({ error: 'Error updating dislike' });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API Base URL: https://portfolio-pkl4.onrender.com`);
  console.log(`✅ Routes available:`);
  console.log(`   GET  https://portfolio-pkl4.onrender.com/`);
  console.log(`   GET  https://portfolio-pkl4.onrender.com/health`);
  console.log(`   GET  https://portfolio-pkl4.onrender.com/likes`);
  console.log(`   POST https://portfolio-pkl4.onrender.com/like`);
  console.log(`   POST https://portfolio-pkl4.onrender.com/unlike`);
  console.log(`   POST https://portfolio-pkl4.onrender.com/dislike`);
  console.log(`   POST https://portfolio-pkl4.onrender.com/undislike`);
});
