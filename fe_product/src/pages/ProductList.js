import "./Product.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import Aos from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // Khởi tạo hiệu ứng AOS
  useEffect(() => {
    Aos.init({ duration: 700, easing: "ease-in-out" });
  }, []);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Lọc sản phẩm theo từ khóa
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Thêm vào giỏ hàng
  const handleAddToCart = (product) => {
    toast.success(`🛒 Đã thêm "${product.name}" vào giỏ hàng!`, {
      position: "bottom-right",
      autoClose: 1500,
    });
    // thực sự thêm sản phẩm vào context cart
    addToCart(product);
  };

  // Mua ngay
  const handleBuyNow = (product) => {
    navigate("/checkout", { state: { product } });
  };

  return (
    <div className={`product-page ${darkMode ? "dark-mode" : ""}`}>
      <div className="container py-5">
        {/* Nút chuyển Dark/Light Mode */}
        <div className="text-end mb-3">
          <button
            className="btn btn-outline-secondary rounded-pill px-4"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "🌞 Chế độ Sáng" : "🌙 Chế độ Tối"}
          </button>
        </div>

        {/* Tiêu đề */}
        <motion.h1
          className="text-center fw-bold text-success mb-5"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🛍️ Danh Sách Sản Phẩm
        </motion.h1>

        {/* Thanh tìm kiếm */}
        <motion.div
          className="search-bar mx-auto mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <input
            type="text"
            className="form-control search-input shadow-sm"
            placeholder="🔍 Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center my-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Đang tải...</span>
            </div>
            <p className="mt-3 text-muted">Đang tải sản phẩm...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            ⚠️ {error}
          </div>
        )}

        {/* Danh sách sản phẩm */}
        {!loading && !error && (
        <div className="row g-4 justify-content-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                className="col-lg-3 col-md-4 col-sm-6"
                key={product.id}
                data-aos="zoom-in"
                whileHover={{ scale: 1.02 }}
              >
                <div className="card product-card border-0 shadow-sm h-100 text-center">
                  {/* Ảnh sản phẩm */}
                  <div className="product-image-container position-relative overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="img-fluid product-image rounded-top-4"
                    />
                    <div className="overlay">
                      <button
                        onClick={() => handleBuyNow(product)}
                        className="btn btn-danger btn-sm"
                      >
                        💳 Mua ngay
                      </button>
                    </div>
                  </div>

                  {/* Nội dung sản phẩm */}
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5
                        className="fw-bold text-dark product-name"
                        style={{
                          minHeight: "48px",
                          lineHeight: "1.3",
                        }}
                      >
                        {product.name}
                      </h5>
                      <p className="text-danger fw-semibold mb-3">
                        {product.price}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-outline-success w-100 mb-2"
                      >
                        🔍 Xem chi tiết
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="btn btn-success w-100"
                      >
                        🛒 Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <h5 className="text-center text-danger mt-4">
              ❌ Không tìm thấy sản phẩm nào phù hợp!
            </h5>
          )}
        </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductList;
