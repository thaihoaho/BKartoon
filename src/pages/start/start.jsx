import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './start.module.css';
import { useNavigate } from 'react-router-dom';

const clx = classNames.bind(styles);

const App = () => {

  const navigate = useNavigate();
  return (

    <div className={clx({ 'dark-mode': true })}>
      <div
        style={{
          backgroundImage: 'url(src/assets/start.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          minHeight: '100vh',

        }}
      >

        <div className={clx('title')}>
          <h1>
            <span>Nền tảng chia sẻ đánh giá  </span><br />
            <span>phim hoạt hình trực tuyến</span>
          </h1>
          <div className={clx('buttons')}>
            <button onClick={() => navigate('/signup')}>Đăng ký</button>
            <button onClick={() => navigate('/role')}>Đăng nhập</button>
          </div>

        </div>


      </div>
    </div>
  );
};

export default App;
