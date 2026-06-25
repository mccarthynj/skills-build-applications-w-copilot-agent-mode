import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: String,
    profile: {
        firstName: String,
        lastName: String,
        bio: String,
    },
}, { timestamps: true });
export const User = mongoose.model('User', userSchema);
