import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import "./Navbar.css";

const NavigationBar = () => {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-success">
          🌿 MyShop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Trang chủ
            </Nav.Link>
            <Nav.Link as={NavLink} to="/products">
              Sản phẩm
            </Nav.Link>
            <Nav.Link as={NavLink} to="/services">
              Dịch vụ
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact">
              Liên hệ
            </Nav.Link>
          </Nav>
          <div className="ms-3 d-flex gap-2">
            <Button
              as={Link}
              to="/product-card"
              variant="outline-success"
              className="rounded-pill custom-btn"
            >
              🛍️ Xem giỏ hàng
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
