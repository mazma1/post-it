import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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
