import mongoose from "mongoose";

const purchaseItemSchema = new mongoose.Schema({
  productId: Number,
  title: String,
  image: String,
  price: Number,
  quantity: Number,
});

const purchaseHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [purchaseItemSchema],
  purchasedAt: { type: Date, default: Date.now },
});

export default mongoose.model("PurchaseHistory", purchaseHistorySchema);
