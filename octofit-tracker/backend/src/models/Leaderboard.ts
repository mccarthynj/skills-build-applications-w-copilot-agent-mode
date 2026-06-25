import mongoose, { Schema } from 'mongoose';

interface ILeaderboardEntry {
  userId: mongoose.Types.ObjectId;
  teamId?: mongoose.Types.ObjectId;
  points: number;
  rank: number;
  updatedAt?: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Leaderboard = mongoose.model<ILeaderboardEntry>(
  'Leaderboard',
  leaderboardSchema
);
