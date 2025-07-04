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
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">📦 Your Order History</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
            >
              <p className="text-sm text-gray-500 mb-2">
                Placed on: <span className="font-medium">{new Date(order.createdAt).toLocaleString()}</span>
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Address:</strong> {order.address}
              </p>
              <div className="border-t pt-3">
                <h2 className="font-semibold mb-2">Items:</h2>
                <ul className="space-y-3">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain rounded mr-4 border"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <p className="text-gray-500">Rs.{item.price}</p>
                      </div>
                      <span className="badge badge-primary">Qty: {item.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
