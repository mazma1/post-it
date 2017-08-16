import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const FormTextField = ({ field, value, label, error, type, onChange, icon, autocomplete }) => (
  <div>
    <i className="material-icons prefix">{icon}</i>
    <input
      id="icon_prefix"
      type={type}
      className={ classnames('validate', { 'invalid': error })}
      name={field}
      value={value}
      onChange={onChange}
      autoComplete={autocomplete}
    />
    <label htmlFor="icon_prefix">{label}</label>
    {error && <span className="help-block">{error}</span>}
  </div>
);

FormTextField.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  icon: PropTypes.string,
  autocomplete: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

FormTextField.defaultProps = {
  type: 'text'
};

export default FormTextField;
