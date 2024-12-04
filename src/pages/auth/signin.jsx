import React from 'react';
import classNames from 'classnames/bind';
import styles from './signin.module.css';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className={cx('login-container')}>
      <div className={cx('left-side')}>
        <img src="src/assets/login.jpg" alt="Login illustration" className={cx('login-image')} />
      </div>
      <div className={cx('right-side')}>
        <h1 className={cx('title')}><span>Chào mừng trở lại</span></h1>
        <form className={cx('login-form')}>
          <input type="text" placeholder="Username" className={cx('login-input')} />
          <input type="password" placeholder="Password" className={cx('login-input')} />
          <button 
          // type="submit" 
          className={cx('submit-btn', 'gradient-button')}
            onClick={() => navigate('/home')}
          >
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
