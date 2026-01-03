import React from 'react';
import HeroSection from './components/HeroSection';
import InspirationSection from './components/InspirationSection';
import TopBrands from './components/TopBrands';
import CategoryList from './components/CategoryList';
import { categories } from './data/mockData';

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <InspirationSection />
            <TopBrands />
        </div>
    );
};

export default HomePage;
