import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./AuthContext";
import Navbar from './components/navbar';
import Offers from './components/offers';
import Contentr1 from './components/contentr1';
import Contentr2 from './components/contentr2';
import Contentr3 from './components/contentr3';
import Footer from './components/footer';
import Firstpage from './components/firstpage';
import Login from './components/Login';
import Register from './components/Register';
import ProductDetail from "./components/productdetails";
import CartPage from "./components/CartPage";
import SearchResults from "./components/SearchResults";
import ProtectedRoute from "./components/ProtectedRoute";
import VerifyNotice from "./components/VerifyNotice";
import Checkout from "./components/Checkout";
import OrderHistory from "./components/OrderHistory";
import smartphonebanner from '../src/assets/smartphonebanner.webp';
import electronicbanner from '../src/assets/electronicsbanner.webp';
import fashionbanner from '../src/assets/fashionbanner.webp';
import { Toaster } from 'react-hot-toast';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          
          <Toaster position="top-right" reverseOrder={false} />
          <Routes>
            <Route path="/" element={<Firstpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-notice" element={<VerifyNotice />} />
            <Route
              path="/main"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar onSearch={setSearchTerm} />
                    <Offers />
                    <img src={electronicbanner} className="w-full" />
                    <Contentr1 />
                    <img src={smartphonebanner} className="w-full" />
                    <Contentr2 />
                    <img src={fashionbanner} className="w-full" />
                    <Contentr3 />
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchResults searchTerm={searchTerm} />
                </ProtectedRoute>
              }
            />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
