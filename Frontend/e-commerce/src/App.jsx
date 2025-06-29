import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './AuthContext';
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
import ProtectedRoute from './protectedRoute'; // ✅ Import

function App() {
  return (
    <AuthProvider> {/* ✅ Wrap everything with AuthProvider */}
      <Router>     {/* ✅ Add Router around Routes */}
        <Routes>
          <Route path="/" element={<Firstpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/main" 
            element={
              <ProtectedRoute>
                <>
                  <Navbar />
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
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
