import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/main" className="text-blue-500">Continue shopping</Link></p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="card bg-base-100 shadow flex flex-col md:flex-row">
              <figure className="w-full md:w-48">
                <img src={item.image} alt={item.title} className="object-cantain h-48 w-full" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{item.title}</h2>
                <p>Rs.{item.price}</p>
                <div className="flex items-center space-x-2">
                  <button
                    className="btn btn-sm"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-sm"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="btn btn-error btn-sm mt-2"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CartPage;
