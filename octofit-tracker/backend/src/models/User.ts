import mongoose, { Schema } from 'mongoose';

interface IUser {
  username: string;
  email: string;
  password?: string;
  profile?: {
    firstName?: string;
    lastName?: string;
    bio?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: String,
    profile: {
      firstName: String,
      lastName: String,
      bio: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
