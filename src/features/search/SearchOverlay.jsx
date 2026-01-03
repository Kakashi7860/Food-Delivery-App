import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChefHat, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './SearchOverlay.module.css';

const SearchOverlay = ({ onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ restaurants: [], products: [] });
    const [loading, setLoading] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        const fetchResults = async () => {
            if (query.length < 2) {
                setResults({ restaurants: [], products: [] });
                return;
            }

            setLoading(true);
            try {
                const response = await fetch(`http://127.0.0.1:5001/api/search?q=${query}`);
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error("Search Error:", error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(fetchResults, 300); // 300ms debounce
        return () => clearTimeout(timeoutId);
    }, [query]);

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <Search className={styles.searchIcon} size={24} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search for restaurants, cuisine, or specific dishes..."
                        className={styles.input}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={onClose} className={styles.closeBtn}>
                        <X size={24} />
                    </button>
                </div>

                <div className={styles.content}>
                    {loading && <div className={styles.loading}>Searching...</div>}

                    {!loading && query.length > 1 && results.restaurants.length === 0 && results.products.length === 0 && (
                        <div className={styles.empty}>No results found for "{query}"</div>
                    )}

                    {(results.restaurants.length > 0) && (
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Restaurants</h3>
                            <div className={styles.list}>
                                {results.restaurants.map(r => (
                                    <Link
                                        to={`/restaurants/${r._id}`}
                                        key={r._id}
                                        className={styles.item}
                                        onClick={onClose}
                                    >
                                        <div className={styles.iconBox}><ChefHat size={20} /></div>
                                        <div>
                                            <div className={styles.itemName}>{r.name}</div>
                                            <div className={styles.itemMeta}>{r.cuisine}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {(results.products.length > 0) && (
                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>Dishes</h3>
                            <div className={styles.list}>
                                {results.products.map(p => (
                                    <Link
                                        to={`/product/${p._id}`}
                                        key={p._id}
                                        className={styles.item}
                                        onClick={onClose}
                                    >
                                        <div className={styles.iconBox}><Utensils size={20} /></div>
                                        <div>
                                            <div className={styles.itemName}>{p.name}</div>
                                            <div className={styles.itemMeta}>in {p.restaurant?.name || 'Menu'}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchOverlay;
