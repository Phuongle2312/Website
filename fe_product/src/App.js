import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import ProductCard from "./pages/ProductCard";
import Checkout from "./pages/Checkout";
import { CartProvider } from "./context/CartContext"; // Import CartContext

const App = () => {
  return (
    <CartProvider>
      <div className="d-flex flex-column min-vh-100">
        <Router>
          <Navbar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/product-card" element={<ProductCard />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </div>
    </CartProvider>
  );
};
export default App;
