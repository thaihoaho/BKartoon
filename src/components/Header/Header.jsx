import React from 'react';
import { UserButton } from '../UserButton/UserButton';
import { MenuIcon } from 'lucide-react';
import styles from './Header.module.css';

export function Header({ onMenuClick, userName }) {
  return (
    <header className={styles.header}>
      <button className={styles.menuButton} onClick={onMenuClick}>
        <MenuIcon className={styles.menuIcon} />
        <span className={styles.srOnly}>Toggle menu</span>
      </button>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Đánh giá phim</h1>
      </div>
      <UserButton userName={userName} />
    </header>
  );
}