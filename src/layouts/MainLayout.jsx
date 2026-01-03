import React from 'react';
import Navbar from '../components/Navbar';
import styles from './MainLayout.module.css';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.mainContent}>
        {children}
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2024 Online Food Delivery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
