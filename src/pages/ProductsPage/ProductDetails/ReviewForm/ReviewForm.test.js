import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import ReviewForm from './ReviewForm';

// Mock axios to prevent actual network requests
jest.mock('axios');

// Test suite for the ReviewForm component
describe('ReviewForm', () => {
  // Mock submitReview function to prevent actual API call
//   const mockSubmitReview = jest.fn();
  axios.post.mockResolvedValue({ data: { success: true } });

  // Mock useForm hook to mock form state and functions
  useForm.mockReturnValue({
    register: jest.fn(),
    handleSubmit: (callback) => callback,
    setValue: jest.fn(),
    formState: { errors: {}, isSubmitted: false }
  });

  // Test case: rendering the component without crashing
  test('renders without crashing', () => {
    render(<ReviewForm productId={1} />);
  });

  // Test case: checking if the form inputs are rendered and working
  test('renders form inputs correctly and allows user input', () => {
    render(<ReviewForm productId={1} />);

    // ... same as before ...
  });

  // Test case: checking if the form validation works correctly
  test('validates form inputs correctly', async () => {
    render(<ReviewForm productId={1} />);

    // ... same as before ...
  });

  // Test case: checking if the form submission works correctly
  test('submits the form data and calls submitReview function', async () => {
    render(<ReviewForm productId={1} />);

    // ... same as before ...
  });

  // Test case: checking if the form is disabled after submission
  test('disables form inputs after form submission', async () => {
    useForm.mockReturnValueOnce({
      register: jest.fn(),
      handleSubmit: (callback) => callback,
      setValue: jest.fn(),
      formState: { errors: {}, isSubmitted: true } // Set isSubmitted to true
    });

    render(<ReviewForm productId={1} />);

    // Check if form inputs are disabled after submission
    expect(screen.getByLabelText('Name')).toBeDisabled();
    expect(screen.getByLabelText('Email')).toBeDisabled();
    expect(screen.getByLabelText('Message')).toBeDisabled();
    expect(screen.getByLabelText('Check me out')).toBeDisabled();
    expect(screen.getByLabelText('Rating')).toBeDisabled();
    expect(screen.getByText('Submit')).toBeDisabled();
  });

  // Test case: checking if the form shows a success message after successful submission
  test('displays success message after successful form submission', async () => {
    render(<ReviewForm productId={1} />);

    // Simulate successful form submission
    fireEvent.click(screen.getByText('Submit'));

    // Wait for the success message to appear
    await screen.findByText('Review submitted successfully');

    // Check if success message is displayed
    expect(screen.getByText('Review submitted successfully')).toBeInTheDocument();
  });

  // Test case: checking if the form shows an error message after failed submission
  test('displays error message after failed form submission', async () => {
    // Mock axios to reject the API call and simulate an error
    axios.post.mockRejectedValueOnce(new Error('Network error'));

    render(<ReviewForm productId={1} />);

    // Simulate failed form submission
    fireEvent.click(screen.getByText('Submit'));

    // Wait for the error message to appear
    await screen.findByText('Error submitting the review data');

    // Check if error message is displayed
    expect(screen.getByText('Error submitting the review data')).toBeInTheDocument();
  });

  // Test case: checking if the checkbox state is updated on user click
  test('updates checkbox state on user click', () => {
    render(<ReviewForm productId={1} />);

    // Check if checkbox is initially unchecked
    expect(screen.getByLabelText('Check me out')).not.toBeChecked();

    // Simulate user click on checkbox
    fireEvent.click(screen.getByLabelText('Check me out'));

    // Check if checkbox is now checked
    expect(screen.getByLabelText('Check me out')).toBeChecked();
  });
});
