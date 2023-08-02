import React, { useContext } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ProductContext, ProductProvider } from './ProductContext';

const TestComponent = () => {
  const { products, dispatch } = useContext(ProductContext);

  const handleAddProduct = () => {
    dispatch({ type: 'ADD_PRODUCT', payload: 'product1' });
  };

  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product}>{product}</li>
        ))}
      </ul>
      <button onClick={handleAddProduct}>Add Product</button>
    </>
  );
};

describe('ProductContext', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>
    );

    expect(getByText('Add Product')).toBeInTheDocument();
  });

  it('provides correct initial value for products and dispatch', () => {
    const { queryByText } = render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>
    );

    expect(queryByText('product1')).not.toBeInTheDocument();
  });

  it('updates products state correctly on dispatch', () => {
    const { getByText, queryByText } = render(
      <ProductProvider>
        <TestComponent />
      </ProductProvider>
    );

    fireEvent.click(getByText('Add Product'));
    expect(queryByText('product1')).toBeInTheDocument();
  });
});
