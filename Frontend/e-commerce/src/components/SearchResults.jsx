import { Link } from "react-router-dom";
import products from "../data/products";

function SearchResults({ searchTerm = "" }) {
  const term = searchTerm.toLowerCase();

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(term)
  );

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Search Results for: "{searchTerm}"</h1>

      {filteredProducts.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filteredProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div className="card bg-base-100 shadow hover:scale-105 transition-transform">
                <figure>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain p-2"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{product.title}</h2>
                  <p>Rs.{product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
