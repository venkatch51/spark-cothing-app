import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

// Test suite for the Header component
describe('Header', () => {
  // Test case: rendering the component without crashing
  test('renders without crashing', () => {
    render(<Header />);
  });

  // Test case: checking the logo rendering
  test('renders the logo image', () => {
    render(<Header />);
    const logoImage = screen.getByAltText('Logo');
    expect(logoImage).toBeInTheDocument();
  });

  // Test case: checking if the search input field exists
  test('renders the search input field', () => {
    render(<Header />);
    const searchInput = screen.getByPlaceholderText('Search');
    expect(searchInput).toBeInTheDocument();
  });

  // Test case: checking if the search button exists
  test('renders the search button', () => {
    render(<Header />);
    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeInTheDocument();
  });

  // Test case: checking if the MenuList component exists
  test('renders the MenuList component', () => {
    render(<Header />);
    const menuList = screen.getByRole('navigation');
    expect(menuList).toBeInTheDocument();
  });

  // Test case: checking if the search button click handler is called
  test('calls the handleClickSearch function on search button click', () => {
    const handleClickSearchMock = jest.fn();
    render(<Header handleClickSearch={handleClickSearchMock} />);

    const searchButton = screen.getByRole('button', { name: 'Search' });
    fireEvent.click(searchButton);

    expect(handleClickSearchMock).toHaveBeenCalledTimes(1);
  });
});
