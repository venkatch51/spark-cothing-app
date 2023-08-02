import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewForm from './ReviewForm/ReviewForm';

// eslint-disable-next-line react/prop-types
const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

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
        <div className="product-image col-md-6 product-details-item">
          <div className="btn btn-success">
            <Link className="nav-link" to={'/products'}>
              Back
            </Link>
          </div>
          <img className="product-image-url" src={product.imageUrl} />
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
            if (review.productId === id) {
              return (
                <div key={review.id}>
                  <p>Review Comments</p>
                  <p>
                    {review.name}: {review.message}
                  </p>
                </div>
              );
            }
            return undefined
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
              <ReviewForm productId={id} />
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
