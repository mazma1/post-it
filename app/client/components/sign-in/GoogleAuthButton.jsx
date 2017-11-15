import React from 'react';
import PropTypes from 'prop-types';
import GoogleButton from 'react-google-login';


/**
 * Displays the Google login button
 *
 * @param {object} props
 *
 * @returns {JSX} Google Auth Button markup
 */
const GoogleAuthButton = props => (
  <div>
    <GoogleButton
      className="google-btn btn blue accent-2 waves-effect waves-light left"
      onSuccess={props.onSuccess}
      onFailure={props.onFailure}
    >
      <span className="google-icon">
        <img
          src="../../dist/img/google.jpg"
          alt="no-img"
          className="google-icon google"
        />
      </span>
      Sign In with Google
    </GoogleButton>
  </div>
);

GoogleAuthButton.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired
};

export default GoogleAuthButton;
