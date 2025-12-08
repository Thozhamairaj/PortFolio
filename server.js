import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

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

// Schemas
const voteSchema = new mongoose.Schema(
  {
    userKey: { type: String, required: true, unique: true },
    choice: { type: String, enum: ['like', 'dislike'], required: true },
  },
  { timestamps: true }
);

const statsSchema = new mongoose.Schema({
  _id: { type: String, default: 'global' },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

const Vote = mongoose.model('Vote', voteSchema);
const Stats = mongoose.model('Stats', statsSchema);

const ensureStats = async () =>
  (await Stats.findById('global')) || (await Stats.create({ _id: 'global' }));

// Middleware to require user key
const requireUserKey = (req, res, next) => {
  const userKey = req.header('x-user-key');
  if (!userKey) return res.status(400).json({ error: 'x-user-key required' });
  req.userKey = userKey;
  next();
};

// Routes
app.get('/', (_req, res) => {
  res.json({ message: 'Portfolio API is running ✅' });
});

app.get('/api/likes', async (_req, res) => {
  try {
    const stats = await ensureStats();
    res.json({ likes: stats.likes, dislikes: stats.dislikes });
  } catch (err) {
    console.error('Error fetching likes:', err);
    res.status(500).json({ error: 'Error fetching likes' });
  }
});

app.post('/api/like', requireUserKey, async (req, res) => {
  try {
    const stats = await ensureStats();
    const existing = await Vote.findOne({ userKey: req.userKey });

    if (!existing) {
      await Vote.create({ userKey: req.userKey, choice: 'like' });
      stats.likes += 1;
    } else if (existing.choice === 'dislike') {
      existing.choice = 'like';
      await existing.save();
      stats.dislikes = Math.max(0, stats.dislikes - 1);
      stats.likes += 1;
    } // if already 'like', no change

    await stats.save();
    res.json({ likes: stats.likes, dislikes: stats.dislikes });
  } catch (err) {
    console.error('Error updating like:', err);
    res.status(500).json({ error: 'Error updating like' });
  }
});

app.post('/api/unlike', requireUserKey, async (req, res) => {
  try {
    const stats = await ensureStats();
    const existing = await Vote.findOne({ userKey: req.userKey });
    if (existing?.choice === 'like') {
      await Vote.deleteOne({ userKey: req.userKey });
      stats.likes = Math.max(0, stats.likes - 1);
      await stats.save();
    }
    res.json({ likes: stats.likes, dislikes: stats.dislikes });
  } catch (err) {
    console.error('Error updating unlike:', err);
    res.status(500).json({ error: 'Error updating unlike' });
  }
});

app.post('/api/dislike', requireUserKey, async (req, res) => {
  try {
    const stats = await ensureStats();
    const existing = await Vote.findOne({ userKey: req.userKey });

    if (!existing) {
      await Vote.create({ userKey: req.userKey, choice: 'dislike' });
      stats.dislikes += 1;
    } else if (existing.choice === 'like') {
      existing.choice = 'dislike';
      await existing.save();
      stats.likes = Math.max(0, stats.likes - 1);
      stats.dislikes += 1;
    } // if already 'dislike', no change

    await stats.save();
    res.json({ likes: stats.likes, dislikes: stats.dislikes });
  } catch (err) {
    console.error('Error updating dislike:', err);
    res.status(500).json({ error: 'Error updating dislike' });
  }
});

app.post('/api/undislike', requireUserKey, async (req, res) => {
  try {
    const stats = await ensureStats();
    const existing = await Vote.findOne({ userKey: req.userKey });
    if (existing?.choice === 'dislike') {
      await Vote.deleteOne({ userKey: req.userKey });
      stats.dislikes = Math.max(0, stats.dislikes - 1);
      await stats.save();
    }
    res.json({ likes: stats.likes, dislikes: stats.dislikes });
  } catch (err) {
    console.error('Error updating undislike:', err);
    res.status(500).json({ error: 'Error updating undislike' });
  }
});

app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
