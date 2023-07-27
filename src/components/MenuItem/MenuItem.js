import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuItem = ({ name, path }) => {
  return (
    <li className="nav-item">
      <NavLink className="nav-link" to={path}>
        {name}
      </NavLink>
    </li>
  );
};
MenuItem.propTypes = {
  name: PropTypes.string,
  path: PropTypes.string
};
export default MenuItem;
