import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Categories from './Categories';
import { ProductContext } from '../../../contexts/ProductContext';
import axios from 'axios';

jest.mock('axios');

const mockDispatch = jest.fn();

describe('Categories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with initial state', () => {
    const { getByText } = render(
      <ProductContext.Provider value={{ dispatch: mockDispatch }}>
        <Categories />
      </ProductContext.Provider>
    );

    expect(getByText('All')).toHaveClass('active');
    expect(getByText('Men')).not.toHaveClass('active');
    expect(getByText('Women')).not.toHaveClass('active');
    expect(getByText('Kids')).not.toHaveClass('active');
  });

  it('updates currentCategory state on category link click', () => {
    const { getByText, rerender } = render(
      <ProductContext.Provider value={{ dispatch: mockDispatch }}>
        <Categories />
      </ProductContext.Provider>
    );

    fireEvent.click(getByText('Men'));
    rerender(
      <ProductContext.Provider value={{ dispatch: mockDispatch }}>
        <Categories />
      </ProductContext.Provider>
    );
    expect(getByText('All')).not.toHaveClass('active');
    expect(getByText('Men')).toHaveClass('active');

    fireEvent.click(getByText('Women'));
    rerender(
      <ProductContext.Provider value={{ dispatch: mockDispatch }}>
        <Categories />
      </ProductContext.Provider>
    );
    expect(getByText('Men')).not.toHaveClass('active');
    expect(getByText('Women')).toHaveClass('active');

    fireEvent.click(getByText('Kids'));
    rerender(
      <ProductContext.Provider value={{ dispatch: mockDispatch }}>
        <Categories />
      </ProductContext.Provider>
    );
    expect(getByText('Women')).not.toHaveClass('active');
    expect(getByText('Kids')).toHaveClass('active');
  });

  it('calls handleCategoryClick with correct argument on category link click', () => {
    const handleCategoryClick = jest.spyOn(
      Categories.prototype,
      'handleCategoryClick'
    );
    const { getByText } = render(
      <ProductContext.Provider value={{ dispatch: mockDispatch }}>
        <Categories />
      </ProductContext.Provider>
    );

    fireEvent.click(getByText('Men'));
    expect(handleCategoryClick).toHaveBeenCalledWith('Men');

    fireEvent.click(getByText('Women'));
    expect(handleCategoryClick).toHaveBeenCalledWith('Women');

    fireEvent.click(getByText('Kids'));
    expect(handleCategoryClick).toHaveBeenCalledWith('Kids');
  });

  it('makes correct API call and dispatches correct action on handleCategoryClick', async () => {
    axios.get.mockResolvedValueOnce({ data: ['product1', 'product2'] });
    const { getByText } = render(
      <ProductContext.Provider value={{ dispatch: mockDispatch }}>
        <Categories />
      </ProductContext.Provider>
    );

    fireEvent.click(getByText('Men'));
    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:3100/products?category=Men'
    );
    await new Promise((resolve) => setImmediate(resolve));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'FILTER_PRODUCTS',
      payload: ['product1', 'product2']
    });
  });

  it('updates currentCategory state on handleCategoryClick', () => {
    const { getByText, rerender } = render(
      <ProductContext.Provider value={{ dispatch: mockDispatch }}>
        <Categories />
      </ProductContext.Provider>
    );

    fireEvent.click(getByText('Men'));
    rerender(
      <ProductContext.Provider value={{ dispatch: mockDispatch }}>
        <Categories />
      </ProductContext.Provider>
    );
    expect(getByText('All')).not.toHaveClass('active');
    expect(getByText('Men')).toHaveClass('active');
  });

  it('constructs correct queryParams and actionType on handleCategoryClick', () => {
    let queryParams;
    let actionType;
    axios.get.mockImplementation((url) => {
      queryParams = url.split('?')[1];
      return Promise.resolve({ data: [] });
    });
    mockDispatch.mockImplementation((action) => {
      actionType = action.type;
    });
    const { getByText } = render(
      <ProductContext.Provider value={{ dispatch: mockDispatch }}>
        <Categories />
      </ProductContext.Provider>
    );

    fireEvent.click(getByText('Men'));
    expect(queryParams).toBe('category=Men');
    expect(actionType).toBe('FILTER_PRODUCTS');

    fireEvent.click(getByText('All'));
    expect(queryParams).toBeUndefined();
    expect(actionType).toBe('LIST_PRODUCTS');
  });

  it('makes correct API call and dispatches correct action on handleCategoryClick', async () => {
    axios.get.mockResolvedValueOnce({ data: ['product1', 'product2'] });
    const { getByText } = render(
      <ProductContext.Provider value={{ dispatch: mockDispatch }}>
        <Categories />
      </ProductContext.Provider>
    );

    fireEvent.click(getByText('Men'));
    expect(axios.get).toHaveBeenCalledWith(
      'http://localhost:3100/products?category=Men'
    );
    await new Promise((resolve) => setImmediate(resolve));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'FILTER_PRODUCTS',
      payload: ['product1', 'product2']
    });
  });
});
