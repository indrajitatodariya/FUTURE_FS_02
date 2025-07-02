import { useParams } from "react-router-dom";
import Products  from "../data/products";

function ProductDetail() {
  const { id } = useParams();
  const product = Products.find(p => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="flex justify-center p-10">
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src={product.image} alt={product.title} /></figure>
        <div className="card-body">
          <h2 className="card-title">{product.title}</h2>
          <p>Rs. {product.price}</p>
          <p>Category: {product.category}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
