import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

// Test suite for the ErrorBoundary component
describe('ErrorBoundary', () => {
  // Test case: rendering the component without crashing
  test('renders without crashing', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
  });

  // Test case: rendering children when there is no error
  test('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );
    const childElement = screen.getByText('Test content');
    expect(childElement).toBeInTheDocument();
  });

  // Test case: rendering the error message when an error occurs
  test('renders error message when there is an error', () => {
    // Mock the console.error to prevent unnecessary console output during the test
    const originalError = console.error;
    console.error = jest.fn();

    // Simulate an error by throwing an error inside the child component
    const ChildComponentWithError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ChildComponentWithError />
      </ErrorBoundary>
    );

    const errorMessage = screen.getByText('Some Error Occurred! Try again later');
    expect(errorMessage).toBeInTheDocument();

    // Restore the original console.error
    console.error = originalError;
  });

  // Test case: checking that componentDidCatch method is called on error
  test('calls componentDidCatch method when an error occurs', () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    // Mock the componentDidCatch method to check if it is called
    const mockComponentDidCatch = jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');

    // Simulate an error by throwing an error inside the child component
    const ChildComponentWithError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ChildComponentWithError />
      </ErrorBoundary>
    );

    expect(mockComponentDidCatch).toHaveBeenCalled();

    // Restore the original console.error and componentDidCatch
    console.error = originalConsoleError;
    mockComponentDidCatch.mockRestore();
  });

  // Test case: checking that getDerivedStateFromError method is called on error
  test('calls getDerivedStateFromError method when an error occurs', () => {
    const originalConsoleError = console.error;
    console.error = jest.fn();

    // Mock the getDerivedStateFromError method to check if it is called
    const mockGetDerivedStateFromError = jest.spyOn(ErrorBoundary, 'getDerivedStateFromError');

    // Simulate an error by throwing an error inside the child component
    const ChildComponentWithError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ChildComponentWithError />
      </ErrorBoundary>
    );

    expect(mockGetDerivedStateFromError).toHaveBeenCalled();

    // Restore the original console.error and getDerivedStateFromError
    console.error = originalConsoleError;
    mockGetDerivedStateFromError.mockRestore();
  });
});
