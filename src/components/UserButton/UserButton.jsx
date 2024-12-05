
import React from 'react';
import { User } from 'lucide-react';
import styles from './UserButton.module.css';

export function UserButton({ userName }) {
  return (
    <div className={styles.userButton}>
      <button className={styles.button}>
        <User className={styles.userIcon} />
        <span>{userName}</span>
      </button>
      <div className={styles.dropdown}>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{userName}</p>
          <p className={styles.userEmail}>user@example.com</p>
        </div>
        <hr className={styles.separator} />
        <button className={styles.logoutButton}>Đăng xuất</button>
      </div>
    </div>
  );
}