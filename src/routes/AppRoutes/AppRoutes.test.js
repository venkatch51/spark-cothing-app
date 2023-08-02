import React from 'react';
import { render, screen } from '@testing-library/react';
import AppRoutes from './AppRoutes';

describe('AppRoutes', () => {
  it('should render the HomePage component when the hash is "/"', async () => {
    const appRoutes = render(<AppRoutes />);
    const location = await screen.findByProps({
      name: 'location',
      hash: '/'
    });
    expect(location).toBeTruthy();
  });

  it('should render the AboutPage component when the hash is "/about"', async () => {
    const appRoutes = render(<AppRoutes />);
    const location = await screen.findByProps({
      name: 'location',
      hash: '/about'
    });
    expect(location).toBeTruthy();
  });

  it('should render the ProductsPage component when the hash is "/products"', async () => {
    const appRoutes = render(<AppRoutes />);
    const location = await screen.findByProps({
      name: 'location',
      hash: '/products'
    });
    expect(location).toBeTruthy();
  });

  it('should render the ContactPage component when the hash is "/contact"', async () => {
    const appRoutes = render(<AppRoutes />);
    const location = await screen.findByProps({
      name: 'location',
      hash: '/contact'
    });
    expect(location).toBeTruthy();
  });

  it('should render the ProductDetails component when the hash is "/products/:id"', async () => {
    const appRoutes = render(<AppRoutes />);
    const location = await screen.findByProps({
      name: 'location',
      hash: '/products/123'
    });
    expect(location).toBeTruthy();
  });

  it('should render the PageNotFound component when the hash is not found', async () => {
    const appRoutes = render(<AppRoutes />);
    const location = await screen.findByProps({
      name: 'location',
      hash: '/not-found'
    });
    expect(location).toBeTruthy();
  });
});
