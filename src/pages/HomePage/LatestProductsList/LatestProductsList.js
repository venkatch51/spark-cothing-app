import PropTypes from 'prop-types';
import React from 'react';

const LatestProductsList = ({ id, name, thumbnailUrl, maxRetailPrice }) => {
  return (
    <>
      <div className="col-md-4" key={id}>
        <div className="card" style={{ width: '18rem' }}>
          <img src={thumbnailUrl} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text product-price">INR: {maxRetailPrice}</p>
            <a href="#" className="btn btn-primary">
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
LatestProductsList.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  maxRetailPrice: PropTypes.number
};
export default LatestProductsList;
