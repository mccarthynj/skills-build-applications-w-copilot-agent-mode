import express from 'express';
import { Leaderboard } from '../models/Leaderboard';

const router = express.Router();

// GET /api/leaderboard - Get all leaderboard entries
router.get('/', async (req, res) => {
  try {
    const entries = await Leaderboard.find()
      .sort({ rank: 1 })
      .populate('userId')
      .populate('teamId');
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// GET /api/leaderboard/:id - Get leaderboard entry by ID
router.get('/:id', async (req, res) => {
  try {
    const entry = await Leaderboard.findById(req.params.id)
      .populate('userId')
      .populate('teamId');
    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard entry' });
  }
});

// POST /api/leaderboard - Create leaderboard entry
router.post('/', async (req, res) => {
  try {
    const entry = new Leaderboard(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create leaderboard entry' });
  }
});

// PUT /api/leaderboard/:id - Update leaderboard entry
router.put('/:id', async (req, res) => {
  try {
    const entry = await Leaderboard.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!entry) {
      return res.status(404).json({ error: 'Leaderboard entry not found' });
    }
    res.json(entry);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update leaderboard entry' });
  }
});

export default router;
