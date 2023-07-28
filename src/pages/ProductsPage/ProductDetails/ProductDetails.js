import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewData, setReviewData] = useState({
    name: '',
    email: '',
    message: '',
    rating: '',
    isSubmitted: false
  });
  const handleSubmit = async (event) => {
    console.log('Form submitted');
    event.preventDefault();
    setReviewData({
      ...reviewData,
      isSubmitted: true
    });
    try {
      const response = await submitReview();
      console.log('Review submitted successfully', response);
      // Close the modal or do any other actions after successful submission
    } catch (error) {
      console.log('Error submitting the review data', error);
    }
  };
  const handleReviewChange = (event) => {
    setReviewData({
      ...reviewData,
      [event.target.name]: event.target.value
    });
  };
  const submitReview = async () => {
    const reviewPayload = {
      name: reviewData.name,
      email: reviewData.email,
      message: reviewData.message,
      rating: reviewData.rating
    };

    const response = await axios.post(
      `http://localhost:3100/products/${id}/reviews`,
      reviewPayload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  };

  useEffect(() => {
    axios.get(`http://localhost:3100/products/${id}`).then((res) => {
      setProduct(res.data);
      console.log(product);
    });
    axios.get('http://localhost:3100/reviews').then((res) => {
      setReviews(res.data);
    });
  }, [id]);
  // ..rest of the component code
  if (!product) {
    return (
      <div className="text-center">
        <i className="spinner-border text-primary"></i>
      </div>
    );
  }
  return (
    <>
      <div className="text-start pt-5 mt-4 prod-details">
        <div className="product-image col-md-6">
          <img src={product.imageUrl} />
        </div>
        <div className="product-desc col-md-6">
          <h4 className="product-title">Name: {product.name}</h4>
          <h6 className="description">description: {product.description}</h6>
          <h6 className="category">Category: {product.category}</h6>
          <p className="product-price">PRICE: {product.maxRetailPrice}</p>
          <button className="btn btn-primary mb-3">Add to Cart</button>
          <button
            className="btn btn-success dp-block"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Write a review
          </button>
          {reviews.map((review) => {
            return (
              <div key={review.id}>
                <p>Review Comments</p>
                <p>{review.name}: {review.message}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Write a Review
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-12 text-start">
                  <label className="form-label">Name</label>
                  <input
                    type="name"
                    className="form-control"
                    id="name"
                    name="name"
                    value={reviewData.name}
                    onChange={handleReviewChange}
                  />
                </div>
                <div className="col-md-12 text-start">
                  <label className="form-label text-start">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail4"
                    name="email"
                    value={reviewData.email}
                    onChange={handleReviewChange}
                  />
                </div>
                <div className="col-12 text-start">
                  <label className="form-label">Message</label>
                  <textarea
                    type="text"
                    className="form-control"
                    id="inputAddress2"
                    name="message"
                    value={reviewData.message}
                    onChange={handleReviewChange}
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
                <div className="col-12 text-start">
                  <label className="form-label">Rating</label>
                  <input
                    type="number"
                    className="form-control"
                    id="rating"
                    min="1"
                    max="5"
                    name="rating"
                    value={reviewData.rating}
                    onChange={handleReviewChange}
                  />
                </div>
                <div className="col-12 text-start mb-3">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetails;
