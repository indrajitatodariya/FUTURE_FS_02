import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: Number,
  title: String,
  image: String,
  price: Number,
  quantity: Number
});

const cartSchema = new mongoose.Schema({
  userId: String,
  items: [cartItemSchema]
});

export default mongoose.model("Cart", cartSchema);
