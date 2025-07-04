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
    <div className="navbar bg-base-100 w-full gap-3">
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
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-3">
          <li><Link to="/cart" className="btn btn-outline">Cart</Link></li>
          <li>{isAuthenticated && (
          <>
            <Link to="/orders" className="btn btn-outline">Order History</Link>
          </>
        )}</li>
          <li><ThemeToggle /></li>
        </ul>
      </div>

      <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li><Link to="/cart" className="btn btn-outline">Cart</Link></li>
            <li> {isAuthenticated && (
          <>
            <Link to="/orders" className="btn btn-outline">Order History</Link>
          </>
        )}</li>
            <li><ThemeToggle /></li>
          </ul>
        </div>
    </div>
  );
}

export default Navbar;
