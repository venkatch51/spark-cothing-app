import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <>
      <Helmet>
        <title>PageNotFound</title>
      </Helmet>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go back to Home</Link>
    </>
  );
};

export default PageNotFound;
