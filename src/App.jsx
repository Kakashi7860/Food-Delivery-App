import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './features/home/HomePage';
import MenuPage from './features/menu/MenuPage';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          {/* Add more routes as we build features */}
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
