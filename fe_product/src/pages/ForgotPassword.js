import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../services/api';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    setSuccess(false);

    try {
      const response = await forgotPassword(email);
      
      if (response.success) {
        setSuccess(true);
      }
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: error.response?.data?.message || 'Có lỗi xảy ra!' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🔑</div>
          <h2>Quên Mật Khẩu</h2>
          <p>Nhập email để nhận link đặt lại mật khẩu</p>
        </div>

        {success && (
          <div className="alert alert-success">
            <i className="bi bi-check-circle"></i> Link đặt lại mật khẩu đã được gửi!
          </div>
        )}

        {errors.general && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-circle"></i> {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>
              <i className="bi bi-envelope"></i> Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
              className={errors.email ? 'error' : ''}
              required
            />
            {errors.email && <span className="error-text">{errors.email[0]}</span>}
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span> Đang gửi...
              </>
            ) : (
              <>
                <i className="bi bi-send"></i> Gửi link đặt lại
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            <Link to="/login">
              <i className="bi bi-arrow-left"></i> Quay lại đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
