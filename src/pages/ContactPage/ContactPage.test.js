import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactPage from './ContactPage';
import axios from 'axios';
import { HashRouter, MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Mock axios to prevent actual network requests
jest.mock('axios');

// Test suite for the ContactPage component
describe('ContactPage', () => {
  // Mock contact data for axios GET request
  const mockContactData = {
    address: 'Mock Address',
    phone: ['1234567890', '9876543210'],
    email: 'mock@example.com'
  };

  // Mock axios GET request
  beforeEach(() => {
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockContactData });
  });

  // Test case: rendering the component without crashing
  test('renders without crashing', () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      </HelmetProvider>
    );
  });

  // Test case: checking if contact information is displayed after loading
  test('displays contact information after loading', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    // Check if loading spinner is shown
    const loadingSpinner = screen.getByRole('status');
    expect(loadingSpinner).toBeInTheDocument();

    // Wait for loading to complete
    await waitFor(() => screen.queryByRole('status'));

    // Check if contact information is displayed
    const addressElement = screen.getByText(mockContactData.address);
    expect(addressElement).toBeInTheDocument();

    mockContactData.phone.forEach((phoneNumber) => {
      const phoneElement = screen.getByText(phoneNumber);
      expect(phoneElement).toBeInTheDocument();
    });

    const emailElement = screen.getByText(mockContactData.email);
    expect(emailElement).toBeInTheDocument();
  });

  // Test case: checking if the form is submitted successfully
  test('submits the form successfully', async () => {
    // Mock axios POST request
    jest.spyOn(axios, 'post').mockResolvedValueOnce({});

    render(
      <HelmetProvider>
        <HashRouter>
          <ContactPage />
        </HashRouter>
      </HelmetProvider>
    );

    // Wait for loading to complete
    await waitFor(() => screen.queryByRole('status'));

    // Fill in the form fields
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    const messageInput = screen.getByLabelText('Message');
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    // Submit the form
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Check if "Loading..." text is displayed while submitting
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for form submission to complete
    await waitFor(() => screen.queryByText('Loading...'));

    // Check if success message is displayed
    const successMessage = screen.getByText('Saved Successfully!');
    expect(successMessage).toBeInTheDocument();

    // Check if the form is reset after successful submission
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(messageInput.value).toBe('');
  });

  // Test case: checking if the form submission fails
  test('handles form submission failure', async () => {
    // Mock axios POST request to fail
    jest.spyOn(axios, 'post').mockRejectedValueOnce({});

    render(
      <HelmetProvider>
        <HashRouter>
          <ContactPage />
        </HashRouter>
      </HelmetProvider>
    );

    // Wait for loading to complete
    await waitFor(() => screen.queryByRole('status'));

    // Fill in the form fields
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    const messageInput = screen.getByLabelText('Message');
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    // Submit the form
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Check if "Loading..." text is displayed while submitting
    // expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for form submission to complete
    // await waitFor(() => screen.queryByText('Loading...'));

    // Check if error message is displayed
    const errorMessage = screen.getByText('Failed to submit the form.');
    expect(errorMessage).toBeInTheDocument();

    // Check if the form is not reset after form submission failure
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(messageInput.value).toBe('Test message');
  });

  // Test case: checking if form fields are required
  test('validates form fields as required', async () => {
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ContactPage />
        </MemoryRouter>
      </HelmetProvider>
    );

    // Wait for loading to complete
    // await waitFor(() => screen.queryByRole('status'));

    // Submit the form without filling in the fields
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    // Check if error messages for required fields are displayed
    const nameError = await screen.findByText('Name is required');
    expect(nameError).toBeInTheDocument();

    const emailError = await screen.findByText('Email is required');
    expect(emailError).toBeInTheDocument();

    const messageError = await screen.findByText('Message is required');
    expect(messageError).toBeInTheDocument();
  });

  //   Test case: checking if the "Check me out" checkbox is rendered
//   test('renders the "Check me out" checkbox', () => {
//     render(
//       <HelmetProvider>
//         <HashRouter>
//           <ContactPage />
//         </HashRouter>
//       </HelmetProvider>
//     );
//     const checkbox = screen.getByRole('checkbox', { name: 'Check me out' });
//     expect(checkbox).toBeInTheDocument();
//   });
});
