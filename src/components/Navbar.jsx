import React from 'react';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.content}>
                <Link to="/" className={styles.logo}>
                    Food<span className={styles.logoAccent}>Express</span>
                </Link>

                <div className={styles.links}>
                    <Link to="/" className={`${styles.link} ${styles.active}`}>Home</Link>
                    <Link to="/menu" className={styles.link}>Menu</Link>
                    <Link to="/about" className={styles.link}>About</Link>
                </div>

                <div className={styles.actions}>
                    <button className={styles.iconBtn} aria-label="Search">
                        <Search size={20} />
                    </button>
                    <button className={styles.iconBtn} aria-label="Cart">
                        <ShoppingBag size={20} />
                        <span className={styles.badge}>2</span>
                    </button>
                    <button className={styles.menuBtn} aria-label="Menu">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
