import React from 'react';
import Categories from './Categories/Categories';
import ProductsList from './ProductsList/ProductsList';
// import { Helmet } from 'react-helmet-async';

const ProductsPage = () => {
  return (
    <>
      {/* <Helmet>
        <title>ProductsPage</title>
      </Helmet> */}
      <div>
        <h3 data-testid="productstitle">Products</h3>
        <div className="row">
          <div className="col-md-2">
            <Categories />
          </div>
          <div className="col-md-10">
            <ProductsList />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
