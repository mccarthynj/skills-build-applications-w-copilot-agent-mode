import mongoose, { Schema } from 'mongoose';

interface ITeam {
  name: string;
  description?: string;
  members: mongoose.Types.ObjectId[];
  leaderId: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    description: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    leaderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Team = mongoose.model<ITeam>('Team', teamSchema);
