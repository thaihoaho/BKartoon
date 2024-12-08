import React from 'react';
import classNames from 'classnames/bind';
import styles from './NavBar.module.css'; 
import { useNavigate } from 'react-router-dom';

const clx = classNames.bind(styles);

const NavBar = () => {
  const navigate = useNavigate(); 
  const handleNavigation = (path) => {
    navigate(path); 
  };

  return (
    <nav className={clx('navbar')}>
      <div className={clx('logo')}>BKartoon</div>
      <ul className={clx('links')}>
        <li><button onClick={() => handleNavigation('/home')}>Trang chủ</button></li>
        <li><button onClick={() => handleNavigation('/all')}>Tất cả phim</button></li>
        <li><button onClick={() => handleNavigation('/contact')}>Liên hệ</button></li>
        <li><button onClick={() => handleNavigation('/ranking')}>Ranking</button></li>
      </ul>
    </nav>
  );
};

export default NavBar;
