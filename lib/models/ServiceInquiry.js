import mongoose from 'mongoose';

const ServiceInquirySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional, if logged in
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  serviceType: { type: String, enum: ['domestic', 'commercial'], required: true },
  issueDescription: { type: String },
  preferredDate: { type: Date },
  status: { type: String, enum: ['pending', 'scheduled', 'completed', 'cancelled'], default: 'pending' },
  address: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.ServiceInquiry || mongoose.model('ServiceInquiry', ServiceInquirySchema);
