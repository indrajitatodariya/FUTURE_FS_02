import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./AuthContext";
import Navbar from './components/navbar';
import Categories from './components/categories';
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

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Firstpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/main"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar onSearch={setSearchTerm} />
                    <Categories />
                    <Offers />
                    <Contentr1 />
                    <Contentr2 />
                    <Contentr3 />
                    <Footer />
                  </>
                </ProtectedRoute>
              }
            />
            <Route path="/product/:id" element={<ProductDetail />} />
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
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
