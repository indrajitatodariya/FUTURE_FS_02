import { Link } from "react-router-dom";
import { useState } from "react";
import products from "../data/products";

function Contentr3({ searchTerm = "" }) {
  const [sortOrder, setSortOrder] = useState("");

  const term = searchTerm.toLowerCase();

  let filteredProducts = products.filter(
    (product) =>
      product.id >= 8 &&
      product.id <= 14 &&
      product.title.toLowerCase().includes(term)
  );

  if (sortOrder === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "highToLow") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="flex flex-col mt-5">
      <div className="ml-5 mb-3">
        <h1 className="text-xl font-bold">Fashion Items</h1>
        <div className="mt-2">
          <select
            className="select select-bordered"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 p-10">No products found</div>
      ) : (
        <div className="carousel carousel-center rounded-box max-w-screen space-x-4 p-2">
          {filteredProducts.map((product) => (
            <div className="carousel-item" key={product.id + "-" + product.title}>
              <Link to={`/product/${product.id}`}>
                <div className="card bg-base-100 w-80 shadow hover:scale-105 transition-transform">
                  <figure>
                    <img src={product.image} alt={product.title} className="h-48 w-full object-contain" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{product.title}</h2>
                    <p>Rs.{product.price}</p>
                    <div className="card-actions justify-end">
                      <div className="badge badge-outline">{product.category}</div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Contentr3;