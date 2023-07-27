import React, { useEffect, useReducer, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import contactReducer from '../../reducers/contactReducer';
import axios from 'axios';

const ContactPage = () => {
  const [contactDetails, detailsDispatch] = useReducer(contactReducer, []);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('http://localhost:3100/contactData').then((res) => {
      detailsDispatch({
        type: 'contact_details',
        payload: res.data
      });
      setLoading(false);
    });
  }, []);
  const [formState, setFormstate] = useState({
    fullName: '',
    Email: '',
    Message: '',
    isSubmitting: false,
    isSaved: false,
    errors: {}
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    if (formState.fullName.trim() === '') {
      errors.fullName = 'Name is required';
    }
    if (formState.Email.trim() === '') {
      errors.Email = 'Email is required';
    }
    if (formState.Message.trim() === '') {
      errors.Message = 'Message is required';
    }
    if (Object.keys(errors).length > 0) {
      setFormstate({ ...formState, errors });
    } else {
      axios
        .post('http://localhost:3100/formdata', formState)
        .then((res) => {
          console.log(res);
          if (res && res.data) {
            setFormstate({
              ...formState,
              isSubmitting: true,
              isSaved: true
            });
          }
          console.log('Form data submitted');
        })
        .catch((error) => {
          console.log('Error submitting the formdata', error);
          setFormstate({
            ...formState,
            isSubmitting: false,
            isSaved: false
          }).finally(() => {
            console.log('It is over');
          });
        });
    }
  };
  const handleChange = (event) => {
    // console.log(event.target.value)
    // console.log(event.target.name)
    setFormstate({
      ...formState,
      [event.target.name]: event.target.value
    });
  };
  return (
    <div>
      <Helmet>
        <title>ContactPage</title>
      </Helmet>
      <div className="row pt-5 text-start">
        <div className="col-md-6">
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
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-12 text-start">
              <label className="form-label">Name</label>
              <input
                type="name"
                className="form-control"
                id="name"
                name="fullName"
                value={formState.fullName}
                onChange={handleChange}
              />
              {formState.errors.fullName && (
                <div className="text-danger">{formState.errors.fullName}</div>
              )}
            </div>
            <div className="col-md-12 text-start">
              <label className="form-label text-start">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                name="Email"
                value={formState.Email}
                onChange={handleChange}
              />
              {formState.errors.Email && (
                <div className="text-danger">{formState.errors.Email}</div>
              )}
            </div>
            <div className="col-12 text-start">
              <label className="form-label">Message</label>
              <textarea
                type="text"
                className="form-control"
                id="inputAddress2"
                name="Message"
                value={formState.Message}
                onChange={handleChange}
              />
              {formState.errors.Message && (
                <div className="text-danger">{formState.errors.Message}</div>
              )}
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
                disabled={
                  formState.isSubmitting ||
                  Object.keys(formState.errors).length > 0
                }
              >
                {formState.isSubmitting
                  ? 'Submitting... Please wait...'
                  : 'Submit'}
              </button>
              {formState.isSaved && (
                <div className="alert alert-success">Saved Successfully!</div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
