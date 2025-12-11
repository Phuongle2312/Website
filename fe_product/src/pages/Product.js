import React, { useContext, useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById } from "../services/api";
import { CartContext } from "../context/CartContext";
import { Row, Col, Card, Button, Table, Badge } from "react-bootstrap";
import "./Product.css";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError("Không thể tải thông tin sản phẩm.");
        console.error("Lỗi kết nối:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return <h2 className="text-center mt-5">⏳ Đang tải dữ liệu...</h2>;

  if (error) {
    return (
      <h2 className="text-center text-danger mt-5">
        ❌ {error}
      </h2>
    );
  }

  if (!product) {
    return (
      <h2 className="text-center text-danger mt-5">
        ❌ Không tìm thấy sản phẩm!
      </h2>
    );
  }

  const specs = [
    { label: "Màn hình", value: "OLED 6.7 inch, 120Hz" },
    { label: "Chip xử lý", value: "Snapdragon 8 Gen 3" },
    { label: "RAM", value: "12GB" },
    { label: "Bộ nhớ", value: "256GB" },
  ];

  const handleBuyNow = () => {
    addToCart(product);
    navigate("/checkout", { state: { cart: [product] } });
  };

  return (
    <div className="container my-5 product-detail-page">
      <h1 className="text-center fw-bold text-success mb-4">
        📱 Chi tiết sản phẩm
      </h1>

      <Row className="g-4 align-items-center">
        <Col md={6} className="text-center">
          <Card className="border-0 shadow-sm rounded-4 p-3">
            <img
              src={product.image_url}
              alt={product.name}
              className="img-fluid rounded-4 mb-3"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </Card>
        </Col>

        <Col md={6}>
          <h2 className="fw-bold text-success">{product.name}</h2>

          <h4 className="text-danger fw-bold mb-2">
            {product.price}
          </h4>

          <p className="text-muted">{product.description}</p>

          {/* Các phần còn lại giữ nguyên */}
          <div className="d-flex gap-3 mt-4">
            <Button
              variant="success"
              size="lg"
              onClick={() => addToCart(product)}
            >
              🛒 Thêm vào giỏ
            </Button>
            {/* ... */}
          </div>
        </Col>
      </Row>
      {/* ... Phần bảng thông số và sản phẩm tương tự giữ nguyên (hoặc fetch API tương tự) */}
    </div>
  );
};

export default Product;
