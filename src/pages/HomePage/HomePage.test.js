import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios'; // Mock axios for API calls
import HomePage from './HomePage';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Create mock data for carousel and latest products
const mockCarouselData = [
  {
    id: 1,
    name: 'Carousel Item 1',
    description: 'Description of Carousel Item 1',
    imageUrl: 'carousel-image-1.jpg',
  },
  // Add more carousel items if needed
];

const mockLatestProductsData = [
  {
    id: 101,
    name: 'Latest Product 1',
    thumbnailUrl: 'thumbnail-1.jpg',
    maxRetailPrice: 20,
  },
  // Add more latest products if needed
];

// Mock the API call for carousel and latest products
mockedAxios.get.mockResolvedValueOnce({ data: mockCarouselData });
mockedAxios.get.mockResolvedValueOnce({ data: mockLatestProductsData })

describe('HomePage', () => {
  it('should display the "Latest Products" heading', () => {
    render(<HomePage />);
    const latestProductsHeading = screen.getByText(/Latest Products/i);
    expect(latestProductsHeading).toBeInTheDocument();
  });
  
  it('renders the carousel with items', async () => {
    render(<HomePage />);
    
    // Check if carousel items are rendered
    for (const carouselItem of mockCarouselData) {
      const carouselItemTitle = screen.getByText(carouselItem.name);
      expect(carouselItemTitle).toBeInTheDocument();
    }
  });

  it('renders the latest products section with items', async () => {
    render(<HomePage />);
    
    // Check if latest products are rendered
    for (const latestProduct of mockLatestProductsData) {
      const latestProductTitle = screen.getByText(latestProduct.name);
      expect(latestProductTitle).toBeInTheDocument();
    }
  });
});

