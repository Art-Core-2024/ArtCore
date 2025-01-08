import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'super-admin'],
    default: 'user',
    required: true,
  },
  address: [
    {
      type: String, // Change to an array of strings
    },
  ],
});

const User = mongoose.models.Users || mongoose.model('Users', UserSchema);

export default User;