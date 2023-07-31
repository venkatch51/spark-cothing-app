// AAA
import { fireEvent, render, screen } from '@testing-library/react';
import ContactPage from './ContactPage';

describe('ContactUsPage', () => {
  it('has proper contact form with name, email, phone, message inputs and submit button', () => {
    render(<ContactPage />);
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Message');
    const submitBtn = screen.getByRole('button');
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();

    expect(nameInput).toHaveAttribute('type', 'name');
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(messageInput).toHaveAttribute('type', 'text');
    expect(submitBtn).toHaveAttribute('type', 'submit');
  });
  // negative test related to Form validation
  it('has submit button disabled state when fullName is empty', () => {
    render(<ContactPage />);
    const nameInput = screen.getByLabelText('Name');
    // finding submit button
    const submitBtn = screen.getByRole('button');

    const mockEventObject = {
      target: {
        value: ''
      }
    };

    fireEvent.change(nameInput, mockEventObject);
    expect(submitBtn).toHaveAttribute('disabled');
  });
  // postive test related to Form Validation
  it('has submit button in enabled state when fullName is NOT empty', () => {
    render(<ContactPage />);
    // finding fullName input
    const nameInput = screen.getByLabelText('Name');
    // finding submit button
    const submitBtn = screen.getByRole('button');

    const mockEventObject = {
      target: {
        value: 'venkat'
      }
    };

    fireEvent.change(nameInput, mockEventObject);
    expect(submitBtn).not.toHaveAttribute('disabled');
  });
});
