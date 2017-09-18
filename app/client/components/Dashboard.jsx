import React from 'react';

const Dashboard = (props) => {
  return (
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
}

export default Dashboard;