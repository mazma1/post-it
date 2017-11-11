import React from 'react';
import classnames from 'classnames';
import { PropTypes } from 'prop-types';


/**
  * Header element of a modal
  *
  * @param {object} props
  *
  * @returns {JSX} Modal header mark up
  */
export const ModalHeader = props => (
  <div className="modal-header">
    <button
      type="button"
      className="close"
      data-dismiss="modal"
      aria-label="Close"
      onClick={props.onClose}
    >
      <span aria-hidden="true">&times;</span>
    </button>
    <h4 className="modal-title">{props.header}</h4>
  </div>
);

ModalHeader.propTypes = {
  onClose: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired
};


/**
  * Body element of a modal
  *
  * @param {object} props
  *
  * @returns {JSX} Modal body mark up
  */
export const ModalBody = (props) => {
  const { error } = props.errors;
  return (
    <div className="modal-body">
      <div className="row">
        <form className="col s12" onSubmit={props.onSubmit}>
          <div className="row">
            <div
              className={classnames(
                'input-field',
                'auth-field',
                'col s12',
                { 'has-error': error }
              )}
            >
              <input
                type="text"
                className={classnames('validate', { invalid: error })}
                name={props.field}
                value={props.value}
                onChange={props.onChange}
                autoComplete="off"
              />
              <label>{props.label}</label>
              {error &&
                <span className="help-block modal-help-block">{error}</span>
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

ModalBody.propTypes = {
  errors: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  onSubmit: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

ModalBody.defaultProps = {
  errors: {}
};


/**
  * Close button
  *
  * @param {object} props
  *
  * @returns {JSX} Close button mark up
  */
export const CloseButton = props => (
  <button
    type="button"
    onClick={props.onClick}
    aria-label="Close"
    data-dismiss="modal"
    className="btn waves-effect waves-light blue lighten-1"
  >
    Close
  </button>
);

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired
};


/**
  * Cancel button
  *
  * @param {object} props
  *
  * @returns {JSX} Cancel button mark up
  */
export const CancelButton = props => (
  <button
    type="button"
    onClick={props.onClick}
    aria-label="Close"
    data-dismiss="modal"
    className="btn waves-effect waves-light red darken-2 modal-cancel-btn"
  >
    Cancel
  </button>
);

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired
};


/**
  * Submit button
  *
  * @param {object} props
  *
  * @returns {JSX} Submit button mark up
  */
export const SubmitButton = props => (
  <button
    type="button"
    disabled={props.isLoading}
    className="btn waves-effect waves-light blue lighten-1 search-submit-btn"
    onClick={props.onSubmit}
  >
    Submit
  </button>
);

SubmitButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

SubmitButton.defaultProps = {
  isLoading: false
};


/**
  * Footer element of a modal
  *
  * @param {object} props
  *
  * @returns {JSX} Modal footer mark up
  */
export const ModalFooter = props => (
  <div className="modal-footer">

    { props.children }

  </div>
);
