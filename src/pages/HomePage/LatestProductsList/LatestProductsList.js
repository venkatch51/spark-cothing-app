import PropTypes from 'prop-types';
import React from 'react';

// LatestProductList Component
const LatestProductsList = ({ id, name, thumbnailUrl, maxRetailPrice }) => {
  return (
    <>
      {/* Each Product will be displayed in four column grid */}
      <div className="col-md-4" key={id}>
        <div className="card" style={{ width: '18rem' }}>
          {/* Product Thumbnail URL */}
          <img src={thumbnailUrl} className="card-img-top" alt="" />
          <div className="card-body">
            {/* Product Name */}
            <h5 className="card-title">{name}</h5>
            {/* Product Price */}
            <p className="card-text product-price">INR: {maxRetailPrice}</p>
            {/* Add to Cart button */}
            <a href="#" className="btn btn-primary">
              Add to Cart
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
// Prop types to validate the props passed to component
LatestProductsList.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  thumbnailUrl: PropTypes.string,
  maxRetailPrice: PropTypes.number
};
export default LatestProductsList;
