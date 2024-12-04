import React from 'react';
import classNames from 'classnames/bind';
import styles from './signup.module.css';

const cx = classNames.bind(styles);

const Signup = () => {
  return (
    <div className={cx('login-container')}>
      <div className={cx('left-side')}>
        <img src="src/assets/login.jpg" alt="Signup illustration" className={cx('login-image')} />
      </div>
      <div className={cx('right-side')}>
        <h1 className={cx('title')}>Tạo tài khoản</h1>
        <form className={cx('login-form')}>
          <input type="text" placeholder="Username" className={cx('login-input')} />
          <input type="email" placeholder="Email" className={cx('login-input')} />
          <input type="password" placeholder="Password" className={cx('login-input')} />
          <input type="password" placeholder="Confirm Password" className={cx('login-input')} />
          <button type="submit" className={cx('submit-btn', 'gradient-button')}>
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
