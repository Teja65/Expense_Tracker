import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      default: '',
    },
    provider: {
      type: String,
      enum: ['password', 'google'],
      default: 'password',
    },
    role: {
      type: String,
      default: 'USER',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', userSchema);
