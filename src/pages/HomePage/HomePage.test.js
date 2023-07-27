import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';

it('should display the "Latest Products" heading', () => {
  render(<HomePage />);
  const latestProductsHeading = screen.getByText(/Latest Products/i);
  expect(latestProductsHeading).toBeInTheDocument();
});
