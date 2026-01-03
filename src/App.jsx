import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './features/home/HomePage';
import MenuPage from './features/menu/MenuPage';
import ProductDetailsPage from './features/product/ProductDetailsPage';
import CartPage from './features/cart/CartPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="/cart" element={<CartPage />} />
            {/* Add more routes as we build features */}
          </Routes>
        </MainLayout>
      </Router>
    </CartProvider>
  );
}

export default App;
