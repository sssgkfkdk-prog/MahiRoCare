import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Hashed password
  name: { type: String },
  role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
  image: { type: String }, // For Google Auth profile picture
  otp: { type: String }, // Temporary OTP
  otpExpiry: { type: Date }, // Time when OTP expires
  amcPlan: { type: String }, // Name of the active AMC plan
  amcExpiry: { type: Date }, // Expiry date of the AMC plan
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
