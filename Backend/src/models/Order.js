import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        id: String,
        title: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    address: String,
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt fields
  }
);

export default mongoose.model("Order", orderSchema);
