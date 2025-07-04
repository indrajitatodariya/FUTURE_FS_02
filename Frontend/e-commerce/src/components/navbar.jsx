import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ThemeToggle from "./theme";
import { useAuth } from "../AuthContext";
import logoSymbol from "../assets/reshot-icon-cart-BAE3K9JRS7.svg"

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
    <div className="navbar bg-base-100 shadow sticky top-0 z-50 px-4">
      {/* Brand with logo */}
      <div className="flex-1 flex items-center gap-2">
        <Link to="/main" className="flex items-center text-2xl font-bold text-primary">
          E-commerce
          <img
            src={logoSymbol}
            alt="Logo"
            className="w-12 h-12 ml-1"
          />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex items-center gap-3">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-48"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearch}
        />

        <Link to="/cart" className="btn btn-outline">Cart</Link>

        {isAuthenticated && (
          <Link to="/orders" className="btn btn-outline">Order History</Link>
        )}

        <ThemeToggle />
      </div>

      {/* Mobile Menu Dropdown */}
      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-60 space-y-2"
        >
          <li>
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-full"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearch}
            />
          </li>
          <li>
            <Link to="/cart" className="btn btn-outline w-full">Cart</Link>
          </li>
          {isAuthenticated && (
            <li>
              <Link to="/orders" className="btn btn-outline w-full">Order History</Link>
            </li>
          )}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
