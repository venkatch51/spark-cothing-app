import { render } from '@testing-library/react';
import ProductsPage from './ProductsPage';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

describe('ProductsPage', () => {
  it('should have products title', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ProductsPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    const pageTitle = screen.getByTestId('productstitle')
    expect(pageTitle.textContent).toBe('Products')
  });
});
