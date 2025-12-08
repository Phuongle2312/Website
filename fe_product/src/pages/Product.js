import React, { useContext, useState, useEffect } from "react"; // Thêm useState, useEffect
import { useParams, Link, useNavigate } from "react-router-dom";
// import productData from "../data/Productdata.json"; // XÓA dòng này
import { CartContext } from "../context/CartContext";
import { Row, Col, Card, Button, Table, Badge } from "react-bootstrap";
import "./Product.css";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  // 1. Khởi tạo State để lưu dữ liệu lấy từ API
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Gọi API khi component được load
  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => console.error("Lỗi kết nối:", err));
  }, [id]);

  if (loading)
    return <h2 className="text-center mt-5">⏳ Đang tải dữ liệu...</h2>;

  if (!product) {
    return (
      <h2 className="text-center text-danger mt-5">
        ❌ Không tìm thấy sản phẩm!
      </h2>
    );
  }

  // Lưu ý: Cần sửa lại các trường dữ liệu khớp với SQL (Ví dụ: image -> ImageURL)
  // SQL trả về: ProductName, Price, ImageURL, Description

  // Giả lập thông số kỹ thuật (Giữ nguyên hoặc cũng đưa vào Database nếu cần)
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
            {/* Sửa product.image thành product.ImageURL theo SQL */}
            <img
              src={product.ImageURL}
              alt={product.ProductName}
              className="img-fluid rounded-4 mb-3"
              style={{ maxHeight: "400px", objectFit: "contain" }}
            />
          </Card>
        </Col>

        <Col md={6}>
          {/* Sửa product.name thành product.ProductName */}
          <h2 className="fw-bold text-success">{product.ProductName}</h2>

          {/* Format lại giá tiền vì SQL trả về số */}
          <h4 className="text-danger fw-bold mb-2">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.Price)}
          </h4>

          <p className="text-muted">{product.Description}</p>

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
