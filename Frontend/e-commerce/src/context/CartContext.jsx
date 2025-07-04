import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/cart/${userId}`)
        .then((res) => {
          setCartItems(res.data.items || []);
        })
        .catch((err) => {
          console.error("Error loading cart from backend", err);
        });
    }
  }, [userId]);

  const saveCartToBackend = (items) => {
    if (!userId) return;
    axios.post("http://localhost:5000/api/cart/save", {
      userId,
      items,
    }).catch((err) => {
      console.error("Error saving cart to backend", err);
    });
  };

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      let updated;
      if (existing) {
        updated = prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [...prev, { ...product, quantity: 1 }];
      }
      saveCartToBackend(updated);
      return updated;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== productId);
      saveCartToBackend(updated);
      return updated;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.id === productId ? { ...item, quantity: Math.max(quantity, 1) } : item
      );
      saveCartToBackend(updated);
      return updated;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}
