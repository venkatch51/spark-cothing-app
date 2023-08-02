import React, { useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import contactReducer from '../../reducers/contactReducer';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';

// contact Page Component
const ContactPage = () => {
  const { control, handleSubmit, reset } = useForm();
  // State Management using useReducer Hook for Contact Reducer
  const [contactDetails, detailsDispatch] = useReducer(contactReducer, []);
  // State to Manage Laoding the data
  const [loading, setLoading] = useState(true);
  // State to Manage Form Submission
  const [formState, setFormState] = React.useState({
    isSubmitting: false,
    isError: false,
    isSaved: false
  });
  // fetch the contact data from server using axios
  useEffect(() => {
    axios.get('http://localhost:3100/contactData').then((res) => {
      detailsDispatch({
        type: 'contact_details',
        payload: res.data
      });
      setLoading(false);
    });
  }, []);
  // handle the form submission
  const onSubmit = async (data) => {
    console.log('Form submitted', data);
    setFormState({
      ...formState,
      isSubmitting: true,
      isError: false,
      isSaved: false
    });
    try {
      const response = await axios.post('http://localhost:3100/formdata', data);
      console.log('Form data submitted', response);
      setFormState({
        ...formState,
        isSubmitting: false,
        isSaved: true
      });
      // Reset the form after successful submission
      reset();
    } catch (error) {
      console.log('Error submitting the formdata', error);
      setFormState({
        ...formState,
        isSubmitting: false,
        isError: true
      });
    }
  };
  // Handle the input changes in the Form
  return (
    <div>
      {/* Page Title */}
      <Helmet>
        <title>ContactPage</title>
      </Helmet>
      <div className="row pt-5 text-start">
        <div className="col-md-6">
          {/* Contact information */}
          <h3>Contact US</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          {/* Display contact details when loading is complete */}
          {loading
            ? (
              <div className="text-center">
                <i className="spinner-border text-primary"></i>
              </div>
            )
            : (
              <div className="load-state">
                <h5>
                  <i className="fa fa-building" aria-hidden="true"></i>{' '}
                  {contactDetails.address}
                </h5>
                {contactDetails.phone &&
                contactDetails.phone.map((phoneNumber, index) => (
                  <p key={index}>
                    <i className="fa fa-phone" aria-hidden="true"></i>{' '}
                    {phoneNumber}
                  </p>
                ))}
                <p>
                  <i className="fa fa-envelope-o" aria-hidden="true"></i>{' '}
                  {contactDetails.email}
                </p>
              </div>
            )}
        </div>
        <div className="col-md-6">
          {/* Contact Form */}
          <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-md-12 text-start">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <Controller
                control={control}
                name="fullName"
                defaultValue=""
                rules={{ required: 'Name is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      type="name"
                      className="form-control"
                      id="exampleInputName"
                      {...field}
                    />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-md-12 text-start">
              <label htmlFor="inputEmail4" className="form-label text-start">
                Email
              </label>
              <Controller
                control={control}
                name="Email"
                defaultValue=""
                rules={{ required: 'Email is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      {...field}
                    />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-12 text-start">
              <label htmlFor="inputAddress2" className="form-label">
                Message
              </label>
              <Controller
                control={control}
                name="Message"
                defaultValue=""
                rules={{ required: 'Message is required' }}
                render={({ field, fieldState }) => (
                  <>
                    <textarea
                      type="text"
                      className="form-control"
                      id="inputAddress2"
                      {...field}
                    />
                    {fieldState.error && (
                      <span className="text-danger">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-12 text-start">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <label className="form-check-label">Check me out</label>
              </div>
            </div>
            <div className="col-12 text-start mb-3">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={false}
              >
                {/* Change button text based on form submission status */}
                {formState.isSubmitting ? 'Loading...' : 'Submit'}
              </button>
              {/* Display success message if form is submitted */}
              {formState.isSaved && (
                <div className="alert alert-success">Saved Successfully!</div>
              )}
              {/* Display error message if form submission fails */}
              {formState.isError && (
                <div className="alert alert-danger">Failed to submit the form.</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
