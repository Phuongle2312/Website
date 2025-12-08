import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import Aos from "aos";
import "aos/dist/aos.css";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page container my-5">
      <h1 className="text-center fw-bold text-success mb-4" data-aos="fade-up">
        Liên hệ với chúng tôi
      </h1>

      <div className="row g-4" data-aos="fade-up">
        {/* --- Thông tin liên hệ --- */}
        <div className="col-md-5">
          <h4 className="fw-bold mb-3">Thông tin</h4>
          <p>
            <FaMapMarkerAlt className="me-2 text-success" /> 123 Trần Hưng Đạo,
            TP Hà Nội
          </p>
          <p>
            <FaEnvelope className="me-2 text-success" />{" "}
            letriphuong23.12@gmail.com
          </p>
          <p>
            <FaPhone className="me-2 text-success" /> 0986 651 866
          </p>
          <div className="d-flex gap-3 mt-3">
            <FaFacebook size={30} className="text-primary" />
            <FaInstagram size={30} className="text-danger" />
          </div>
        </div>

        {/* --- Form liên hệ --- */}
        <div className="col-md-7">
          <form
            onSubmit={handleSubmit}
            className="p-4 border rounded-4 shadow-sm bg-light"
          >
            <div className="mb-3">
              <label className="form-label fw-semibold">Họ tên</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Tin nhắn</label>
              <textarea
                className="form-control"
                name="message"
                rows="4"
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-success w-100 fw-bold py-2"
            >
              Gửi ngay
            </button>
          </form>
        </div>
      </div>

      {/* --- CTA cuối trang --- */}
      <div
        className="contact-cta text-center bg-success text-white py-5 mt-5 rounded-4"
        data-aos="zoom-in"
      >
        <h2 className="fw-bold mb-3">
          Bạn cần tư vấn sản phẩm hoặc hỗ trợ kỹ thuật?
        </h2>
        <p className="mb-4">Đội ngũ của chúng tôi sẵn sàng giúp bạn 24/7!</p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <a href="tel:0123456789" className="btn btn-light fw-bold px-4 py-2">
            📞 Gọi ngay
          </a>
          <a
            href="/register"
            className="btn btn-outline-light fw-bold px-4 py-2"
          >
            ✉️ Đăng ký nhận tư vấn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
