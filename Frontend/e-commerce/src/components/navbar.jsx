import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "./theme";
import { useAuth } from "../AuthContext";

function Navbar({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(searchInput.trim());
      navigate("/search");
    }
  };

  return (
    <div className="navbar bg-base-100 w-full">
      <div className="mx-2 flex-1 px-2">
        <Link to="/main" className="btn btn-ghost text-xl">E-commerce</Link>
      </div>
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearch}
        />

        <Link to="/cart" className="btn btn-outline">Cart</Link>

        {isAuthenticated && (
          <>
            <Link to="/orders" className="btn btn-outline">Order History</Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </div>
  );
}

export default Navbar;
