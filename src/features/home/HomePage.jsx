import React from 'react';
import HeroSection from './components/HeroSection';
import CategoryList from './components/CategoryList';
import RestaurantGrid from './components/RestaurantGrid';
import { categories, restaurants } from './data/mockData';

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <CategoryList categories={categories} />
            <RestaurantGrid restaurants={restaurants} />
        </div>
    );
};

export default HomePage;
