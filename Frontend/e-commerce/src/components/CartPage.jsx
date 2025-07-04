import { useCart } from "../context/CartContext";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      alert("Please login before proceeding to checkout.");
      return;
    }
    navigate("/checkout");
  };

  const handleSingleBuy = (item) => {
    if (!isAuthenticated) {
      alert("Please login before placing an order.");
      return;
    }
    navigate("/checkout", { state: { singleItem: item } });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">
          Your cart is empty. <Link to="/main" className="text-blue-500 underline">Continue shopping</Link>
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-full md:w-48 flex-shrink-0 bg-gray-100 p-3 flex justify-center items-center">
                  <img src={item.image} alt={item.title} className="object-contain h-40" />
                </div>

                <div className="flex flex-col p-4 flex-grow space-y-2">
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="text-green-600 font-medium">Rs. {item.price}</p>
                  <div className="flex items-center space-x-3">
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="font-medium">{item.quantity}</span>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Remove
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleSingleBuy(item)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary w-full mt-8 text-lg"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
