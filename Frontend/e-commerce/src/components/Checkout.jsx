import { useState } from "react";
// import { useCart } from "../CartContext";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Checkout({ singleItem }) {
  const { userId } = useAuth();
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

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

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.zip.trim()) newErrors.zip = "ZIP code is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const itemsToPurchase = singleItem ? [singleItem] : cartItems;

    try {
      await axios.post(`${BASE_URL}/api/order/create`, {
        userId,
        items: itemsToPurchase,
        address: `${formData.address}, ${formData.city}, ${formData.zip}`,
        email: formData.email,
        phone: formData.phone,
        paymentMode: formData.paymentMode,
        customerName: formData.name,
      });

      if (singleItem) {
        removeFromCart(singleItem.id);
      } else {
        cartItems.forEach((item) => removeFromCart(item.id));
      }

      toast.success("✅ Order placed successfully!");

      setFormData({
        name: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        phone: "",
        paymentMode: "Cash on Delivery",
      });
      setErrors({});

      setTimeout(() => navigate("/main"), 3000);
    } catch (err) {
      console.error("Error placing order:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "❌ Failed to place order.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Address", name: "address", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "ZIP Code", name: "zip", type: "text" },
          { label: "Phone", name: "phone", type: "tel" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-medium">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded mt-1"
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <div>
          <label className="block font-medium">Payment Method</label>
          <select
            name="paymentMode"
            value={formData.paymentMode}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded mt-1"
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Credit/Debit Card</option>
            <option>Net Banking</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition duration-200"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
