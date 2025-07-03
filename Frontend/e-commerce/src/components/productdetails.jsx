import { useParams } from "react-router-dom";
import Products from "../data/products";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = Products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="flex justify-center p-10">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure>
          <img src={product.image} alt={product.title} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.title}</h2>
          <p>Rs. {product.price}</p>
          <p>Category: {product.category}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
