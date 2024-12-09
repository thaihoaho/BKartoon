import React from 'react';
import classNames from 'classnames/bind';
import styles from './NavBar.module.css'; 
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const clx = classNames.bind(styles);

const NavBar = () => {
  const navigate = useNavigate(); 
  const handleNavigation = (path) => {
    navigate(path); 
  };
  const handleLogout = () => {
    // Add your logout logic here
    localStorage.removeItem('user'); // Remove user data from local storage
    navigate('/signin/user'); // Navigate to login page after logout
  };
  return (
    <nav className={clx('navbar')}>
      <div className={clx('logo')}>BKartoon</div>
      <ul className={clx('links')}>
        <li><button onClick={() => handleNavigation('/home')}>Trang chủ</button></li>
        <li><button onClick={() => handleNavigation('/all')}>Tất cả phim</button></li>
        <li><button onClick={() => handleNavigation('/ranking')}>Ranking</button></li>
        <li><button onClick={() => handleNavigation('/ranking')}>Tra cứu</button></li>
        <li><button onClick={() => handleNavigation('/profile')}>Hồ sơ</button></li>
      </ul>
      <button onClick={handleLogout} className={clx('logoutButton')}>
        <LogOut className={clx('logoutIcon')} />
        Đăng xuất
      </button>
    </nav>
  );
};

export default NavBar;
