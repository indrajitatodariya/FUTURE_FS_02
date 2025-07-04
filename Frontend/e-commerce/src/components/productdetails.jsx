import { useParams } from "react-router-dom";
import Products from "../data/products";
import { useCart } from "../context/CartContext";
import Navbar from '../components/navbar'
import Contentr1 from '../components/contentr1'
import { useState } from "react"; 
import Contentr2 from '../components/contentr2'
import Contentr3 from '../components/contentr3'


function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false); 

  const product = Products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found.</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setShowAlert(true); 
    setTimeout(() => {
      setShowAlert(false); 
    }, 3000);
  };

  return (
    <>
      <Navbar/>
      <div className="flex justify-left p-10">
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
            {showAlert && (
              <div className="alert alert-success mt-4">
                <span>{product.title} added to cart!</span>
                <button
                  className="btn btn-sm btn-ghost ml-auto"
                  onClick={() => setShowAlert(false)}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Contentr1 />
      <Contentr2 />
      <Contentr3 />
    </>
  );
}

export default ProductDetail;
