import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProductProvider, ProductContext } from './ProductProvider';
import productReducer from '../reducers/productReducer';

// Test suite for the ProductProvider component
describe('ProductProvider', () => {
  // Test case: rendering the component without crashing
  test('renders without crashing', () => {
    render(
      <ProductProvider>
        <div>Child component</div>
      </ProductProvider>
    );
  });

  // Test case: checking if the context provider value is correct
  test('provides the correct context value', () => {
    const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    const { container } = render(
      <ProductProvider>
        <ProductContext.Consumer>
          {(contextValue) => (
            <>
              <div data-testid="products">{JSON.stringify(contextValue.products)}</div>
              <div data-testid="dispatch">{typeof contextValue.dispatch}</div>
            </>
          )}
        </ProductContext.Consumer>
      </ProductProvider>
    );

    // Check if the products value in context is an empty array by default
    expect(screen.getByTestId('products')).toHaveTextContent('[]');

    // Mock dispatch action to update the products value in context
    const mockDispatch = jest.fn((action) => {
      if (action.type === 'ADD_PRODUCT') {
        return [...mockProducts];
      }
    });

    // Re-render the component with the mock dispatch function
    render(
      <ProductProvider>
        <ProductContext.Consumer>
          {(contextValue) => (
            <>
              <div data-testid="products">{JSON.stringify(contextValue.products)}</div>
              <div data-testid="dispatch">{typeof contextValue.dispatch}</div>
            </>
          )}
        </ProductContext.Consumer>
      </ProductProvider>,
      { container }
    );

    // Check if the dispatch function in context is of type function
    expect(screen.getByTestId('dispatch')).toHaveTextContent('function');

    // Trigger a dispatch action to update the products value in context
    const action = { type: 'ADD_PRODUCT', payload: { id: 1, name: 'Product 1' } };
    const contextValue = { products: [], dispatch: mockDispatch };
    productReducer(contextValue.products, action);

    // Check if the products value in context is updated correctly after dispatch
    expect(screen.getByTestId('products')).toHaveTextContent(JSON.stringify(mockProducts));
  });
});
