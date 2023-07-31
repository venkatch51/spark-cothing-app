import React from 'react';
import { render } from '@testing-library/react';
import MenuItem from './MenuItem';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';

describe('MenuItem', () => {
  const testProps = {
    name: 'Home',
    path: '/'
  };

  it('renders the MenuItem correctly', () => {
    const { getByText } = render(
      <HelmetProvider>
        <MemoryRouter>
          <MenuItem {...testProps} />
        </MemoryRouter>
      </HelmetProvider>
    );
    const menuItemLink = getByText(testProps.name);
    expect(menuItemLink).toBeInTheDocument();
  });
});
