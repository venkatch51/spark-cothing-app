import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mocking child components to avoid external dependencies
jest.mock('./components/Header/Header', () => () => <div data-testid="header">Header Component</div>);
jest.mock('./components/Footer/Footer', () => () => <div data-testid="footer">Footer Component</div>);
jest.mock('./containers/ErrorBoundary/ErrorBoundary', () => ({ children }) => (
  <div data-testid="error-boundary">{children}</div>
));
jest.mock('./routes/AppRoutes/AppRoutes', () => () => <div data-testid="app-routes">AppRoutes Component</div>);

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
