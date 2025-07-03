import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";

export default function OrderHistory() {
  const { userId } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/order/user/${userId}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="card bg-base-100 shadow p-4">
              <p className="text-sm text-gray-500">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
              <p className="font-semibold">Address: {order.address}</p>
              <ul className="list-disc list-inside mt-2">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.title} — Rs.{item.price} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
