import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ReviewForm from './ReviewForm';

const mockSubmitReview = jest.fn();

describe('ReviewForm', () => {
  it('should not submit the form if the form is not valid', () => {
    const productId = 123;
    const { getByLabelText, getByTestId, getByText } = render(<ReviewForm productId={productId} />);
    fireEvent.click(getByTestId('submit'));
    expect(getByText('Review submitted successfully')).not.toBeInTheDocument();
    expect(getByLabelText('Name')).toHaveInvalidFeedback('Name is required');
  });

  it('should submit the form successfully if the form is valid', () => {
    const productId = 123;
    const { getByLabelText, getByTestId, getByText } = render(<ReviewForm productId={productId} />);
    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(getByLabelText('Message'), { target: { value: 'This is a great product!' } });
    fireEvent.change(getByLabelText('Rating'), { target: { value: '5' } });
    fireEvent.click(getByTestId('submit'));
    expect(getByText('Review submitted successfully')).toBeInTheDocument();
  });

  it('should call the submitReview function with the form data', () => {
    const productId = 123;
    const mockSubmitReview = jest.fn();
    const { getByLabelText, getByTestId } = render(<ReviewForm productId={productId} />);
    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(getByLabelText('Message'), { target: { value: 'This is a great product!' } });
    fireEvent.change(getByLabelText('Rating'), { target: { value: '5' } });
    fireEvent.click(getByTestId('submit'));
    expect(mockSubmitReview).toBeCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      message: 'This is a great product!',
      rating: 5
    });
  });

  it('should submit the form successfully with valid form data', () => {
    const productId = 123;
    const { getByLabelText, getByTestId } = render(<ReviewForm productId={productId} />);

    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(getByLabelText('Message'), { target: { value: 'This is a great product!' } });
    fireEvent.change(getByLabelText('Rating'), { target: { value: '5' } });
    fireEvent.click(getByTestId('submit'));

    expect(mockSubmitReview).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      message: 'This is a great product!',
      rating: '5'
    });
  });

  it('should not submit the form if the name field is empty', () => {
    const productId = 123;
    const { getByLabelText, getByTestId, getByText } = render(<ReviewForm productId={productId} />);
    fireEvent.change(getByLabelText('Email'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(getByLabelText('Message'), { target: { value: 'This is a great product!' } });
    fireEvent.change(getByLabelText('Rating'), { target: { value: '5' } });
    fireEvent.click(getByTestId('submit'));
    expect(getByText('Review submitted successfully')).not.toBeInTheDocument();
    expect(getByLabelText('Name')).toHaveInvalidFeedback('Name is required');
  });

  it('should not submit the form if the email field is not a valid email address', () => {
    const productId = 123;
    const { getByLabelText, getByTestId, getByText } = render(<ReviewForm productId={productId} />);
    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'invalid_email' } });
    fireEvent.change(getByLabelText('Message'), { target: { value: 'This is a great product!' } });
    fireEvent.change(getByLabelText('Rating'), { target: { value: '5' } });
    fireEvent.click(getByTestId('submit'));
    expect(getByText('Review submitted successfully')).not.toBeInTheDocument();
    expect(getByLabelText('Email')).toHaveInvalidFeedback('Invalid email address');
  });

  it('should not submit the form if the rating field is not between 1 and 5', () => {
    const productId = 123;
    const { getByLabelText, getByTestId, getByText } = render(<ReviewForm productId={productId} />);
    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(getByLabelText('Message'), { target: { value: 'This is a great product!' } });
    fireEvent.change(getByLabelText('Rating'), { target: { value: '0' } });
    fireEvent.click(getByTestId('submit'));
    expect(getByText('Review submitted successfully')).not.toBeInTheDocument();
    expect(getByLabelText('Rating')).toHaveInvalidFeedback('Rating must be at least 1');
  });

  it('should render the form with all the required fields', () => {
    const productId = 123;
    const { getByLabelText } = render(<ReviewForm productId={productId} />);

    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByLabelText('Email')).toBeInTheDocument();
    expect(getByLabelText('Message')).toBeInTheDocument();
    expect(getByLabelText('Rating')).toBeInTheDocument();
  });

  it('should show validation errors for invalid form data', () => {
    const productId = 123;
    const { getByLabelText, getByTestId } = render(<ReviewForm productId={productId} />);

    fireEvent.change(getByLabelText('Name'), { target: { value: '' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'invalid_email' } });
    fireEvent.change(getByLabelText('Message'), { target: { value: '' } });
    fireEvent.click(getByTestId('submit'));

    expect(getByLabelText('Name')).toHaveInvalidFeedback('Name is required');
    expect(getByLabelText('Email')).toHaveInvalidFeedback('Invalid email address');
    expect(getByLabelText('Message')).toHaveInvalidFeedback('Message is required');
  });

  it('should submit the form successfully with valid form data', () => {
    const productId = 123;
    const { getByLabelText, getByTestId, getByText } = render(<ReviewForm productId={productId} />);

    fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Email'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(getByLabelText('Message'), { target: { value: 'This is a great product!' } });
    fireEvent.change(getByLabelText('Rating'), { target: { value: '5' } });
    fireEvent.click(getByTestId('submit'));

    expect(getByText('Review submitted successfully')).toBeInTheDocument();
  });
});
