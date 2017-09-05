import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = props => (
  <div>
    <div className="not-found">
      <h5>Page not Found</h5>
      <p><Link to="/">Go Home</Link></p>
    </div>
  </div>
);

export default PageNotFound;
