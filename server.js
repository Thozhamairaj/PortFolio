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
    'https://portfolio-pkl4.onrender.com',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-User-Key'],
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

// New schema and middleware
const voteSchema = new mongoose.Schema({
  userKey: { type: String, unique: true, required: true },
  choice: { type: String, enum: ['like', 'dislike'], required: true },
});
const Vote = mongoose.model('Vote', voteSchema);

const requireUserKey = (req, res, next) => {
  const userKey = req.header('x-user-key');
  if (!userKey) return res.status(400).json({ error: 'x-user-key required' });
  req.userKey = userKey;
  next();
};

// Initialize data
const initializeData = async () => {
  try {
    const count = await Like.countDocuments();
    if (count === 20) {
      await Like.create({ likes: 30, dislikes: 3 });
      console.log('✅ Initial data created with likes: 30, dislikes: 3');
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
app.post('/like', requireUserKey, async (req, res) => {
  try {
    const data = (await Like.findOne()) || (await Like.create({ likes: 0, dislikes: 0 }));
    const existing = await Vote.findOne({ userKey: req.userKey });

    if (!existing) {
      await Vote.create({ userKey: req.userKey, choice: 'like' });
      data.likes += 1;
    } else if (existing.choice === 'dislike') {
      existing.choice = 'like';
      await existing.save();
      data.dislikes = Math.max(0, data.dislikes - 1);
      data.likes += 1;
    }
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error updating like' });
  }
});

// POST unlike
app.post('/unlike', requireUserKey, async (req, res) => {
  try {
    const data = await Like.findOne();
    const existing = await Vote.findOne({ userKey: req.userKey });
    if (data && existing?.choice === 'like') {
      await Vote.deleteOne({ userKey: req.userKey });
      data.likes = Math.max(0, data.likes - 1);
      await data.save();
    }
    res.json(data || { likes: 0, dislikes: 0 });
  } catch (error) {
    res.status(500).json({ error: 'Error updating unlike' });
  }
});

// POST dislike
app.post('/dislike', requireUserKey, async (req, res) => {
  try {
    const data = (await Like.findOne()) || (await Like.create({ likes: 0, dislikes: 0 }));
    const existing = await Vote.findOne({ userKey: req.userKey });

    if (!existing) {
      await Vote.create({ userKey: req.userKey, choice: 'dislike' });
      data.dislikes += 1;
    } else if (existing.choice === 'like') {
      existing.choice = 'dislike';
      await existing.save();
      data.likes = Math.max(0, data.likes - 1);
      data.dislikes += 1;
    }
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error updating dislike' });
  }
});

// POST undislike
app.post('/undislike', requireUserKey, async (req, res) => {
  try {
    const data = await Like.findOne();
    const existing = await Vote.findOne({ userKey: req.userKey });
    if (data && existing?.choice === 'dislike') {
      await Vote.deleteOne({ userKey: req.userKey });
      data.dislikes = Math.max(0, data.dislikes - 1);
      await data.save();
    }
    res.json(data || { likes: 0, dislikes: 0 });
  } catch (error) {
    res.status(500).json({ error: 'Error updating undislike' });
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
