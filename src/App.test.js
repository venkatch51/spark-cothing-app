import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mocking child components to avoid external dependencies
jest.mock('./components/Header/Header', () => {
  const mockComponent = () => <div data-testid="header">Header Component</div>
  return mockComponent
});
jest.mock('./components/Footer/Footer', () => {
  const mockComponent = () => <div data-testid="footer">Footer Component</div>
  return mockComponent
});
jest.mock('./containers/ErrorBoundary/ErrorBoundary', () => {
  const mockComponent = ({ children }) => <div data-testid="error-boundary">{children}</div>
  return mockComponent
});
jest.mock('./routes/AppRoutes/AppRoutes', () => {
  const mockComponent = () => <div data-testid="app-routes">AppRoutes Component</div>
  return mockComponent
});

// Test suite for the App component
describe('App', () => {
  // Test case: rendering the App component and its children correctly
  test('renders App component and its children', () => {
    render(<App />);

    // Check if the Header component is rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();

    // Check if the AppRoutes component is rendered
    expect(screen.getByTestId('app-routes')).toBeInTheDocument();

    // Check if the Footer component is rendered
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  // Test case: rendering the ErrorBoundary correctly
  test('renders ErrorBoundary component', () => {
    render(<App />);

    // Check if the ErrorBoundary component is rendered
    expect(screen.getByTestId('error-boundary')).toBeInTheDocument();
  });
});
