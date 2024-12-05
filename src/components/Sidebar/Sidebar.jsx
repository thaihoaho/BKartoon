import React from 'react';
import { Film, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const location = useLocation();

  const routes = [
    {
      label: "Thêm phim",
      icon: PlusCircle,
      href: "/config/addfilm",
      color: styles.iconSky
    },
    {
      label: "Cập nhật phim", 
      icon: Pencil,
      href: "/config/updatefilm",
      color: styles.iconViolet
    },
    {
      label: "Xóa phim",
      icon: Trash2,
      href: "/config/deletefilm",
      color: styles.iconPink
    },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Film className={styles.filmIcon} />
          <h2 className={styles.title}>Quản lý phim</h2>
        </div>
        <nav className={styles.nav}>
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={styles.link}
            >
              <button
                className={`${styles.button} ${location.pathname === route.href ? styles.active : ''}`}
              >
                <route.icon className={`${styles.icon} ${route.color}`} />
                {route.label}
              </button>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function MobileSidebar({ isOpen, onClose }) {
  return (
    <div className={`${styles.mobileSidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.overlay} onClick={onClose}></div>
      <div className={styles.content}>
        <Sidebar />
      </div>
    </div>
  );
}
