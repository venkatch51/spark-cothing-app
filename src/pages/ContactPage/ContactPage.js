import React, { useEffect, useReducer, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
import contactReducer from '../../reducers/contactReducer';
import axios from 'axios';

// contact Page Component
const ContactPage = () => {
  // State Management using useReducer Hook for Contact Reducer
  const [contactDetails, detailsDispatch] = useReducer(contactReducer, []);
  // State to Manage Laoding the data
  const [loading, setLoading] = useState(true);
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

  // state Management by useState to handle the Form data
  const [formState, setFormstate] = useState({
    fullName: '',
    Email: '',
    Message: '',
    isSubmitting: false,
    isSaved: false,
    errors: {}
  });
  // handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // submitting the form data
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
      // catch the Error is there is any error
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
  };
  // Handle the input changes in the Form
  const handleChange = (event) => {
    // console.log(event.target.name)
    setFormstate({
      ...formState,
      [event.target.name]: event.target.value
    });
  };
  return (
    <div>
      {/* Page Title */}
      {/* <Helmet>
        <title>ContactPage</title>
      </Helmet> */}
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
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-12 text-start">
              <label htmlFor="exampleInputName" className="form-label">Name</label>
              <input
                type="name"
                className="form-control"
                id="exampleInputName"
                name="fullName"
                value={formState.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12 text-start">
              <label htmlFor="inputEmail4" className="form-label text-start">Email</label>
              <input
                type="email"
                className="form-control"
                id="inputEmail4"
                name="Email"
                value={formState.Email}
                onChange={handleChange}
              />
            </div>
            <div className="col-12 text-start">
              <label htmlFor="inputAddress2" className="form-label">Message</label>
              <textarea
                type="text"
                className="form-control"
                id="inputAddress2"
                name="Message"
                value={formState.Message}
                onChange={handleChange}
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
                disabled={formState.fullName === ''}
              >
                {/* Change button text based on form submission status */}
                {formState.isSubmitting
                  ? 'Submitting... Please wait...'
                  : 'Submit'}
              </button>
              {/* Display success message if form is submitted */}
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
