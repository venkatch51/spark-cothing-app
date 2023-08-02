import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ProductsList from './ProductsList';
import { ProductContext } from '../../../contexts/ProductContext';

jest.mock('axios');

const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    description: 'Description 1',
    maxRetailPrice: 100,
    imageUrl: 'image1.jpg'
  },
  {
    id: 2,
    title: 'Product 2',
    description: 'Description 2',
    maxRetailPrice: 200,
    imageUrl: 'image2.jpg'
  }
];

const mockDispatch = jest.fn();

describe('ProductsList', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockProducts });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('updates sorting preference when sort by select element is changed', async () => {
    const { getByLabelText } = render(
      <ProductContext.Provider value={{ products: mockProducts, dispatch: mockDispatch }}>
        <ProductsList />
      </ProductContext.Provider>
    );
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    const sortBySelectElement = getByLabelText('Sort by:');
    expect(sortBySelectElement.value).toBe('lowToHigh');
    fireEvent.change(sortBySelectElement, { target: { value: 'highToLow' } });
    expect(sortBySelectElement.value).toBe('highToLow');
  });

  it('renders products list', async () => {
    const { getByText } = render(
      <ProductContext.Provider value={{ products: mockProducts, dispatch: mockDispatch }}>
        <ProductsList />
      </ProductContext.Provider>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Description 1')).toBeInTheDocument();
    expect(getByText('price: 100INR')).toBeInTheDocument();

    expect(getByText('Product 2')).toBeInTheDocument();
    expect(getByText('Description 2')).toBeInTheDocument();
    expect(getByText('price: 200INR')).toBeInTheDocument();
  });

  it('sorts products by price low to high', async () => {
    const { getByText, getByLabelText } = render(
      <ProductContext.Provider value={{ products: mockProducts, dispatch: mockDispatch }}>
        <ProductsList />
      </ProductContext.Provider>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    fireEvent.change(getByLabelText('Sort by:'), { target: { value: 'lowToHigh' } });

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Description 1')).toBeInTheDocument();
    expect(getByText('price: 100INR')).toBeInTheDocument();

    expect(getByText('Product 2')).toBeInTheDocument();
    expect(getByText('Description 2')).toBeInTheDocument();
    expect(getByText('price: 200INR')).toBeInTheDocument();
  });

  it('sorts products by price high to low', async () => {
    const { getByText, getByLabelText } = render(
      <ProductContext.Provider value={{ products: mockProducts, dispatch: mockDispatch }}>
        <ProductsList />
      </ProductContext.Provider>
    );

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    fireEvent.change(getByLabelText('Sort by:'), { target: { value: 'highToLow' } });

    expect(getByText('Product 2')).toBeInTheDocument();
    expect(getByText('Description 2')).toBeInTheDocument();
    expect(getByText('price: 200INR')).toBeInTheDocument();

    expect(getByText('Product 1')).toBeInTheDocument();
    expect(getByText('Description 1')).toBeInTheDocument();
    expect(getByText('price: 100INR')).toBeInTheDocument();
  });
});
