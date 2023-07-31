import { render } from '@testing-library/react';
import Header from './Header';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

describe('Header', () => {
  it('render the header with logo', () => {
    const { getByAltText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </HelmetProvider>
    );
    const logoImage = getByAltText('Logo');
    expect(logoImage).toBeInTheDocument();
  });
  it('renders the search input and button', () => {
    const { getByPlaceholderText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </HelmetProvider>
    );
    const searchInput = getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });
});
