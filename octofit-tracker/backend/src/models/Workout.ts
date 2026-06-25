import mongoose, { Schema } from 'mongoose';

interface IWorkout {
  userId: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  exercices?: string[];
  difficulty: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const workoutSchema = new Schema<IWorkout>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    exercices: [String],
    difficulty: { type: String, default: 'medium' },
  },
  { timestamps: true }
);

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
