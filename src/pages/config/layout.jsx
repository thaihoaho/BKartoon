import React from 'react';
import { Header } from '../../components/Header/Header';
import { Sidebar } from '../../components/Sidebar/SideBar';
import styles from './layout.module.css';

export default function FilmManagementLayout({ children }) {
  return (
    <div className={styles.layout}>
      <Header userName="Đỗ Tiến Dũng" />
      <div className={styles.content}>
        <Sidebar />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}


