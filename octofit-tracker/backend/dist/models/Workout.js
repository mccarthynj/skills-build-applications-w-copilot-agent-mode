import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    exercices: [String],
    difficulty: { type: String, default: 'medium' },
}, { timestamps: true });
export const Workout = mongoose.model('Workout', workoutSchema);
