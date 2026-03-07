import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  images: [{ type: String }],
  features: [{ type: String }], // Optional list of features/specs
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
