import React from 'react';
import { render, waitFor } from '@testing-library/react';
import ProductDetails from './ProductDetails';
import axios from 'axios';

jest.mock('axios');

describe('ProductDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading spinner when product is null', () => {
    const { container } = render(<ProductDetails />);
    expect(container.querySelector('.spinner-border')).toBeInTheDocument();
  });

  it('fetches product details and reviews on mount', async () => {
    axios.get
      .mockResolvedValueOnce({ data: { id: '1', name: 'product1' } })
      .mockResolvedValueOnce({ data: [{ id: '1', message: 'review1' }] });
    const { getByText } = render(<ProductDetails />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3100/products/undefined');
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3100/reviews');
    expect(getByText('Name: product1')).toBeInTheDocument();
    expect(getByText('review1')).toBeInTheDocument();
  });

  it('renders product details correctly when product is not null', async () => {
    axios.get.mockResolvedValueOnce({ data: { id: '1', name: 'product1' } });
    const { getByText } = render(<ProductDetails />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(getByText('Name: product1')).toBeInTheDocument();
  });

  it('renders reviews correctly when reviews are not empty', async () => {
    axios.get
      .mockResolvedValueOnce({ data: { id: '1', name: 'product1' } })
      .mockResolvedValueOnce({ data: [{ id: '1', message: 'review1' }] });
    const { getByText } = render(<ProductDetails />);

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(2));
    expect(getByText('review1')).toBeInTheDocument();
  });
});
