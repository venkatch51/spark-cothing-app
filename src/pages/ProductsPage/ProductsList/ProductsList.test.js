import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductsList from './ProductsList';
import { ProductContext } from '../../../contexts/ProductContext';
import axios from 'axios';

jest.mock('axios');

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();
const mockLocation = {
  pathname: '/products',
  search: ''
};

describe('ProductsList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial state', () => {
    const { getByLabelText } = render(
      <ProductContext.Provider value={{ products: [], dispatch: mockDispatch }}>
        <ProductsList navigate={mockNavigate} location={mockLocation} />
      </ProductContext.Provider>
    );

    expect(getByLabelText('Sort by:').value).toBe('lowToHigh');
  });

  it('fetches products and dispatches correct action on mount', async () => {
    axios.get.mockResolvedValueOnce({ data: ['product1', 'product2'] });
    render(
      <ProductContext.Provider value={{ products: [], dispatch: mockDispatch }}>
        <ProductsList navigate={mockNavigate} location={mockLocation} />
      </ProductContext.Provider>
    );

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3100/products');
    await new Promise((resolve) => setImmediate(resolve));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'LIST_PRODUCTS',
      payload: ['product1', 'product2']
    });
  });

  it('updates sortingPreference state on sorting select change', () => {
    const { getByLabelText, rerender } = render(
      <ProductContext.Provider value={{ products: [], dispatch: mockDispatch }}>
        <ProductsList navigate={mockNavigate} location={mockLocation} />
      </ProductContext.Provider>
    );

    fireEvent.change(getByLabelText('Sort by:'), { target: { value: 'highToLow' } });
    rerender(
      <ProductContext.Provider value={{ products: [], dispatch: mockDispatch }}>
        <ProductsList navigate={mockNavigate} location={mockLocation} />
      </ProductContext.Provider>
    );
    expect(getByLabelText('Sort by:').value).toBe('highToLow');
  });

  it('calls handleSortingChange with correct event on sorting select change', () => {
    const handleSortingChange = jest.spyOn(
      ProductsList.prototype,
      'handleSortingChange'
    );
    const { getByLabelText } = render(
      <ProductContext.Provider value={{ products: [], dispatch: mockDispatch }}>
        <ProductsList navigate={mockNavigate} location={mockLocation} />
      </ProductContext.Provider>
    );

    fireEvent.change(getByLabelText('Sort by:'), { target: { value: 'highToLow' } });
    expect(handleSortingChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: 'highToLow' } })
    );
  });

  it('sorts products correctly on sortProducts call', () => {
    const products = [
      { id: 1, maxRetailPrice: 100 },
      { id: 2, maxRetailPrice: 200 },
      { id: 3, maxRetailPrice: 300 }
    ];
    const { getByLabelText, getAllByTestId } = render(
      <ProductContext.Provider value={{ products, dispatch: mockDispatch }}>
        <ProductsList navigate={mockNavigate} location={mockLocation} />
      </ProductContext.Provider>
    );

    fireEvent.change(getByLabelText('Sort by:'), { target: { value: 'highToLow' } });
    expect(getAllByTestId('product-price')[0].textContent).toBe('300INR');
    expect(getAllByTestId('product-price')[1].textContent).toBe('200INR');
    expect(getAllByTestId('product-price')[2].textContent).toBe('100INR');

    fireEvent.change(getByLabelText('Sort by:'), { target: { value: 'lowToHigh' } });
    expect(getAllByTestId('product-price')[0].textContent).toBe('100INR');
    expect(getAllByTestId('product-price')[1].textContent).toBe('200INR');
    expect(getAllByTestId('product-price')[2].textContent).toBe('300INR');
  });
});
