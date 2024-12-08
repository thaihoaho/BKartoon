import React from 'react';
import classNames from 'classnames/bind';
import styles from './role.module.css';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Role = () => {
  const navigate = useNavigate();

  return (
    <div className={cx('role-container')}>
      <div className={cx('left-side')}>
        <img src="src/assets/login.jpg" alt="Role-user" className={cx('background-image')} />
      </div>
      <div className={cx('right-side')}>
        <h1 className={cx('title')}>
          <span>Chọn vai trò của bạn</span>
        </h1>
        <div className={cx('role-options')}>
          <button
            className={cx('role-button')}
            onClick={() => navigate('/signin/admin')}
          >
            <div className={cx('role-icon')}>👑</div>
            <span className={cx('role-label')}>Admin</span>
          </button>
          <button
            className={cx('role-button')}
            onClick={() => navigate('/signin/user')}
          >
            <div className={cx('role-icon')}>👤</div>
            <span className={cx('role-label')}>User</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Role;