import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../../contexts/ProductContext';

const Categories = () => {
  const [currentCategory, setCurrentCategory] = useState('All');
  const { dispatch } = useContext(ProductContext);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    switch (category) {
    case 'All':
      axios.get('http://localhost:3100/products').then((res) => {
        console.log(res.data);
        dispatch({
          type: 'LIST_PRODUCTS',
          payload: res.data
        });
      });
      break;
    case 'Men':
      axios.get('http://localhost:3100/products?category=Men').then((res) => {
        console.log(res.data);
        dispatch({
          type: 'FILTER_PRODUCTS',
          payload: res.data
        });
      });
      break;
    case 'Women':
      axios
        .get('http://localhost:3100/products?category=Women')
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: 'FILTER_PRODUCTS',
            payload: res.data
          });
        });
      break;
    case 'Kids':
      axios
        .get('http://localhost:3100/products?category=Kids')
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: 'FILTER_PRODUCTS',
            payload: res.data
          });
        });
      break;
    default:
      break;
    }
  };
  return (
    <div className="categories">
      <h5 className="text-start">Categories</h5>
      <ul className="navbar-nav text-start">
        <li className="nav-item">
          <Link to={'/products?category=All'}
            className={`nav-link btn-danger ${
              currentCategory === 'All' ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick('All')}
          >
            All
          </Link>
        </li>
        <li className="nav-item">
          <Link to={'/products?category=Men'}
            className={`nav-link btn-danger ${
              currentCategory === 'Men' ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick('Men')}
          >
            Men
          </Link>
        </li>
        <li className="nav-item">
          <Link to={'/products?category=Women'}
            className={`nav-link btn-danger ${
              currentCategory === 'Women' ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick('Women')}
          >
            Women
          </Link>
        </li>
        <li className="nav-item">
          <Link to={'/products?category=Kids'}
            className={`nav-link btn-danger ${
              currentCategory === 'Kids' ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick('Kids')}
          >
            Kids
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Categories;
