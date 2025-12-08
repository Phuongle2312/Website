import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "./Services.css";

const Services = () => {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true }); // Hiệu ứng 1 giây, chỉ chạy 1 lần
  }, []);

  const services = [
    {
      icon: "🚚",
      title: "Giao hàng nhanh",
      desc: "Chúng tôi giao hàng toàn quốc trong 24h, an toàn và đúng hẹn.",
    },
    {
      icon: "💬",
      title: "Hỗ trợ 24/7",
      desc: "Đội ngũ hỗ trợ trực tuyến luôn sẵn sàng phục vụ bạn mọi lúc.",
    },
    {
      icon: "🛡️",
      title: "Bảo hành chính hãng",
      desc: "Tất cả sản phẩm được bảo hành 1 đổi 1 trong 12 tháng.",
    },
  ];

  return (
    <>
      <div className="container py-5">
        <h1
          className="text-center text-success fw-bold mb-5"
          data-aos="fade-down"
        >
          💼 Dịch vụ của chúng tôi
        </h1>

        <div className="row g-4 justify-content-center">
          {services.map((service, index) => (
            <div
              className="col-md-4 col-sm-6"
              key={index}
              data-aos="zoom-in"
              data-aos-delay={index * 200}
            >
              <div className="service-card shadow-sm text-center p-4 rounded-4 h-100">
                <div className="display-5 mb-3">{service.icon}</div>
                <h4 className="fw-bold text-success mb-2">{service.title}</h4>
                <p className="text-muted small">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Phần CTA có hiệu ứng --- */}
      <section
        className="cta-section text-center text-white py-5 mt-5"
        data-aos="fade-up"
      >
        <div className="container">
          <h2 className="fw-bold mb-3">
            ✨ Sẵn sàng trải nghiệm dịch vụ tuyệt vời của chúng tôi?
          </h2>
          <p className="mb-4 fs-5">
            Hãy liên hệ ngay để được tư vấn miễn phí và nhận ưu đãi hấp dẫn!
          </p>
          <Link to="/contact" className="btn btn-light btn-lg fw-bold px-4">
            Liên hệ ngay 💌
          </Link>
        </div>
      </section>
    </>
  );
};

export default Services;
