import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register as registerAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await registerAPI(formData);
      
      if (response.success) {
        login(response.user, response.token);
        navigate('/');
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: error.response?.data?.message || 'Đăng ký thất bại!' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <div className="auth-icon">✨</div>
          <h2>Đăng Ký</h2>
          <p>Tạo tài khoản mới để bắt đầu mua sắm!</p>
        </div>

        {errors.general && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-circle"></i> {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label>
                <i className="bi bi-person"></i> Họ và tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nguyễn Văn A"
                className={errors.name ? 'error' : ''}
                required
              />
              {errors.name && <span className="error-text">{errors.name[0]}</span>}
            </div>

            <div className="form-group">
              <label>
                <i className="bi bi-envelope"></i> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className={errors.email ? 'error' : ''}
                required
              />
              {errors.email && <span className="error-text">{errors.email[0]}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <i className="bi bi-telephone"></i> Số điện thoại
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="0123456789"
                className={errors.phone ? 'error' : ''}
              />
              {errors.phone && <span className="error-text">{errors.phone[0]}</span>}
            </div>

            <div className="form-group">
              <label>
                <i className="bi bi-geo-alt"></i> Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Đường ABC"
                className={errors.address ? 'error' : ''}
              />
              {errors.address && <span className="error-text">{errors.address[0]}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <i className="bi bi-lock"></i> Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={errors.password ? 'error' : ''}
                required
              />
              {errors.password && <span className="error-text">{errors.password[0]}</span>}
            </div>

            <div className="form-group">
              <label>
                <i className="bi bi-lock-fill"></i> Xác nhận mật khẩu
              </label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span> Đang xử lý...
              </>
            ) : (
              <>
                <i className="bi bi-person-plus"></i> Đăng ký
              </>
            )}
          </button>
        </form>

        <div className="divider">
          <span>hoặc</span>
        </div>

        <div className="social-login">
          <button className="btn-social btn-google">
            <i className="bi bi-google"></i> Google
          </button>
          <button className="btn-social btn-facebook">
            <i className="bi bi-facebook"></i> Facebook
          </button>
        </div>

        <div className="auth-footer">
          <p>Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
