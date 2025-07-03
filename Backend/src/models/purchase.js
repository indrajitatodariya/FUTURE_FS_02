import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      productId: String,
      quantity: Number,
      name: String,
      price: Number,
      image: String,
    }
  ],
  shippingDetails: {
    name: String,
    email: String,
    address: String,
    city: String,
    zip: String,
    phone: String,
  },
  purchasedAt: { type: Date, default: Date.now },
});

const Purchase = mongoose.model('Purchase', purchaseSchema);
export default Purchase;
