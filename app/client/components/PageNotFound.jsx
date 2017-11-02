import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = props => (
  <div>
    <div className="not-found text-center">
      <h4>Sorry, this page is not available</h4>
      <h5>
        The link you followed may be broken, or the page may have been removed
      </h5>
      <p><Link to="/">Go Home</Link></p>
    </div>
  </div>
);

export default PageNotFound;
