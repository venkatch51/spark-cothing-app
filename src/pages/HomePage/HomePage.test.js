import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';
import axios from 'axios';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

// setting up mock for axios
jest.mock('axios');

describe('HomePage', () => {
  it('fetches all products and dispatches correct action on handleClickViewAll', async () => {
    axios.get
      .mockResolvedValueOnce({ data: ['product1', 'product2'] })
      .mockResolvedValueOnce({ data: ['product1', 'product2', 'product3'] });
    const { getByText } = render(<HomePage />);

    fireEvent.click(getByText('View All'));
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3100/products');
    await new Promise((resolve) => setImmediate(resolve));
    expect(getByText('product3')).toBeInTheDocument();
  });
  it('[MOCKING]: fetches carousel items via rest api call', async () => {
    // 1. prepare mock response
    const mockResponse = {
      data: [
        {
          id: 1,
          name: 'The Indian Garage Co Casual Shirt',
          description:
            'White and teal blue striped casual shirt, has a spread collar, long sleeves, button placket, curved hem, and 1 patch pocket',
          imageUrl: '...',
          thumbnailUrl: '...',
          imgAltText: '...',
          maxRetailPrice: 900,
          category: 'Men'
        }
        // Add more mock data items as needed
      ]
    };
    // 2. Resolve the http request with the above mock response
    // 2.1 setup mocks for axios (see before describe block)
    // 2.2 resolve the req
    axios.get.mockResolvedValue(mockResponse);

    // 3. Render the component
    render(
      <HelmetProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </HelmetProvider>
    );
    // 4. Assert for carousel items
    const carouselItemName = await screen.findByTestId('productName');
    expect(carouselItemName.textContent).toBe(
      'The Indian Garage Co Casual Shirt'
    );

    const carouselItemDesc = await screen.findByTestId('productDesc');
    expect(carouselItemDesc.textContent).toBe(
      'White and teal blue striped casual shirt, has a spread collar, long sleeves, button placket, curved hem, and 1 patch pocket'
    );
  });
  it('render the view all button', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </HelmetProvider>
    );
    const viewAllButton = await screen.findByTestId('viewBtn');
    expect(viewAllButton.textContent).toBe('view all');
  });
});
