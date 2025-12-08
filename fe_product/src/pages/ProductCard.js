import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Image, Table, Alert } from "react-bootstrap";
import { CartContext } from "../context/CartContext";
import products from "../data/Productdata.json";

const ProductCard = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Tính tổng tiền (parse số từ chuỗi)
  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const price =
        parseInt(item.price.replace(/\D/g, "")) * (item.quantity || 1);
      return sum + price;
    }, 0);
  }, [cart]);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("🛒 Giỏ hàng trống!");
      return;
    }
    navigate("/checkout", { state: { cart } });
  };

  // Giảm số lượng sản phẩm
  const decreaseQuantity = (id) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    );
    localStorage.setItem("cart", JSON.stringify(updated));
    window.location.reload(); // reload nhanh để cập nhật
  };

  // Xóa hoàn toàn sản phẩm
  const handleRemove = (id) => {
    removeFromCart(id);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center fw-bold text-success mb-4">
        🧾 Giỏ hàng của bạn
      </h1>

      {cart.length === 0 ? (
        <Alert variant="warning" className="text-center py-4 rounded-4">
          Giỏ hàng trống. <strong>Hãy mua sắm ngay!</strong>
          <div className="mt-3">
            <Button
              variant="success"
              className="rounded-pill px-4"
              onClick={() => navigate("/products")}
            >
              🛍️ Tiếp tục mua sắm
            </Button>
          </div>
        </Alert>
      ) : (
        <>
          <Row className="g-4">
            {cart.map((item) => (
              <Col md={6} lg={4} key={item.id}>
                <Card className="shadow-sm border-0 h-100 rounded-4">
                  <div className="text-center p-3 bg-light rounded-top-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="fw-bold text-success mb-2">
                        {item.name}
                      </Card.Title>
                      <Card.Text className="text-danger fw-bold fs-5">
                        {item.price}
                      </Card.Text>
                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div className="d-flex align-items-center gap-2">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            -
                          </Button>
                          <span className="fw-bold">{item.quantity}</span>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => addToCart(item)}
                          >
                            +
                          </Button>
                        </div>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemove(item.id)}
                        >
                          🗑 Xóa
                        </Button>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Tổng cộng */}
          <Card className="p-4 mt-5 shadow-sm border-0 rounded-4">
            <h4 className="fw-bold text-success mb-3">Tổng kết đơn hàng</h4>
            <Table responsive bordered hover className="mb-4">
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.name}{" "}
                      <span className="text-muted">x{item.quantity}</span>
                    </td>
                    <td className="text-end fw-semibold text-danger">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h4 className="text-end text-success fw-bold">
              Tổng tiền: {total.toLocaleString()}₫
            </h4>
            <div className="d-flex justify-content-between mt-4 flex-wrap gap-2">
              <Button
                variant="outline-secondary"
                className="rounded-pill px-4"
                onClick={() => navigate("/products")}
              >
                ⬅ Tiếp tục mua hàng
              </Button>
              <Button
                variant="success"
                className="rounded-pill px-4"
                onClick={handleCheckout}
              >
                💳 Tiến hành thanh toán
              </Button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
};

export default ProductCard;
