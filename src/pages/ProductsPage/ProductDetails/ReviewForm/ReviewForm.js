import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ReviewForm = ({ productId }) => {
  const { register, handleSubmit, setValue, formState: { errors, isSubmitted } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await submitReview(data);
      console.log('Review submitted successfully', response);
      // Close the modal or do any other actions after successful submission
    } catch (error) {
      console.log('Error submitting the review data', error);
    }
  };

  const submitReview = async (reviewData) => {
    const reviewPayload = {
      name: reviewData.name,
      email: reviewData.email,
      message: reviewData.message,
      rating: reviewData.rating
    };

    const response = await axios.post(
      `http://localhost:3100/reviews/${productId}`,
      reviewPayload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  };

  // If the form is submitted, set the form values as submitted to disable the form inputs
  if (isSubmitted) {
    setValue('isSubmitted', true);
  }

  return (
    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-12 text-start">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          {...register('name', { required: 'Name is required' })}
          disabled={isSubmitted}
        />
        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
      </div>
      <div className="col-md-12 text-start">
        <label className="form-label text-start">Email</label>
        <input
          type="email"
          className="form-control"
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address'
            }
          })}
          disabled={isSubmitted}
        />
        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
      </div>
      <div className="col-12 text-start">
        <label className="form-label">Message</label>
        <textarea
          className="form-control"
          {...register('message', { required: 'Message is required' })}
          disabled={isSubmitted}
        />
        {errors.message && <div className="invalid-feedback">{errors.message.message}</div>}
      </div>
      <div className="col-12 text-start">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="gridCheck"
            {...register('isAgreed')}
            disabled={isSubmitted}
          />
          <label className="form-check-label">Check me out</label>
        </div>
      </div>
      <div className="col-12 text-start">
        <label className="form-label">Rating</label>
        <input
          type="number"
          className="form-control"
          {...register('rating', {
            required: 'Rating is required',
            min: {
              value: 1,
              message: 'Rating must be at least 1'
            },
            max: {
              value: 5,
              message: 'Rating must be at most 5'
            }
          })}
          disabled={isSubmitted}
        />
        {errors.rating && <div className="invalid-feedback">{errors.rating.message}</div>}
      </div>
      <div className="col-12 text-start mb-3">
        <button type="submit" className="btn btn-primary" disabled={isSubmitted}>
          Submit
        </button>
      </div>
    </form>
  );
};

ReviewForm.propTypes = {
  productId: PropTypes.number
};

export default ReviewForm;
