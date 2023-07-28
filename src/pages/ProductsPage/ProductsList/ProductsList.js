import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { ProductContext } from '../../../contexts/ProductContext';
import { Link } from 'react-router-dom';

const ProductsList = () => {
  const { products, dispatch } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortingPreference, setSortingPreference] = useState('lowToHigh');
  useEffect(() => {
    axios.get('http://localhost:3100/products').then((res) => {
      console.log(res.data);
      dispatch({
        type: 'LIST_PRODUCTS',
        payload: res.data
      });
    });
  }, [dispatch]);

  useEffect(() => {
    // Sort the products when sortingPreference or products change
    sortProducts();
  }, [sortingPreference, products]);

  const sortProducts = () => {
    const sortedProducts = [...products];

    switch (sortingPreference) {
    case 'lowToHigh':
      sortedProducts.sort((a, b) => a.maxRetailPrice - b.maxRetailPrice);
      break;
    case 'highToLow':
      sortedProducts.sort((a, b) => b.maxRetailPrice - a.maxRetailPrice);
      break;
    default:
      break;
    }

    setFilteredProducts(sortedProducts);
  };

  const handleSortingChange = (event) => {
    const selectedSorting = event.target.value
    setSortingPreference(selectedSorting)
  };

  return (
    <div className="container-flex products-list">
      <div className='filter'>
        <label htmlFor="sorting">Sort by:</label>
        <select className='filtering-button'
          id="sorting"
          value={sortingPreference}
          onChange={handleSortingChange}
        >
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>
      <div className="row">
        {filteredProducts.map((product) => {
          return (
            <div
              className="card mb-4"
              style={{ width: '18rem' }}
              key={product.id}
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt="..."
                />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">price: {product.maxRetailPrice}INR</p>
                <a href="#" className="btn btn-primary">
                  Add to Cart
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsList;
