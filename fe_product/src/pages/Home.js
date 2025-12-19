import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { getProducts } from "../services/api";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const featuredProducts = products.slice(0, 3);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section text-center text-white d-flex align-items-center justify-content-center">
        <div className="container">
          <h1 className="display-5 fw-bold mb-3 animate__animated animate__fadeInDown">
            Chào mừng đến <span className="text-warning">MyShop</span>!
          </h1>
          <p className="lead mb-4 animate__animated animate__fadeInUp">
            Cung cấp sản phẩm chất lượng, dịch vụ tận tâm và giá tốt nhất!
          </p>
          <Link to="/products" className="btn btn-light btn-lg shadow fw-bold">
            🛍️ Mua ngay
          </Link>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold text-success">
            🌟 Tại sao chọn MyShop?
          </h2>
          <Row className="text-center">
            <Col md={4} className="mb-4">
              <div className="p-4 bg-white shadow-sm rounded-4 h-100 hover-card">
                <i className="bi bi-truck display-4 text-success mb-3"></i>
                <h5 className="fw-bold">Giao hàng miễn phí</h5>
                <p className="text-muted">
                  Miễn phí giao hàng cho đơn hàng từ 500K trở lên.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="p-4 bg-white shadow-sm rounded-4 h-100 hover-card">
                <i className="bi bi-credit-card display-4 text-success mb-3"></i>
                <h5 className="fw-bold">Thanh toán dễ dàng</h5>
                <p className="text-muted">
                  Hỗ trợ nhiều hình thức thanh toán an toàn, tiện lợi.
                </p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="p-4 bg-white shadow-sm rounded-4 h-100 hover-card">
                <i className="bi bi-phone display-4 text-success mb-3"></i>
                <h5 className="fw-bold">Sản phẩm đa dạng</h5>
                <p className="text-muted">
                  Hàng trăm mẫu điện thoại chính hãng cho bạn lựa chọn.
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center fw-bold text-success mb-4">
            🔥 Sản phẩm nổi bật
          </h2>

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

          {/* Products Display */}
          {!loading && !error && (
          <Row>
            {featuredProducts.map((product) => (
              <Col md={4} key={product.id} className="mb-4">
                <Card className="product-card shadow-sm border-0 h-100 rounded-4">
                  <div className="product-image-container bg-light">
                    <img
                      src={product.image_path}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="overlay">
                      <Link
                        to={`/product/${product.id}`}
                        className="btn btn-success fw-bold"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold text-dark">
                      {product.name}
                    </Card.Title>
                    <Card.Text className="text-danger fw-bold fs-5">
                      {product.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          )}
          <div className="text-center mt-4">
            <Link to="/products" className="btn btn-outline-success px-4">
              Xem thêm sản phẩm →
            </Link>
          </div>
        </div>
      </section>

      {/* PROMOTION BANNER */}
      <section className="promo-section py-5 text-center text-white">
        <div className="container">
          <h2 className="fw-bold mb-3">🎉 Ưu đãi đặc biệt trong tháng!</h2>
          <p className="lead mb-4">
            Giảm ngay <strong>20%</strong> cho các dòng iPhone 17 Series mới
            nhất.
          </p>
          <Link to="/products" className="btn btn-light fw-bold px-4">
            Mua ngay
          </Link>
        </div>
      </section>

      {/* BRAND LOGOS */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h4 className="fw-bold text-success mb-4">Thương hiệu nổi bật</h4>
          <div className="d-flex justify-content-center align-items-center flex-wrap gap-4">
            <img src="/image/apple.jpg" height="50" alt="Apple" />
            <img src="/image/samsung.jpg" height="50" alt="Samsung" />
            <img src="/image/xiaomi.jpg" height="50" alt="Xiaomi" />
            <img src="/image/oppo.jpg" height="50" alt="Oppo" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
