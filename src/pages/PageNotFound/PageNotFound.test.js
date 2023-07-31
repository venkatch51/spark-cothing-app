import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter for testing links
import PageNotFound from './PageNotFound';
import { HelmetProvider } from 'react-helmet-async';

describe('PageNotFound', () => {
  it('renders 404 Not Found heading and description', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <PageNotFound />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(getByText('404 Not Found')).toBeInTheDocument();
    expect(
      getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
  });

  it('renders a link to go back to the home page', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <PageNotFound />
        </MemoryRouter>
      </HelmetProvider>
    );
    const homeLink = getByText('Go back to Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.getAttribute('href')).toBe('/'); // Check if the link points to the correct URL
  });
});
