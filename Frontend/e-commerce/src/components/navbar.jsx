import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ThemeToggle from "./theme";

function Navbar({ onSearch }) {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSearch(searchInput.trim()); // trim before passing
      navigate("/search");
    }
  };

  return (
    <div className="navbar bg-base-100 w-full">
      <div className="mx-2 flex-1 px-2">
        <a className="btn btn-ghost text-xl">E-commerce</a>
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
        <button className="btn btn-outline btn-info">Login</button>
        <ThemeToggle />
      </div>
    </div>
  );
}

export default Navbar;
