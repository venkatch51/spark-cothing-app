import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../../../contexts/ProductContext';

const Categories = () => {
  const [currentCategory, setCurrentCategory] = useState('All');
  const { dispatch } = useContext(ProductContext);

  const handleCategoryClick = (category) => {
    setCurrentCategory(category);
    const queryParams = category === 'All' ? '' : `?category=${category}`;
    const actionType = category === 'All' ? 'LIST_PRODUCTS' : 'FILTER_PRODUCTS';

    axios.get(`http://localhost:3100/products${queryParams}`).then((res) => {
      console.log(res.data);
      dispatch({
        type: actionType,
        payload: res.data
      });
    });
  };
  return (
    <div className="categories">
      <h5 className="text-start">Categories</h5>
      <ul className="navbar-nav text-start">
        <li className="nav-item">
          <Link
            to={'/products?category=All'}
            className={`nav-link btn-danger ${
              currentCategory === 'All' ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick('All')}
          >
            All
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={'/products?category=Men'}
            className={`nav-link btn-danger ${
              currentCategory === 'Men' ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick('Men')}
          >
            Men
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={'/products?category=Women'}
            className={`nav-link btn-danger ${
              currentCategory === 'Women' ? 'active' : ''
            }`}
            onClick={() => handleCategoryClick('Women')}
          >
            Women
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to={'/products?category=Kids'}
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
