import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
    paymentMode: "Cash on Delivery",
  });

  const [errors, setErrors] = useState({});
  const { cartItems, removeFromCart } = useCart();
  const { userId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const singleItem = location.state?.singleItem;
  const itemsToPurchase = singleItem ? [singleItem] : cartItems;

  const validate = () => {
    let newErrors = {};
    if (!formData.name || formData.name.length < 3) newErrors.name = "Name must be at least 3 characters";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.zip || !/^\d{5,}$/.test(formData.zip)) newErrors.zip = "Zip code must be at least 5 digits";
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be exactly 10 digits";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post("http://localhost:5000/api/order/create", {
        userId,
        items: itemsToPurchase,
        address: `${formData.address}, ${formData.city}, ${formData.zip}`,
      });

      if (singleItem) removeFromCart(singleItem.id);
      else cartItems.forEach((item) => removeFromCart(item.id));

      toast.success("✅ Order placed successfully! We will deliver soon. Thank you!");

      setFormData({ name: "", email: "", address: "", city: "", zip: "", phone: "", paymentMode: "Cash on Delivery" });
      setErrors({});

      setTimeout(() => navigate("/main"), 3000);
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("❌ Failed to place order. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="flex-1 bg-white p-6 rounded shadow space-y-3">
        <h2 className="text-2xl font-bold mb-4">Contact & Shipping Information</h2>

        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="input input-bordered w-full" />
        {errors.name && <div className="text-red-500">{errors.name}</div>}

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="input input-bordered w-full" />
        {errors.email && <div className="text-red-500">{errors.email}</div>}

        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="input input-bordered w-full" />
        {errors.address && <div className="text-red-500">{errors.address}</div>}

        <div className="flex gap-2">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="input input-bordered w-full" />
          <input type="text" name="zip" placeholder="Zip Code" value={formData.zip} onChange={handleChange} className="input input-bordered w-full" />
        </div>
        {errors.city && <div className="text-red-500">{errors.city}</div>}
        {errors.zip && <div className="text-red-500">{errors.zip}</div>}

        <input type="text" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="input input-bordered w-full" />
        {errors.phone && <div className="text-red-500">{errors.phone}</div>}

        <input type="text" name="paymentMode" value={formData.paymentMode} disabled className="input input-bordered w-full bg-gray-100" />

        <button type="submit" className="btn btn-primary w-full">Confirm Order</button>
      </form>

      <div className="w-full lg:w-1/3 bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <ul className="space-y-4">
          {itemsToPurchase.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-gray-500">Rs.{item.price} × {item.quantity || 1}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-4 border-t pt-4">
          <p className="flex justify-between"><span>Subtotal</span><span>Rs.{itemsToPurchase.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)}</span></p>
          <p className="flex justify-between"><span>Shipping</span><span>Rs.50</span></p>
          <p className="flex justify-between font-bold text-lg"><span>Total</span><span>Rs.{itemsToPurchase.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0) + 50}</span></p>
        </div>
      </div>
    </div>
  );
}
