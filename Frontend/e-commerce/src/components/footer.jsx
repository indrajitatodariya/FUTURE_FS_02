import { Link } from "react-router-dom";
import logo from "../assets/reshot-icon-cart-BAE3K9JRS7.svg";

function Footer() {
  return (
    <footer className="footer bg-base-200 text-base-content p-10 mt-10 flex flex-col md:flex-row justify-between items-center">
      <aside className="flex flex-col items-center md:items-start">
        <img
          src={logo}
          alt="Logo"
          className="w-26 h-26 mb-2" 
        />
        <p className="text-center md:text-left">
          E-commerce Store
          <br />
          Your trusted online shopping partner.
        </p>
      </aside>

      <nav className="flex flex-col gap-2">
        <h6 className="footer-title">Quick Links</h6>
        <Link to="/main" className="link link-hover">Shop</Link>
        <Link to="/cart" className="link link-hover">Cart</Link>
        <Link to="/orders" className="link link-hover">Order History</Link>
        <Link to="/contact" className="link link-hover">Contact Us</Link>
      </nav>

      <nav className="flex flex-col gap-2 mt-4 md:mt-0">
        <h6 className="footer-title">Follow Us</h6>
        <a href="#" className="link link-hover">Instagram</a>
        <a href="#" className="link link-hover">Facebook</a>
        <a href="#" className="link link-hover">X</a>
      </nav>
    </footer>
  );
}

export default Footer;
