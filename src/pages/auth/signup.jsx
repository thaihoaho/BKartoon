import React, { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import styles from './signup.module.css';

const cx = classNames.bind(styles);

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Khởi tạo hàm điều hướng

  const handleSignup = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu mật khẩu và xác nhận mật khẩu khớp
    if (password !== confirmPassword) {
      alert('Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name,
        email,
        password,
      });

      alert(response.data.message); // Hiển thị thông báo khi đăng ký thành công

      // Chuyển hướng đến trang đăng nhập
      navigate('/signin/user');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message); // Hiển thị lỗi từ server
      } else {
        alert('Có lỗi xảy ra. Vui lòng thử lại!');
      }
    }
  };

  return (
    <div className={cx('login-container')}>
      <div className={cx('left-side')}>
        <img src="src/assets/login.jpg" alt="Signup illustration" className={cx('login-image')} />
      </div>
      <div className={cx('right-side')}>
        <h1 className={cx('title')}>Tạo tài khoản</h1>
        <form className={cx('login-form')} onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Tên người dùng"
            className={cx('login-input')}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className={cx('login-input')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            className={cx('login-input')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Xác nhận mật khẩu"
            className={cx('login-input')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className={cx('submit-btn', 'gradient-button')}>
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
