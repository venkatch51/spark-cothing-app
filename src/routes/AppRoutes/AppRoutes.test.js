import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

// Test suite for the AppRoutes component
describe('AppRoutes', () => {
  // Test case: rendering the component without crashing
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <AppRoutes />
      </MemoryRouter>
    );
  });

  // Test case: checking if the Home page is rendered for the root path
  test('renders HomePage component for the root path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  // Test case: checking if the About page is rendered for the '/about' path
  test('renders AboutPage component for the "/about" path', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('About Page')).toBeInTheDocument();
  });

  // Test case: checking if the Products page is rendered for the '/products' path
  test('renders ProductsPage component for the "/products" path', () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Products Page')).toBeInTheDocument();
  });

  // Test case: checking if the Contact page is rendered for the '/contact' path
  test('renders ContactPage component for the "/contact" path', () => {
    render(
      <MemoryRouter initialEntries={['/contact']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Contact Page')).toBeInTheDocument();
  });

  // Test case: checking if the ProductDetails page is rendered for the '/products/:id' path
  test('renders ProductDetails component for the "/products/:id" path', () => {
    render(
      <MemoryRouter initialEntries={['/products/10']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Product Details')).toBeInTheDocument();
  });

  // Test case: checking if the PageNotFound component is rendered for an invalid path
  test('renders PageNotFound component for invalid paths', () => {
    render(
      <MemoryRouter initialEntries={['/invalid-path']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
});
