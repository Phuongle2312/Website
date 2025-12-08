import React from "react";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-4 mt-5">
      <div className="container text-center">
        <p className="mb-1">© {new Date().getFullYear()} MyShop.</p>
        <p className="mb-0">
          📞 Hotline:{" "}
          <a
            href="tel:+84986651866"
            className="text-success text-decoration-none"
          >
            0986 651 866
          </a>{" "}
          | ✉️{" "}
          <a
            href="mailto:info@myshop.com"
            className="text-success text-decoration-none"
          >
            info@myshop.com
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
