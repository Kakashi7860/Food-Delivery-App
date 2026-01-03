import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, User, LogOut, Store, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import SearchOverlay from '../features/search/SearchOverlay';
import styles from './Navbar.module.css';

const Navbar = () => {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    return (
        <nav className={styles.navbar}>
            <div className={styles.content}>
                <Link to="/" className={styles.logo}>
                    Food<span className={styles.logoAccent}>Express</span>
                </Link>

                <div className={styles.links}>
                    {user?.role === 'restaurant' ? (
                        <>
                            <Link to="/restaurant/dashboard" className={`${styles.link} ${styles.active}`}>Dashboard</Link>
                            <Link to="/restaurant/add-item" className={styles.link}>Add Item</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/" className={`${styles.link} ${styles.active}`}>Home</Link>
                            <Link to="/menu" className={styles.link}>Menu</Link>
                            <Link to="/about" className={styles.link}>About</Link>
                        </>
                    )}
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.iconBtn}
                        aria-label="Search"
                        onClick={() => setShowSearch(true)}
                    >
                        <Search size={20} />
                    </button>
                    {showSearch && <SearchOverlay onClose={() => setShowSearch(false)} />}
                    {user?.role !== 'restaurant' && (
                        <Link to="/cart" className={styles.iconBtn} aria-label="Cart">
                            <ShoppingBag size={20} />
                            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
                        </Link>
                    )}

                    {user ? (
                        <div className={styles.profileWrapper}>
                            <button
                                className={styles.iconBtn}
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                aria-label="Profile"
                            >
                                <User size={20} />
                            </button>
                            {showProfileMenu && (
                                <div className={styles.profileDropdown}>
                                    <div className={styles.profileHeader}>
                                        <span className={styles.userName}>{user.name}</span>
                                        <span className={styles.userEmail}>{user.email}</span>
                                    </div>
                                    <Link to="/profile" className={styles.dropdownLink} onClick={() => setShowProfileMenu(false)}>
                                        <User size={16} /> My Profile
                                    </Link>
                                    <Link to="/favorites" className={styles.dropdownLink} onClick={() => setShowProfileMenu(false)}>
                                        <Heart size={16} /> My Favorites
                                    </Link>
                                    <Link to="/my-orders" className={styles.dropdownLink} onClick={() => setShowProfileMenu(false)}>
                                        <ShoppingBag size={16} /> My Orders
                                    </Link>
                                    <button onClick={logout} className={styles.logoutBtn}>
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={styles.authWrapper}>
                            <button className={styles.loginBtn}>Login / Sign Up</button>
                            <div className={styles.authDropdown}>
                                <Link to="/login" className={styles.authItem}>
                                    <div className={styles.authIcon}><User size={18} /></div>
                                    <div>
                                        <span className={styles.authTitle}>Customer</span>
                                        <span className={styles.authDesc}>Order food & enjoy</span>
                                    </div>
                                </Link>
                                <Link to="/signup?role=restaurant" className={styles.authItem}>
                                    <div className={styles.authIcon}><Store size={18} /></div>
                                    <div>
                                        <span className={styles.authTitle}>Restaurant</span>
                                        <span className={styles.authDesc}>Manage your menu</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}

                    <button className={styles.menuBtn} aria-label="Menu">
                        <Menu size={24} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
