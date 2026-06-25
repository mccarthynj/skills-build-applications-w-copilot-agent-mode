import express from 'express';
import { Workout } from '../models/Workout';
const router = express.Router();
// GET /api/workouts - Get all workouts
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.find().populate('userId');
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
// GET /api/workouts/:id - Get workout by ID
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout.findById(req.params.id).populate('userId');
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json(workout);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
});
// POST /api/workouts - Create new workout
router.post('/', async (req, res) => {
    try {
        const workout = new Workout(req.body);
        await workout.save();
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create workout' });
    }
});
// PUT /api/workouts/:id - Update workout
router.put('/:id', async (req, res) => {
    try {
        const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json(workout);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update workout' });
    }
});
// DELETE /api/workouts/:id - Delete workout
router.delete('/:id', async (req, res) => {
    try {
        const workout = await Workout.findByIdAndDelete(req.params.id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json({ message: 'Workout deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete workout' });
    }
});
export default router;
