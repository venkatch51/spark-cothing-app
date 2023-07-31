// import necessary components
import React from 'react';
import MenuList from '../MenuList/MenuList';
import logo from '../../Assets/images/logo.png';

/* It represents the header section of our application */

const Header = () => {
  const handleClickSearch = () => {
    console.log('search clicked')
  }
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand">
            {/* Rendering the Logo */}
            <img src={logo} style={{ width: '50px' }} alt='Logo'/>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <form className="d-flex search-placeholder" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button onClick={handleClickSearch} className='fa fa-search search-icon' aria-hidden="true"></button>
            </form>
            {/* Rendering the MenuList component */}
            <MenuList />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
