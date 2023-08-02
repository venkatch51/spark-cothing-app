import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductsPage from './ProductsPage';

jest.mock('./Categories/Categories', () => {
  const mockComponent = () => <div>Categories Component</div>;
  return mockComponent;
});
jest.mock('./ProductsList/ProductsList', () => {
  const mockComponent = () => <div>ProductsList Component</div>;
  return mockComponent;
});
jest.mock('react-helmet-async', () => ({
  Helmet: (props) => (
    <>
      <div>Helmet</div>
    </>
  )
}));

describe('ProductsPage', () => {
  it('should have products title', () => {
    render(<ProductsPage />);
    const component = screen.getByText('Categories Component');
    expect(component).toBeInTheDocument();
  });
  it('should have products title 2', () => {
    render(<ProductsPage />);
    const component = screen.getByText('ProductsList Component');
    expect(component).toBeInTheDocument();
  });
});
