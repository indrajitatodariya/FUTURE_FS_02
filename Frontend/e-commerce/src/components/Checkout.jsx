import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../AuthContext";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

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
  const [successMessage, setSuccessMessage] = useState("");
  const { cartItems, removeFromCart } = useCart();
  const { userId } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();


  const singleItem = location.state?.singleItem;
  const itemsToPurchase = singleItem ? [singleItem] : cartItems;


  const validate = () => {
    let newErrors = {};

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
    }
    if (!formData.city) {
      newErrors.city = "City is required";
    }
    if (!formData.zip || !/^\d{5,}$/.test(formData.zip)) {
      newErrors.zip = "Zip code must be at least 5 digits";
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setSuccessMessage("");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/order/create", {
        userId: userId,
        items: itemsToPurchase,
        address: `${formData.address}, ${formData.city}, ${formData.zip}`,
      });

     
      if (singleItem) {
        removeFromCart(singleItem.id);
      } else {
        cartItems.forEach((item) => removeFromCart(item.id));
      }

      setSuccessMessage("✅ Order placed successfully! We will deliver soon. Thank you!");

     
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

      
      setTimeout(() => {
        navigate("/main");
      }, 3000);

    } catch (err) {
      console.error("Error placing order:", err);
      setSuccessMessage("❌ Failed to place order. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      {successMessage && <div className="text-green-600 mb-4">{successMessage}</div>}

      
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Order Summary:</h3>
        <ul className="list-disc list-inside">
          {itemsToPurchase.map((item) => (
            <li key={item.id}>
              {item.title} — Rs.{item.price} × {item.quantity || 1}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.name && <div className="text-red-500">{errors.name}</div>}
        </div>

        <div className="mb-2">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.email && <div className="text-red-500">{errors.email}</div>}
        </div>

        <div className="mb-2">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.address && <div className="text-red-500">{errors.address}</div>}
        </div>

        <div className="mb-2">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.city && <div className="text-red-500">{errors.city}</div>}
        </div>

        <div className="mb-2">
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={formData.zip}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.zip && <div className="text-red-500">{errors.zip}</div>}
        </div>

        <div className="mb-2">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          {errors.phone && <div className="text-red-500">{errors.phone}</div>}
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="paymentMode"
            value={formData.paymentMode}
            disabled
            className="input input-bordered w-full bg-gray-100"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">Place Order</button>
      </form>
    </div>
  );
}
