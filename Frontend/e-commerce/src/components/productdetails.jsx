import { useParams } from "react-router-dom";
import Products from "../data/products";
import { useCart } from "../context/CartContext";
import Navbar from "../components/navbar";
import Contentr1 from "../components/contentr1";
import Contentr2 from "../components/contentr2";
import Contentr3 from "../components/contentr3";
import { toast } from "react-hot-toast";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = Products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div className="text-center text-red-500 mt-10">Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-center items-start p-8 gap-10">
        <div className="w-full md:w-1/2 bg-white rounded shadow p-4">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[400px] object-contain rounded"
          />
        </div>

        <div className="w-full md:w-1/2 bg-white rounded shadow p-6 space-y-4">
          <h2 className="text-3xl font-bold">{product.title}</h2>
          <p className="text-xl text-green-600">Rs. {product.price}</p>
          <p className="text-gray-600">Category: {product.category}</p>
          <p className="text-gray-700 mt-2">{product.description}</p>

          <button className="btn btn-primary mt-4" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-10">
        <Contentr1 />
        <Contentr2 />
        <Contentr3 />
      </div>
    </>
  );
}

export default ProductDetail;
