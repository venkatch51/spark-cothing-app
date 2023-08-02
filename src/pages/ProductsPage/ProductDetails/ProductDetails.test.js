import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import axios from 'axios';
import ProductDetails from './ProductDetails';
// import ReviewForm from './ReviewForm/ReviewForm';

// Mock axios to prevent actual network requests
jest.mock('axios');

// Test suite for the ProductDetails component
describe('ProductDetails', () => {
  // Mock product data for tests
  const mockProduct = {
    id: '1',
    name: 'Product 1',
    description: 'This is product 1',
    category: 'Category 1',
    maxRetailPrice: 10.0,
    imageUrl: 'http://example.com/product1.jpg'
  };

  // Mock reviews data for tests
  const mockReviews = [
    { id: '1', productId: '1', name: 'User 1', message: 'Review 1' },
    { id: '2', productId: '2', name: 'User 2', message: 'Review 2' }
  ];

  // Helper function to render the ProductDetails component
  const renderProductDetails = () => {
    // Mock axios GET requests
    axios.get.mockResolvedValueOnce({ data: mockProduct });
    axios.get.mockResolvedValueOnce({ data: mockReviews });

    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Route path="/products/:id" component={ProductDetails} />
      </MemoryRouter>
    );
  };

  // Test case: checking if the product details are rendered correctly after API calls
  test('renders product details correctly after API calls', async () => {
    renderProductDetails();

    // Wait for the API calls to resolve and product details to be rendered
    await waitFor(() => {
      expect(screen.getByText(`Name: ${mockProduct.name}`)).toBeInTheDocument();
      expect(screen.getByText(`description: ${mockProduct.description}`)).toBeInTheDocument();
      expect(screen.getByText(`Category: ${mockProduct.category}`)).toBeInTheDocument();
      expect(screen.getByText(`PRICE: ${mockProduct.maxRetailPrice}`)).toBeInTheDocument();
      expect(screen.getByRole('img', { src: mockProduct.imageUrl })).toBeInTheDocument();
    });

    // Check if the review details are rendered
    expect(screen.getByText('Review Comments')).toBeInTheDocument();
    expect(screen.getByText(`${mockReviews[0].name}: ${mockReviews[0].message}`)).toBeInTheDocument();
    expect(screen.queryByText(`${mockReviews[1].name}: ${mockReviews[1].message}`)).not.toBeInTheDocument();
  });

  // Test case: checking if the "Add to Cart" button is rendered and clickable
  test('renders and clicks "Add to Cart" button', async () => {
    renderProductDetails();

    // Wait for the API calls to resolve and product details to be rendered
    await waitFor(() => {
      expect(screen.getByText(`Name: ${mockProduct.name}`)).toBeInTheDocument();
    });

    const addToCartButton = screen.getByText('Add to Cart');

    // Check if the button is rendered and clickable
    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton).toBeEnabled();

    // Simulate a click on the "Add to Cart" button
    fireEvent.click(addToCartButton);

    // Add any additional assertions as needed for the "Add to Cart" functionality
  });

  // Test case: checking if the "Write a review" button opens the review form modal
  test('opens the review form modal when "Write a review" button is clicked', async () => {
    renderProductDetails();

    // Wait for the API calls to resolve and product details to be rendered
    await waitFor(() => {
      expect(screen.getByText(`Name: ${mockProduct.name}`)).toBeInTheDocument();
    });

    const writeReviewButton = screen.getByText('Write a review');

    // Check if the button is rendered and clickable
    expect(writeReviewButton).toBeInTheDocument();
    expect(writeReviewButton).toBeEnabled();

    // Simulate a click on the "Write a review" button
    fireEvent.click(writeReviewButton);

    // Wait for the review form modal to appear
    await waitFor(() => {
      expect(screen.getByText('Write a Review')).toBeInTheDocument();
    });

    // Check if the ReviewForm component is rendered in the modal
    expect(screen.getByTestId('review-form')).toBeInTheDocument();
  });
});
