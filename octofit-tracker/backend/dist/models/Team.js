import mongoose, { Schema } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    leaderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
export const Team = mongoose.model('Team', teamSchema);
