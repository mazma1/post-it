import React from 'react';
import PropTypes from 'prop-types';


/**
 * Displays a specified message to users
 *
 * @param {object} props
 *
 * @returns {JSX} Dashboard markup
 */
const Dashboard = props => (
  <div className="row">
    <div className="col s12 m10 offset-m1 dashboard-container">
      <div className="card-panel dashboard-panel">
        <p className="dashboard-text">
          {props.message}
        </p>
      </div>
    </div>
  </div>
);

Dashboard.propTypes = {
  message: PropTypes.string.isRequired
};

export default Dashboard;
