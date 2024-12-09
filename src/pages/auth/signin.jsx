import React, { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './signin.module.css';
import login1 from '../../assets/login1.jpg';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/login', {
      email,
      password,
    });
    alert(response.data.message);

    // Kiểm tra role và điều hướng phù hợp
    const role = response.data.user.role;
    if (role === 'admin') {
      navigate('/config'); // Điều hướng đến trang admin
    } else {
      navigate('/home'); // Điều hướng đến trang user
    }
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  }
};

  return (
    <div className={cx('login-container')}>
      <div className={cx('left-side')}>
        <img src={login1} alt="Login user" className={cx('background-image')} />
      </div>
      <div className={cx('right-side')}>
        <h1 className={cx('title')}><span>Chào mừng trở lại</span></h1>
        <form className={cx('login-form')} onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            className={cx('login-input')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={cx('login-input')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className={cx('submit-btn', 'gradient-button')}>
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;