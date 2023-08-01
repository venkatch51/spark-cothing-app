import { render } from '@testing-library/react';
import ProductsPage from './ProductsPage';
import { HelmetProvider } from 'react-helmet-async';
import { ProductContext } from '../../contexts/ProductContext';
import { MemoryRouter } from 'react-router-dom';

describe('ProductsPage', () => {
  const dispatch = () => {};
  it('should have products title', () => {
    render(
      <HelmetProvider context={dispatch}>
        <ProductContext.Provider value={{ dispatch }}>
          <MemoryRouter>
            <ProductsPage />
          </MemoryRouter>
        </ProductContext.Provider>
      </HelmetProvider>
    );
    const pageTitle = screen.getByTestId('productstitle');
    expect(pageTitle.textContent).toBe('Products');
  });
});
