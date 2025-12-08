import React, { useContext, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Card, Table, Row, Col, Alert } from "react-bootstrap";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, clearCart } = useContext(CartContext);
  const [discount, setDiscount] = useState(0);
  const [code, setCode] = useState("");
  const [shipping] = useState(30000); // Phí ship cố định 30.000₫
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Nếu chuyển sang từ giỏ hàng
  const currentCart = location.state?.cart || cart;

  // Tính tổng tiền
  const total = useMemo(() => {
    return currentCart.reduce((sum, item) => {
      const price =
        parseInt(item.price.replace(/\D/g, "")) * (item.quantity || 1);
      return sum + price;
    }, 0);
  }, [currentCart]);

  const finalTotal = total - discount + shipping;

  // Áp mã giảm giá
  const handleApplyCode = () => {
    if (code.toLowerCase() === "myshop10") {
      setDiscount(total * 0.1);
      alert("🎉 Mã giảm giá hợp lệ! Giảm 10% tổng đơn hàng.");
    } else {
      alert("❌ Mã không hợp lệ!");
      setDiscount(0);
    }
  };

  // Thanh toán thành công
  const handlePayment = (e) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 2500);
  };

  if (currentCart.length === 0) {
    return (
      <Alert variant="warning" className="text-center py-5 my-5 rounded-4">
        🛍️ Giỏ hàng trống. Hãy quay lại <strong>mua hàng</strong> để thanh toán!
        <div className="mt-3">
          <Button variant="success" onClick={() => navigate("/products")}>
            ⬅ Quay lại cửa hàng
          </Button>
        </div>
      </Alert>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center fw-bold text-success mb-5">
        💳 Thanh toán đơn hàng
      </h1>

      {orderSuccess ? (
        <Alert variant="success" className="text-center py-5 rounded-4 fs-5">
          ✅ <strong>Thanh toán thành công!</strong> Cảm ơn bạn đã mua hàng tại{" "}
          <span className="text-success">MyShop</span>.<br />
          Bạn sẽ được chuyển về trang chủ trong giây lát...
        </Alert>
      ) : (
        <Row className="g-4">
          {/* --- Cột trái: Thông tin giao hàng --- */}
          <Col md={7}>
            <Card className="p-4 shadow-sm border-0 rounded-4 bg-light">
              <h4 className="fw-bold mb-3 text-success">
                🧍‍♂️ Thông tin giao hàng
              </h4>
              <Form onSubmit={handlePayment}>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập họ và tên"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Nhập số điện thoại"
                    pattern="[0-9]{10}"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Nhập email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Địa chỉ giao hàng</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập địa chỉ nhận hàng"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Ghi chú (tùy chọn)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Ví dụ: Gọi trước khi giao hàng..."
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Phương thức thanh toán</Form.Label>
                  <Form.Select required>
                    <option value="">-- Chọn phương thức --</option>
                    <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                    <option value="bank">Chuyển khoản ngân hàng</option>
                    <option value="momo">Ví MoMo</option>
                  </Form.Select>
                </Form.Group>

                <Button
                  type="submit"
                  variant="success"
                  className="w-100 rounded-pill py-2 fw-bold"
                >
                  ✅ Xác nhận đặt hàng
                </Button>
              </Form>
            </Card>
          </Col>

          {/* --- Cột phải: Tóm tắt đơn hàng --- */}
          <Col md={5}>
            <Card className="p-4 shadow-sm border-0 rounded-4">
              <h4 className="fw-bold text-success mb-3">🧾 Tóm tắt đơn hàng</h4>

              <Table responsive bordered hover className="mb-3">
                <tbody>
                  {currentCart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          width="50"
                          className="me-2 rounded"
                        />
                        {item.name}{" "}
                        <span className="text-muted">x{item.quantity}</span>
                      </td>
                      <td className="text-end text-danger fw-semibold">
                        {item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="d-flex justify-content-between fw-semibold mb-2">
                <span>Tạm tính:</span>
                <span>{total.toLocaleString()}₫</span>
              </div>
              <div className="d-flex justify-content-between text-muted mb-2">
                <span>Phí vận chuyển:</span>
                <span>{shipping.toLocaleString()}₫</span>
              </div>
              <div className="d-flex justify-content-between text-danger mb-2">
                <span>Giảm giá:</span>
                <span>-{discount.toLocaleString()}₫</span>
              </div>

              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5 text-success mb-3">
                <span>Tổng cộng:</span>
                <span>{finalTotal.toLocaleString()}₫</span>
              </div>

              {/* Mã giảm giá */}
              <Form className="d-flex mb-3">
                <Form.Control
                  type="text"
                  placeholder="Nhập mã giảm giá..."
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <Button
                  variant="outline-success"
                  className="ms-2"
                  onClick={handleApplyCode}
                  type="button"
                >
                  Áp dụng
                </Button>
              </Form>

              <Alert variant="light" className="text-center small text-muted">
                💡 Nhập mã <strong>MYSHOP10</strong> để được giảm 10%
              </Alert>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Checkout;
