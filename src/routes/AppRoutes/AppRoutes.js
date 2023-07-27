import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage/HomePage';
import ContactPage from '../../pages/ContactPage/ContactPage';
import ProductsPage from '../../pages/ProductsPage/ProductsPage';
import AboutPage from '../../pages/AboutPage/AboutPage';
import ProductDetails from '../../pages/ProductsPage/ProductDetails/ProductDetails';
import PageNotFound from '../../pages/PageNotFound/PageNotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
