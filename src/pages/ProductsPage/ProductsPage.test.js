import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductsPage from './ProductsPage';

describe('ProductsPage', () => {
  it('should have products title', () => {
    render(<ProductsPage />)
    const producttitle = screen.getByTestId('productstitle');
    expect(producttitle.textContent).toBe('Products');
  });
});
