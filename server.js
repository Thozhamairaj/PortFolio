import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection - remove deprecated options
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');

// Schema
const likeSchema = new mongoose.Schema({
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
});

const Like = mongoose.model('Like', likeSchema);

// Initialize data
const initializeData = async () => {
  const count = await Like.countDocuments();
  if (count === 0) {
    await Like.create({ likes: 0, dislikes: 0 });
  }
};

initializeData();

// GET counts
app.get('/api/likes', async (req, res) => {
  try {
    const data = await Like.findOne();
    res.json(data || { likes: 0, dislikes: 0 });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching likes' });
  }
});

// POST like
app.post('/api/like', async (req, res) => {
  try {
    const data = await Like.findOne();
    data.likes += 1;
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error updating like' });
  }
});

// POST unlike
app.post('/api/unlike', async (req, res) => {
  try {
    const data = await Like.findOne();
    data.likes = Math.max(0, data.likes - 1);
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error updating like' });
  }
});

// POST dislike
app.post('/api/dislike', async (req, res) => {
  try {
    const data = await Like.findOne();
    data.dislikes += 1;
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error updating dislike' });
  }
});

// POST undislike
app.post('/api/undislike', async (req, res) => {
  try {
    const data = await Like.findOne();
    data.dislikes = Math.max(0, data.dislikes - 1);
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error updating dislike' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));