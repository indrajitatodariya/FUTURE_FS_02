import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import SearchResults from "./components/SearchResults";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <AuthProvider>
      <Router>
        <Navbar onSearch={setSearchTerm} />
        <Routes>
          <Route path="/" element={<Firstpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/main"
            element={
              <>
                <Categories />
                <Offers />
                <Contentr1 />
                <Contentr2 />
                <Contentr3 />
                <Footer />
              </>
            }
          />
          <Route path="/search" element={<SearchResults searchTerm={searchTerm} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
