import React from 'react';
import { render } from '@testing-library/react';
import MenuList from './MenuList';
import { MemoryRouter } from 'react-router-dom';

describe('MenuList', () => {
  it('renders the menu items correctly', () => {
    const { getByText } = render(
      <MemoryRouter>
        <MenuList />
      </MemoryRouter>
    );
    const homeLink = getByText('Home');
    const productsLink = getByText('products');
    const aboutLink = getByText('About');
    const contactLink = getByText('contact');

    expect(homeLink).toBeInTheDocument();
    expect(productsLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });
});
