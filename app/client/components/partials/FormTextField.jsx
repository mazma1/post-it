import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


/**
 * Form input fields
 *
 * @param {object} props
 *
 * @returns {JSX} Input field mark up
 */
const FormTextField = props => (
  <div>
    <i className="material-icons prefix">{props.icon}</i>
    <input
      id="icon_prefix"
      type={props.type}
      className={classnames('validate', { invalid: props.error })}
      name={props.field}
      value={props.value}
      onChange={props.onChange}
      autoComplete={props.autocomplete}
    />
    <label htmlFor="icon_prefix">{props.label}</label>
    {props.error && <span className="help-block">{props.error}</span>}
  </div>
);

FormTextField.propTypes = {
  error: PropTypes.string,
  autocomplete: PropTypes.string,
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

FormTextField.defaultProps = {
  type: 'text'
};

FormTextField.defaultProps = {
  error: '',
  autocomplete: 'on'

};

export default FormTextField;
