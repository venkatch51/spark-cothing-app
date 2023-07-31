import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

describe('Footer', () => {
  it('renders Free Shipping section', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(getByText('FREE SHIPPING AND RETURN')).toBeInTheDocument();
    expect(
      getByText('Free shipping on all orders over RS.499')
    ).toBeInTheDocument();
  });

  it('renders Money Back Gurantee section', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(getByText('MONEY BACK GURANTEE')).toBeInTheDocument();
    expect(getByText('100% money back gurantee')).toBeInTheDocument();
  });

  it('renders Online support section', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(getByText('ONLINE SUPPORT 24/7')).toBeInTheDocument();
    expect(getByText('Reach us out anytime')).toBeInTheDocument();
  });

  it('renders MenuList Component', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(getByText('Home')).toBeInTheDocument();
    // Add additional menu items assertions as needed
  });

  it('renders the copyright', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(getByText(/Copyright \d{4} \| MyShop/)).toBeInTheDocument();
  });
});
